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
    HStack,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    useToast,
    useDisclosure,
  } from '@chakra-ui/react'
import { useState } from 'react'
import { editJobDescription, archiveJob, deleteJob } from '@/app/api/utilities'

interface JobCardProps extends FlexProps {
    id: string,
    name: string,
    description: string,
    isArchived?: boolean
  }


export const JobCard = ({ id, name, description, isArchived }: JobCardProps) => {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const [ buttonSelected, setButtonSelected ] = useState('')
    const [ editDescription, setEditDescription ] = useState(description)
    const toast = useToast()

    const handleModalShowcase = (buttonValue: string) => {
        setButtonSelected(buttonValue)
        onOpen();
    }

    const handleEdit = async () => {
        await editJobDescription(id, editDescription)
        toast({
            title: 'Job posting has been edited.',
            status: 'success',
            duration: 4000,
            isClosable: true,
          })
    }

    const handleDelete = async () => {
        await deleteJob(id)
        toast({
            title: 'Job posting has been deleted.',
            status: 'success',
            duration: 4000,
            isClosable: true,
          })
    }

    const handleArchive = async (archiveOrNot: boolean) => {
        console.log('What is the job id here? ', id)
        await archiveJob(id, archiveOrNot)
        toast({
            title: archiveOrNot ? 'Job posting has been archived.': 'Job posting has been unarchived.',
            description: archiveOrNot ? `Check 'Archive' page.`: `Check 'Unarchive' page.`,
            status: 'success',
            duration: 4000,
            isClosable: true,
          })
    }

    const modalShowcase = (buttonSelected: string) => {
        switch (buttonSelected) {
            case 'Edit':
                return (
                    <Modal isOpen={isOpen} onClose={onClose}>
                        <ModalOverlay />
                        <ModalContent>
                            <ModalHeader>Edit</ModalHeader>
                            <ModalCloseButton />
                            <ModalBody>
                                <Textarea 
                                    value={editDescription}
                                    onChange={(event) => setEditDescription(event.target.value)}
                                    size='lg'
                                />
                            </ModalBody>

                            <ModalFooter>
                                <Button colorScheme='blue' mr={3} onClick={onClose}>
                                Close
                                </Button>
                                <Button variant='ghost' onClick={handleEdit}>Save</Button>
                            </ModalFooter>
                        </ModalContent>
                    </Modal>
                );

            case 'Archive':
                return (
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
                                <Button variant='ghost' onClick={() => handleArchive(true)}>Yes</Button>
                            </ModalFooter>
                        </ModalContent>
                    </Modal>
                );

            case 'Unarchive': 
                return (
                    <Modal isOpen={isOpen} onClose={onClose}>
                        <ModalOverlay />
                        <ModalContent>
                            <ModalHeader>Unarchive</ModalHeader>
                            <ModalCloseButton />
                            <ModalBody>
                                Are you sure you want to unarchive the {name} position?
                            </ModalBody>

                            <ModalFooter>
                                <Button colorScheme='blue' mr={3} onClick={onClose}>
                                No
                                </Button>
                                <Button variant='ghost' onClick={() => handleArchive(false)}>Yes</Button>
                            </ModalFooter>
                        </ModalContent>
                    </Modal>
                );

            case 'Delete':
                return (
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
                                <Button variant='ghost' onClick={handleDelete}>Yes</Button>
                            </ModalFooter>
                        </ModalContent>
                    </Modal>);
        }
    }

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
                    <Button onClick={() => handleModalShowcase('Edit')}>Edit</Button>
                </CardFooter>
                <CardFooter>
                    {isArchived ? <Button color={"orange"} onClick={() => handleModalShowcase('Unarchive')}>Unarchive</Button>: 
                        <Button color={"blue"} onClick={() => handleModalShowcase('Archive')}>Archive</Button>}
                </CardFooter>
                <CardFooter>
                    <Button color={"red"} onClick={() => handleModalShowcase('Delete')}>Delete</Button>
                </CardFooter>
                {modalShowcase(buttonSelected)}
            </HStack>
        </Card>
    )
  }