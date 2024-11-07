import {
    Card,
    CardBody,
    CardHeader,
    CardFooter,
    Text,
    Textarea,
    Button,
    Heading,
    FlexProps,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    useToast,
    useDisclosure,
    HStack,
  } from '@chakra-ui/react'
import { useState } from 'react'
import { updateFeedback } from '@/app/api/utilities'

interface CandidateCardProps extends FlexProps {
    id: string,
    name: string,
    email: string,
    feedback: string
  }

export const CandidateCard = ({ id, name, email, feedback }: CandidateCardProps) => {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const [ editFeedback, setEditFeedback ] = useState(feedback)
    const toast = useToast()

    const handleFeedback = async () => {
        await updateFeedback(id, editFeedback)
        toast({
            title: 'Candidate feedback has been edited.',
            status: 'success',
            duration: 4000,
            isClosable: true,
          })
    }

    return (
        <Card>
            <CardHeader>
                <Heading size='md'>{name}</Heading>
            </CardHeader>
            <CardBody>
                <Text>{email}</Text>
            </CardBody>
            <CardFooter>
                <HStack>
                    <Button color={"blue"} onClick={onOpen}>Feedback</Button>
                    <Modal isOpen={isOpen} onClose={onClose}>
                        <ModalOverlay />
                        <ModalContent>
                        <ModalHeader>Feedback</ModalHeader>
                        <ModalCloseButton />
                        <ModalBody>
                            <Textarea 
                                    value={editFeedback}
                                    onChange={(event) => setEditFeedback(event.target.value)}
                                    size='lg'
                                />
                        </ModalBody>

                        <ModalFooter>
                            <Button colorScheme='blue' mr={3} onClick={onClose}>
                            Close
                            </Button>
                            <Button variant='ghost' onClick={handleFeedback}>Submit</Button>
                        </ModalFooter>
                        </ModalContent>
                    </Modal>
                </HStack>
            </CardFooter>
        </Card>
    )
  }