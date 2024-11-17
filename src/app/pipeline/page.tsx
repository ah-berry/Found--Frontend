'use client'
import React, { useEffect, useState } from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { 
  fetchAllCandidates, 
  assignCandidateToInterviewStage,
  assignCandidateToJob, 
  fetchAllInterviewStages,
  fetchInterviewStagesPerJob 
} from '@/app/api/utilities'
import { 
  Button, 
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalCloseButton,
  Select,
  useToast,
  useDisclosure 
} from "@chakra-ui/react"
import { useAppContext } from "../layout";

function PipelinePage() {
  const { selectedJobID, jobs } = useAppContext()
  const [ allCandidates, setAllCandidates ] = useState([])
  const [ allInterviewStages, setAllInterviewStages ] = useState([])
  const [ selectedCandidate, setSelectedCandidate ] = useState('')
  const [ selectedJob, setSelectedJob ] = useState('')
  const [ selectedInterviewStage, setSelectedInterviewStage ] = useState('')
  const [columns, setColumns] = useState({});
  const [assignLoading, setAssignLoading] = useState(false)
  const { isOpen, onOpen, onClose } = useDisclosure()
  const toast = useToast()

  const onDragEnd = async (result, columns, setColumns) => {
    if (!result.destination) return;
    const { source, destination } = result;
  
    if (source.droppableId !== destination.droppableId) {
      const sourceColumn = columns[source.droppableId];
      const destColumn = columns[destination.droppableId];
      const sourceItems = [...sourceColumn.items];
      const destItems = [...destColumn.items];
      const [removed] = sourceItems.splice(source.index, 1);
      let targetCandidate = removed;
      destItems.splice(destination.index, 0, removed);

      // Perform a PATCH request to change a candidate's interview stage.
      await assignCandidateToInterviewStage(targetCandidate.candidateID, targetCandidate.interviewID, destination.droppableId)
      setColumns({
        ...columns,
        [source.droppableId]: {
          ...sourceColumn,
          items: sourceItems
        },
        [destination.droppableId]: {
          ...destColumn,
          items: destItems
        }
      });
    } else {
      const column = columns[source.droppableId];
      const copiedItems = [...column.items];
      const [removed] = copiedItems.splice(source.index, 1);
      copiedItems.splice(destination.index, 0, removed);
      setColumns({
        ...columns,
        [source.droppableId]: {
          ...column,
          items: copiedItems
        }
      });
    }
  };

  const loadCandidatesOnPipeline = async () => {
    const candidatesPerInterviewStages = await fetchInterviewStagesPerJob(selectedJobID, {});
    setColumns(candidatesPerInterviewStages)
  }

  const fetchCandidates = async () => {
    const candidates = await fetchAllCandidates()
    setAllCandidates(candidates)
  }

  const fetchInterviewStages = async () => {
    const interviewStages = await fetchAllInterviewStages()
    setAllInterviewStages(interviewStages.all)
  }

  const handleAssign = async () => {
    await assignCandidateToJob(selectedCandidate, selectedJob, selectedInterviewStage)
    toast({
      title: 'Candidate has been assigned.',
      description: 'Refresh the page to see changes reflected.',
      status: 'success',
      duration: 4000,
      isClosable: true,
    })
  }

  useEffect(() => {
    fetchCandidates()
    fetchInterviewStages()
  }, [])

  useEffect(() => {
    loadCandidatesOnPipeline()
  }, [selectedJobID])

  return (
      <div>
        <Button onClick={onOpen}>Assign candidate</Button>
        <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
            <ModalHeader>Candidate</ModalHeader>
            <Select placeholder='Select candidate' onChange={(event) => setSelectedCandidate(event.target.value)}>
              {allCandidates.map((candidate, index) => {
                    return <option key={candidate.id} value={candidate.id}>{candidate.name}</option>
                  })}
            </Select>
            <ModalHeader>Job</ModalHeader>
            <Select placeholder='Select job' onChange={(event) => setSelectedJob(event.target.value)}>
              {jobs.map((job, index) => {
                  return <option key={job.id} value={job.id}>{job.name}</option>
                })}
            </Select>
            <ModalHeader>Interview stage for {selectedJobID}</ModalHeader>
            <Select placeholder='Select interview stage' onChange={(event) => setSelectedInterviewStage(event.target.value)}>
              {allInterviewStages.map((interviewStageObject, index) => {
                    return <option key={index} value={interviewStageObject[0]}>{interviewStageObject[1]}</option>
                  })}
            </Select>
            <ModalCloseButton />
            <ModalFooter>
                <Button colorScheme='blue' mr={3} onClick={onClose}>
                Close
                </Button>
                <Button variant='ghost' isLoading={assignLoading} loadingText='Assigning' onClick={handleAssign}>Assign</Button>
            </ModalFooter>
            </ModalContent>
        </Modal>
        {Object.keys(columns).length > 0 && 
          <div
              style={{ display: "flex", justifyContent: "center", height: "100%", marginTop: "100px" }}
          >
              <DragDropContext
              onDragEnd={(result) => onDragEnd(result, columns, setColumns)}
              >
              {Object.entries(columns).map(([columnId, column], index) => {
                  return (
                  <div
                      style={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center"
                      }}
                      key={columnId}
                  >
                      <h2>{column.name}</h2>
                      <div style={{ margin: 8 }}>
                      <Droppable droppableId={columnId} key={columnId}>
                          {(provided, snapshot) => {
                          return (
                              <div
                              {...provided.droppableProps}
                              ref={provided.innerRef}
                              style={{
                                  background: snapshot.isDraggingOver
                                  ? "lightblue"
                                  : "lightgrey",
                                  padding: 4,
                                  width: 250,
                                  minHeight: 500
                              }}
                              >
                              {column.items.map((item, index) => {
                                  return (
                                  <Draggable
                                      key={item.id}
                                      draggableId={item.id}
                                      index={index}
                                  >
                                      {(provided, snapshot) => {
                                      return (
                                          <div
                                          ref={provided.innerRef}
                                          {...provided.draggableProps}
                                          {...provided.dragHandleProps}
                                          style={{
                                              userSelect: "none",
                                              padding: 16,
                                              margin: "0 0 8px 0",
                                              minHeight: "50px",
                                              backgroundColor: snapshot.isDragging
                                              ? "#263B4A"
                                              : "#456C86",
                                              color: "white",
                                              ...provided.draggableProps.style
                                          }}
                                          >
                                          {item.candidateName}
                                          </div>
                                      );
                                      }}
                                  </Draggable>
                                  );
                              })}
                              {provided.placeholder}
                              </div>
                          );
                          }}
                      </Droppable>
                      </div>
                  </div>
                  );
              })}
              </DragDropContext>
          </div>
        }
      </div>
  );
}

export default PipelinePage;