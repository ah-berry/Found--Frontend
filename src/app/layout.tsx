"use client";
import { ChakraProvider } from "@chakra-ui/react";
import {
  Drawer,
  DrawerContent,
  IconButton,
  Avatar,
  Box,
  Flex,
  HStack,
  VStack,
  useColorModeValue,
  Text,
  Select,
  FlexProps,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
  Stack,
  useDisclosure,
} from '@chakra-ui/react'
import {
  FiMenu,
  FiChevronDown,
} from 'react-icons/fi'
import { SidebarContent, MobileNav } from "../../components/SidebarWithHeader";
import { useState, useEffect, createContext, useContext } from "react"
import { fetchAllJobs } from "./api/utilities";
interface MobileProps extends FlexProps {
  onOpen: () => void
}

interface ContextType {
  selectedJobID: string
}

const defaultContext: ContextType = {
  selectedJobID: "all"
}

let Context = createContext<ContextType>(defaultContext) 

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [jobs, setJobs] = useState([]);
  const [selectedJobID, setSelectedJobID] = useState(defaultContext.selectedJobID)
  const { isOpen, onOpen, onClose } = useDisclosure()

  const fetchJobsForSelector = async() => {
    const jobsData = await fetchAllJobs();
    setJobs(jobsData)
  }

  useEffect(() => {
    fetchJobsForSelector()
  }, [])

  return (
    <html lang="en">
      <body>
        <ChakraProvider>
          <Box minH="100vh" bg={useColorModeValue('gray.100', 'gray.900')}>
            <SidebarContent onClose={() => onClose} display={{ base: 'none', md: 'block' }} />
                <Drawer
                isOpen={isOpen}
                placement="left"
                onClose={onClose}
                returnFocusOnClose={false}
                onOverlayClick={onClose}
                size="full">
                    <DrawerContent>
                        <SidebarContent onClose={onClose} />
                    </DrawerContent>
                </Drawer>

                  <Flex
                    ml={{ base: 0, md: 60 }}
                    px={{ base: 4, md: 4 }}
                    height="20"
                    alignItems="center"
                    bg={useColorModeValue('white', 'gray.900')}
                    borderBottomWidth="1px"
                    borderBottomColor={useColorModeValue('gray.200', 'gray.700')}
                    justifyContent={{ base: 'space-between', md: 'flex-end' }}>
                    <IconButton
                      display={{ base: 'flex', md: 'none' }}
                      onClick={onOpen}
                      variant="outline"
                      aria-label="open menu"
                      icon={<FiMenu />}
                    />

                    <Text
                      display={{ base: 'flex', md: 'none' }}
                      fontSize="2xl"
                      fontFamily="monospace"
                      fontWeight="bold">
                      Logo
                    </Text>

                    <HStack spacing={{ base: '0', md: '6' }}>
                      <Stack spacing={{ base: '0', md: '6' }}>
                        {/* {jobs ? 
                          <Select placeholder='Select job' onChange={(event) => setSelectedJobID(event.target.value)}>
                            <option value='all'>All</option>
                            {jobs.map((job, index) => {
                              return <option key={job.id} value={job.id}>{job.name}</option>
                            })}
                          </Select>
                        :null} */}
                        {jobs ? 
                          <Select placeholder='Select job'>
                            <option value='all'>All</option>
                            {jobs.map((job, index) => {
                              return <option key={job.id} value={job.id}>{job.name}</option>
                            })}
                          </Select>
                        :null}
                      </Stack>
                      <Flex alignItems={'center'}>
                        <Menu>
                          <MenuButton py={2} transition="all 0.3s" _focus={{ boxShadow: 'none' }}>
                            <HStack>
                              <Avatar
                                size={'sm'}
                                src={
                                  'https://images.unsplash.com/photo-1619946794135-5bc917a27793?ixlib=rb-0.3.5&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&s=b616b2c5b373a80ffc9636ba24f7a4a9'
                                }
                              />
                              <VStack
                                display={{ base: 'none', md: 'flex' }}
                                alignItems="flex-start"
                                spacing="1px"
                                ml="2">
                                <Text fontSize="sm">Justina Clark</Text>
                                <Text fontSize="xs" color="gray.600">
                                  Admin
                                </Text>
                              </VStack>
                              <Box display={{ base: 'none', md: 'flex' }}>
                                <FiChevronDown />
                              </Box>
                            </HStack>
                          </MenuButton>
                          <MenuList
                            bg={useColorModeValue('white', 'gray.900')}
                            borderColor={useColorModeValue('gray.200', 'gray.700')}>
                            <MenuItem>Profile</MenuItem>
                            <MenuItem>Settings</MenuItem>
                            <MenuDivider />
                            <MenuItem>Sign out</MenuItem>
                          </MenuList>
                        </Menu>
                      </Flex>
                    </HStack>
                  </Flex>

                <Context.Provider value={{selectedJobID: selectedJobID}}>
                  <Box ml={{ base: 0, md: 60 }} p="4">
                    {children}
                  </Box>
                </Context.Provider>
          </Box>
        </ChakraProvider>
      </body>
    </html>
  );
}

export function useAppContext() {
  return useContext(Context)
}