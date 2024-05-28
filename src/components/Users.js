import React, { useState } from 'react';
import { FaEllipsisV } from 'react-icons/fa';
import {
  Image,
  Box,
  VStack,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Button,
  Select,
  Input,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverBody,
  PopoverArrow,
  PopoverCloseButton,
  Flex,
  Spacer,
  Square,
  GridItem,
  Grid,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalFooter,
  ModalBody,
  CircularProgress,
  useDisclosure,
  FormControl,
  FormLabel,
  InputGroup,
  InputRightElement,
  IconButton,
  Badge,
  Icon,
  Text,
  Center,
} from '@chakra-ui/react';
import { FaCheckCircle, FaBan } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import DeleteConfirmationDialog from './Modals/DeleteConfirmationDialog';
import { AddUser, updateUser } from '../redux/features/user/userThunks';
import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';
import { InputText } from 'primereact/inputtext';
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';
import Avatar from 'react-avatar';

const UserComponent = () => {
  const dispatch = useDispatch();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = React.useRef();
  const [currentId, setCurrentId] = useState(null);

  const { user, isLoading } = useSelector(state => state.user);

  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [editUsername, setEditUsername] = useState('');
  const [editEmail, setEditEmail] = useState('');
  const [editRole, setEditRole] = useState('');
  const [editStatus, setEditStatus] = useState('');
  const [globalFilter, setGlobalFilter] = useState('');
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
      const response = await dispatch(AddUser({ username, email, password }));
      console.log('Response:', response);
      if (response.payload && response.payload.status === 200) {
        handleCloseAddModal(); // Close the modal after submission
      }
    } catch (error) {
      console.log(error);
    }
  };
  const handleViewUser = user => {
    setSelectedUser(user);
    setIsViewModalOpen(true);
  };

  const handleEditUser = user => {
    setSelectedUser(user);
    setEditUsername(user.username);
    setEditEmail(user.email);
    setEditRole(user.role);
    setEditStatus(user.status);
    setIsEditModalOpen(true);
  };

  const handleSaveEditUser = async () => {
    // Implement your save edit functionality here
    const updatedUser = {
      ...selectedUser,
      username: editUsername,
      email: editEmail,
      role: editRole,
      status: editStatus,
    };
    try {
      const response = await dispatch(updateUser(updatedUser));
      if (response.payload && response.payload.status === 200) {
        setIsEditModalOpen(false);
      }
    } catch (error) {}
  };

  const handleCloseModal = () => {
    setIsViewModalOpen(false);
    setIsEditModalOpen(false);
  };

  return (
    <Box className="user-component" p={1}>
      <Flex align="center" justify="space-between" marginBottom={5}>
        <Button colorScheme="green" onClick={handleOpenAddModal}>
          Add User
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
          value={user}
          selectionMode="single"
          selection={selectedUser}
          onSelectionChange={e => setSelectedUser(e.value)}
          paginator
          rows={10}
          rowsPerPageOptions={[5, 10, 25]}
          globalFilter={globalFilter}
          emptyMessage="No users found."
        >
          <Column field="_id" header="No." sortable />
          <Column
            header="Profile"
            body={rowData => (
              <Avatar
                src={rowData?.image?.profilePic}
                name={rowData.username}
                size="50"
                round={true}
              />
            )}
          />
          <Column field="username" header="User" sortable />
          <Column field="email" header="Email" sortable />
          {/* Uncomment the line below if you want to display the password field */}
          {/* <Column field="password" header="Password" sortable /> */}
          <Column field="role" header="Role" />
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
            header="Action"
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
                      onClick={() => handleViewUser(rowData)}
                      mb={2}
                      maxWidth="100px"
                    >
                      View
                    </Button>
                    <Button
                      size="sm"
                      colorScheme="blue"
                      onClick={() => handleEditUser(rowData)}
                      mb={2}
                      maxWidth="100px"
                    >
                      Edit
                    </Button>
                    <Button
                      size="sm"
                      colorScheme="red"
                      onClick={() => {
                        onOpen();
                        setCurrentId(rowData._id);
                      }}
                      mb={2}
                      maxWidth="100px"
                    >
                      Delete
                    </Button>
                    <DeleteConfirmationDialog
                      isOpen={isOpen}
                      onClose={onClose}
                      id={currentId}
                      cancelRef={cancelRef}
                      itemLabel="user"
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
          <ModalHeader>Add User</ModalHeader>
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
                    icon={showPassword ? <ViewOffIcon /> : <ViewOffIcon />}
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

      {/* View modal */}
      <Modal isOpen={isViewModalOpen} onClose={handleCloseModal}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>User Details</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {selectedUser && (
              <VStack spacing={4} align="left">
                <Center>
                  <Avatar
                    round={true}
                    name={selectedUser.username}
                    src={selectedUser?.image?.profilePic}
                    size={150}
                  />
                </Center>
                <Box>
                  <Box fontWeight="bold" fontSize="lg">
                    Username:
                  </Box>
                  <Box fontSize="md">{selectedUser.username}</Box>
                </Box>
                <Box>
                  <Box fontWeight="bold" fontSize="lg">
                    Email:
                  </Box>
                  <Box fontSize="md">{selectedUser.email}</Box>
                </Box>
                <Box>
                  <Box fontWeight="bold" fontSize="lg">
                    Status:
                  </Box>
                  <Box
                    fontSize="md"
                    color={
                      selectedUser.status === 'active' ? 'green.500' : 'red.500'
                    }
                  >
                    {selectedUser.status}
                  </Box>
                </Box>
                <Box>
                  <Box fontWeight="bold" fontSize="lg">
                    Role:
                  </Box>
                  <Box fontSize="md">{selectedUser.role}</Box>
                </Box>
              </VStack>
            )}
          </ModalBody>
          <ModalFooter>
            <Button onClick={handleCloseModal}>Close</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      {/* Edit modal */}
      <Modal isOpen={isEditModalOpen} onClose={handleCloseModal}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Edit User</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {selectedUser && (
              <VStack spacing={4} align="left">
                <Box>
                  <Box fontWeight="bold">Username:</Box>
                  <Input
                    value={editUsername}
                    onChange={e => setEditUsername(e.target.value)}
                    width="100%"
                  />
                </Box>
                <Box>
                  <Box fontWeight="bold">Email:</Box>
                  <Input
                    value={editEmail}
                    onChange={e => setEditEmail(e.target.value)}
                    width="100%"
                  />
                </Box>
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
              </VStack>
            )}
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" onClick={handleSaveEditUser}>
              Save
            </Button>
            <Button onClick={handleCloseModal}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default UserComponent;
