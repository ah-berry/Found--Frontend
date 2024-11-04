'use client'
import {
    Stack,
    Button,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalCloseButton,
    Text,
    Input,
    useDisclosure,
  } from '@chakra-ui/react'
import { useEffect, useState } from 'react';
import { CandidateCard } from "@/../components/CandidateCard";
import { fetchAllCandidates, fetchAllCandidatesForJob, createCandidate } from "@/app/api/utilities"
import { useAppContext } from '../layout';

export default function CandidatesPage() {
    const { selectedJobID } = useAppContext()
    const [candidates, setCandidates ] = useState([]);
    const [candidateName, setCandidateName] = useState('');
    const handleCandidateNameChange = (event) => setCandidateName(event.target.value)
    const [candidateEmail, setCandidateEmail] = useState('');
    const handleCandidateEmailChange = (event) => setCandidateEmail(event.target.value)
    const [candidateFeedback, setCandidateFeedback] = useState('');
    const handleCandidateFeedbackChange = (event) => setCandidateFeedback(event.target.value)
    const [createLoading, setCreateLoading] = useState(false);
    const { isOpen, onOpen, onClose } = useDisclosure()

    const handleCandidateCreation = async () => {
      setCreateLoading(true)
      const body = {
        name: candidateName,
        email: candidateEmail,
        feedback: candidateFeedback
      }
      const candidateData = await createCandidate(body);
      setCreateLoading(false)
    }

    const fetchCandidates = async () => {
      const candidatesData = await fetchAllCandidatesForJob(selectedJobID, {})
      setCandidates(candidatesData)
    }

    useEffect(() => {
        fetchCandidates()
    }, [selectedJobID])

    return (
      <div>
        <Button onClick={onOpen}>Add candidate</Button>
        <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
            <ModalHeader>Create candidate</ModalHeader>
            <ModalCloseButton />
            <Text mb='8px'>Name: </Text>
            <Input
              value={candidateName}
              onChange={handleCandidateNameChange}
              placeholder='Enter candidate name.'
              size='sm'
            />
            <Text mb='8px'>Email: </Text>
            <Input
              value={candidateEmail}
              onChange={handleCandidateEmailChange}
              placeholder='Enter candidate email.'
              size='sm'
            />
            <Text mb='8px'>Feedback: </Text>
            <Input
              value={candidateFeedback}
              onChange={handleCandidateFeedbackChange}
              placeholder='Enter feedback for candidate.'
              size='sm'
            />
            <ModalFooter>
                <Button colorScheme='blue' mr={3} onClick={onClose}>
                Close
                </Button>
                <Button variant='ghost' isLoading={createLoading} loadingText='Creating' onClick={handleCandidateCreation}>Create</Button>
            </ModalFooter>
            </ModalContent>
        </Modal>
        <Stack direction='column'>
          {candidates ? candidates.map((candidate, index) => {
              return <CandidateCard 
                        key={parseInt(index)} 
                        name={candidate.name} 
                        email={candidate.email} 
                        feedback={candidate.feedback}
                      />
          }) : null}
        </Stack>
      </div>
    )
}