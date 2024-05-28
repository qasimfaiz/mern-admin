import React, { useEffect, useState } from 'react';
import Avatar from 'react-avatar';
import {
  Box,
  Image,
  Heading,
  Text,
  Button,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverHeader,
  PopoverBody,
  PopoverFooter,
  IconButton,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  ModalCloseButton,
  PopoverArrow,
  PopoverCloseButton,
  FormControl,
  FormLabel,
  Input,
  Select,
  CircularProgress,
  useDisclosure,
  VStack,
  Flex,
  Badge,
  Icon,
  InputRightElement,
  InputGroup,
  Center,
} from '@chakra-ui/react';
import { FaEllipsisV } from 'react-icons/fa';
import { AiFillDelete, AiFillEye } from 'react-icons/ai';
import { useDispatch, useSelector } from 'react-redux';
import { FaCheckCircle, FaBan } from 'react-icons/fa';
import {
  AddAdmin,
  AllAdmins,
  updateAdmin,
} from '../redux/features/admin/adminThunks';
import DeleteConfirmationDialog from './Modals/DeleteConfirmationDialog';
import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';
import { InputText } from 'primereact/inputtext';
import { CloseIcon, ViewIcon, ViewOffIcon } from '@chakra-ui/icons';

const Admins = () => {
  const dispatch = useDispatch();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = React.useRef();
  const { admin, isLoading } = useSelector(state => state.admin);

  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [viewAdmin, setViewAdmin] = useState(null);
  const [currentId, setCurrentId] = useState(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [globalFilter, setGlobalFilter] = useState('');
  const [selectedAdmin, setSelectedAdmin] = useState(null);
  const [editUsername, setEditUsername] = useState('');
  const [editEmail, setEditEmail] = useState('');
  const [editRole, setEditRole] = useState('');
  const [editStatus, setEditStatus] = useState('');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(prevShowPassword => !prevShowPassword);
  };
  const handleOpenAddModal = () => {
    setIsAddModalOpen(true);
  };
  const handleCloseAddModal = () => {
    setIsAddModalOpen(false);
  };

  const handleAddAdminUser = async () => {
    try {
      const response = await dispatch(AddAdmin({ username, email, password }));
      console.log('Response:', response);
      if (response.payload && response.payload.status === 200) {
        handleCloseAddModal(); // Close the modal after submission
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleViewAdmin = adminId => {
    setIsViewModalOpen(true);
    // Logic to fetch and set the selected admin based on the adminId
    const selectedAdmin = admin.find(admin => admin._id === adminId);
    setViewAdmin(selectedAdmin);
  };

  const handleCloseViewModal = () => {
    setIsViewModalOpen(false);
  };

  const handleEditAdmin = admin => {
    setSelectedAdmin(admin);
    setEditUsername(admin.username);
    setEditEmail(admin.email);
    setEditRole(admin.role);
    setEditStatus(admin.status);
    setIsEditModalOpen(true);
  };

  const handleSaveAdmin = async () => {
    // Implement your save edit functionality here
    const updatedAdmin = {
      ...selectedAdmin,
      username: editUsername,
      email: editEmail,
      role: editRole,
      status: editStatus,
    };

    // Update the user array with the updated user
    try {
      const response = await dispatch(updateAdmin(updatedAdmin));
      if (response.payload && response.payload.status === 200) {
        setIsEditModalOpen(false);
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Box p={1}>
      {/* Row for Add Button and Search Input */}
      <Flex align="center" justify="space-between" marginBottom={5}>
        <Button colorScheme="green" onClick={handleOpenAddModal}>
          Add Admin
        </Button>
        <Box width="30">
          <InputText
            value={globalFilter}
            onChange={e => setGlobalFilter(e.target.value)}
            placeholder="Search"
            mb={4}
          />
        </Box>
      </Flex>

      {isLoading ? (
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          minHeight="50vh"
          marginLeft={{ base: '0', md: '0px' }}
        >
          <CircularProgress size="120px" isIndeterminate thickness="6px" />
        </Box>
      ) : (
        <DataTable
          value={admin}
          selectionMode="single"
          selection={selectedAdmin}
          onSelectionChange={e => setSelectedAdmin(e.value)}
          paginator
          rows={10}
          rowsPerPageOptions={[5, 10, 25]}
          globalFilter={globalFilter}
          emptyMessage="No admins found."
        >
          <Column field="_id" header="NO." sortable />
          <Column
            header="Profile"
            body={rowData => (
              <Avatar
                round={true}
                size="50"
                src={rowData?.image?.profilePic}
                alt="Admin Avatar"
                name={rowData.username}
              />
            )}
          />
          <Column field="username" header="Name" sortable />
          <Column field="email" header="Email" sortable />
          <Column field="role" header="Role" sortable />
          <Column
            field="status"
            header="Status"
            sortable
            body={rowData => (
              <Flex alignItems="center">
                {rowData.status === 'active' ? (
                  <Icon
                    as={FaCheckCircle}
                    boxSize={6}
                    color="green.500"
                    mr={2}
                  />
                ) : (
                  <Icon as={FaBan} boxSize={6} color="red.500" mr={2} />
                )}
                <Text
                  fontSize="sm"
                  fontWeight="bold"
                  color={rowData.status === 'active' ? 'green.500' : 'red.500'}
                >
                  {rowData.status === 'active' ? 'Active' : 'Suspended'}
                </Text>
              </Flex>
            )}
          />
          <Column
            header="Actions"
            body={rowData => (
              <Popover>
                <PopoverTrigger>
                  <Button>
                    <FaEllipsisV />
                  </Button>
                </PopoverTrigger>
                <PopoverContent maxWidth="120px">
                  <PopoverArrow />
                  <PopoverCloseButton />
                  <PopoverBody display="flex" flexDirection="column" p={2}>
                    <Button
                      size="sm"
                      colorScheme="teal"
                      onClick={() => handleViewAdmin(rowData._id)}
                      mb={2}
                      maxWidth="100px"
                    >
                      View
                    </Button>
                    <Button
                      size="sm"
                      colorScheme="blue"
                      onClick={() => handleEditAdmin(rowData)}
                      mb={2}
                      maxWidth="100px"
                    >
                      Edit
                    </Button>
                    <Button
                      maxWidth="100px"
                      size="sm"
                      colorScheme="red"
                      onClick={() => {
                        onOpen();
                        setCurrentId(rowData._id);
                      }}
                    >
                      Delete
                    </Button>
                    <DeleteConfirmationDialog
                      isOpen={isOpen}
                      onClose={onClose}
                      id={currentId}
                      cancelRef={cancelRef}
                      itemLabel="admin"
                    />
                  </PopoverBody>
                </PopoverContent>
              </Popover>
            )}
          />
        </DataTable>
      )}

      {/* Add modal  */}
      <Modal isOpen={isAddModalOpen} onClose={handleCloseAddModal}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Add Admin</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl>
              <FormLabel>Username</FormLabel>
              <Input
                placeholder="Enter username"
                onChange={e => setUsername(e.target.value)}
              />
            </FormControl>
            <FormControl mt={4}>
              <FormLabel>Email</FormLabel>
              <Input
                type="email"
                placeholder="Enter email"
                onChange={e => setEmail(e.target.value)}
              />
            </FormControl>
            <FormControl mt={4}>
              <FormLabel>Password</FormLabel>

              <InputGroup>
                <Input
                  placeholder="Enter password"
                  _placeholder={{ color: 'gray.500' }}
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  onChange={e => setPassword(e.target.value)}
                />
                <InputRightElement width="4.5rem">
                  <IconButton
                    h="1.75rem"
                    size="sm"
                    onClick={togglePasswordVisibility}
                    aria-label={
                      showPassword ? 'Hide password' : 'Show password'
                    }
                    icon={showPassword ? <ViewOffIcon /> : <ViewIcon />}
                  />
                </InputRightElement>
              </InputGroup>
            </FormControl>
            {/* Add any other form fields you want for adding admin/user */}
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" onClick={handleAddAdminUser}>
              Add
            </Button>
            <Button variant="ghost" onClick={handleCloseAddModal}>
              Cancel
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      <Modal isOpen={isViewModalOpen} onClose={handleCloseViewModal}>
        <ModalOverlay />
        <ModalContent
          borderRadius="lg"
          bg="white"
          p={4}
          maxW="md"
          boxShadow="lg"
          mx="auto"
        >
          <ModalHeader>
            <Box as="span" fontWeight="bold" fontSize="2xl">
              View Admin Details
            </Box>
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {/* Content to display admin details */}
            {viewAdmin && (
              <VStack spacing={4} align="left">
                <Center>
                  <Avatar
                    round={true}
                    name={viewAdmin.username}
                    src={viewAdmin?.image?.profilePic}
                    size={150}
                  />
                </Center>
                <Box>
                  <Box fontWeight="bold" fontSize="lg">
                    Username:
                  </Box>
                  <Box fontSize="md">{viewAdmin.username}</Box>
                </Box>
                <Box>
                  <Box fontWeight="bold" fontSize="lg">
                    Email:
                  </Box>
                  <Box fontSize="md">{viewAdmin.email}</Box>
                </Box>
                <Box>
                  <Box fontWeight="bold" fontSize="lg">
                    Status:
                  </Box>
                  <Box
                    fontSize="md"
                    color={
                      viewAdmin.status === 'active' ? 'green.500' : 'red.500'
                    }
                  >
                    {viewAdmin.status}
                  </Box>
                </Box>
                <Box>
                  <Box fontWeight="bold" fontSize="lg">
                    Role:
                  </Box>
                  <Box fontSize="md">{viewAdmin.role}</Box>
                </Box>
              </VStack>
            )}
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" onClick={handleCloseViewModal}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
      <Modal isOpen={isEditModalOpen} onClose={() => setIsEditModalOpen(false)}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Edit Admin</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {/* Content to edit admin details */}
            {selectedAdmin && (
              <Box>
                <FormControl>
                  <FormLabel>Name</FormLabel>
                  <Input
                    value={editUsername}
                    onChange={e => setEditUsername(e.target.value)}
                  />
                </FormControl>
                <FormControl mt={4}>
                  <FormLabel>Email</FormLabel>
                  <Input
                    value={editEmail}
                    onChange={e => setEditEmail(e.target.value)}
                  />
                </FormControl>
                {/* Add form fields to edit admin details */}
                <Box>
                  <Box fontWeight="bold">Status:</Box>
                  <Select
                    value={editStatus}
                    onChange={e => setEditStatus(e.target.value)}
                    width="100%"
                  >
                    <option value="active">Active</option>
                    <option value="suspended">Suspend</option>
                  </Select>
                </Box>
                <Box>
                  <Box fontWeight="bold">Role:</Box>
                  <Select
                    value={editRole}
                    onChange={e => setEditRole(e.target.value)}
                    width="100%"
                  >
                    <option value="admin">Admin</option>
                    <option value="user">User</option>
                  </Select>
                </Box>
              </Box>
            )}
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" onClick={handleSaveAdmin}>
              Save
            </Button>
            <Button variant="ghost" onClick={() => setIsEditModalOpen(false)}>
              Cancel
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default Admins;
