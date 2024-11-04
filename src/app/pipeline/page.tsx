'use client'
import React, { useEffect, useState } from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { fetchAllCandidatesPerStages, assignCandidateToInterviewStage, fetchAllCandidatesForJob, fetchInterviewStagesPerJob } from '@/app/api/utilities'
import { 
  Button, 
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalCloseButton,
  Select,
  useDisclosure 
} from "@chakra-ui/react"
import { useAppContext } from "../layout";

function PipelinePage() {
  const { selectedJobID } = useAppContext()
  const [columns, setColumns] = useState({});
  const [assignLoading, setAssignLoading] = useState(false)
  const { isOpen, onOpen, onClose } = useDisclosure()

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
    const interviewStages = await fetchInterviewStagesPerJob(selectedJobID, {});
    setColumns(interviewStages)
  }

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
            <Select placeholder='Select candidate'>

            </Select>
            <ModalHeader>Interview stage for {selectedJobID}</ModalHeader>
            <Select placeholder='Select interview stage'>
              
            </Select>
            <ModalCloseButton />
            <ModalFooter>
                <Button colorScheme='blue' mr={3} onClick={onClose}>
                Close
                </Button>
                <Button variant='ghost' isLoading={assignLoading} loadingText='Assigning'>Assign</Button>
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