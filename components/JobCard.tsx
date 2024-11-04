import {
    Card,
    CardBody,
    CardHeader,
    CardFooter,
    Text,
    Button,
    Heading,
    FlexProps,
    HStack,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    useDisclosure,
  } from '@chakra-ui/react'

interface JobCardProps extends FlexProps {
    name: string,
    description: string,
    isArchived?: boolean
  }

export const JobCard = ({ name, description, isArchived }: JobCardProps) => {
    const { isOpen, onOpen, onClose } = useDisclosure()

    return (
        <Card>
            <CardHeader>
                <Heading size='md'>{name}</Heading>
            </CardHeader>
            <CardBody>
                <Text>{description}</Text>
            </CardBody>
            <HStack>
                <CardFooter>
                    <Button onClick={onOpen}>Edit</Button>
                </CardFooter>
                <Modal isOpen={isOpen} onClose={onClose}>
                    <ModalOverlay />
                    <ModalContent>
                        <ModalHeader>Edit</ModalHeader>
                        <ModalCloseButton />
                        <ModalBody>
                            {description}
                        </ModalBody>

                        <ModalFooter>
                            <Button colorScheme='blue' mr={3} onClick={onClose}>
                            Close
                            </Button>
                            <Button variant='ghost'>Save</Button>
                        </ModalFooter>
                    </ModalContent>
                </Modal>

                <CardFooter>
                    {isArchived ? <Button color={"orange"}>Unarchive</Button>: <Button color={"blue"} onClick={onOpen}>Archive</Button>}
                </CardFooter>
                <Modal isOpen={isOpen} onClose={onClose}>
                    <ModalOverlay />
                    <ModalContent>
                        <ModalHeader>Archive</ModalHeader>
                        <ModalCloseButton />
                        <ModalBody>
                            Are you sure you want to archive the {name} position?
                        </ModalBody>

                        <ModalFooter>
                            <Button colorScheme='blue' mr={3} onClick={onClose}>
                            No
                            </Button>
                            <Button variant='ghost'>Yes</Button>
                        </ModalFooter>
                    </ModalContent>
                </Modal>

                <CardFooter>
                    <Button color={"red"} onClick={onOpen}>Delete</Button>
                </CardFooter>
                <Modal isOpen={isOpen} onClose={onClose}>
                    <ModalOverlay />
                    <ModalContent>
                        <ModalHeader>Delete</ModalHeader>
                        <ModalCloseButton />
                        <ModalBody>
                            Are you sure you want to delete the {name} position?
                        </ModalBody>

                        <ModalFooter>
                            <Button colorScheme='blue' mr={3} onClick={onClose}>
                            No
                            </Button>
                            <Button variant='ghost'>Yes</Button>
                        </ModalFooter>
                    </ModalContent>
                </Modal>


            </HStack>
        </Card>
    )
  }