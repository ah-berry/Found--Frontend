import {
    Card,
    CardBody,
    CardHeader,
    CardFooter,
    Text,
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
    useDisclosure,
    HStack,
  } from '@chakra-ui/react'

interface CandidateCardProps extends FlexProps {
    name: string,
    email: string,
    feedback: string
  }

export const CandidateCard = ({ name, email, feedback }: CandidateCardProps) => {
    const { isOpen, onOpen, onClose } = useDisclosure()

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
                            {feedback}
                        </ModalBody>

                        <ModalFooter>
                            <Button colorScheme='blue' mr={3} onClick={onClose}>
                            Close
                            </Button>
                            <Button variant='ghost'>Submit</Button>
                        </ModalFooter>
                        </ModalContent>
                    </Modal>
                </HStack>
            </CardFooter>
        </Card>
    )
  }