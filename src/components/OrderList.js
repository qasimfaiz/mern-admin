import {
  Box,
  VStack,
  Button,
  Select,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverBody,
  PopoverArrow,
  PopoverCloseButton,
  Flex,
  Square,
  GridItem,
  Grid,
  useDisclosure,
  CircularProgress,
} from '@chakra-ui/react';
import { FaEllipsisV } from 'react-icons/fa';
import React, { useState } from 'react';
import { updateOrder } from '../redux/features/orders/orderThunks';
import DeleteConfirmationDialog from './Modals/DeleteConfirmationDialog';
import { useDispatch, useSelector } from 'react-redux';
import { InputText } from 'primereact/inputtext';
import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';
const OrderList = () => {
  const dispatch = useDispatch();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = React.useRef();
  const { ordersList, isLoading } = useSelector(state => state.order);
  console.log(ordersList);

  const [isViewModalOpen, setIsViewModalOpen] = useState(false);

  const [currentId, setCurrentId] = useState(null);
  const [globalFilter, setGlobalFilter] = useState('');
  const [selectedOrder, setSelectedOrder] = useState(null);

  const handleViewOrder = order => {
    // Logic for viewing the details of an order with the provided orderSerial

    setSelectedOrder(order);
    setIsViewModalOpen(true);
  };

  const handleCloseViewModal = () => {
    setIsViewModalOpen(false);
  };
  const handleChangeStatus = (event, id) => {
    const status = event.target.value;

    // Update the state with the new array
    console.log({ status, id });
    updateOrder({ status, id }, dispatch);
  };

  const statusOptions = [
    { value: 'pending', label: 'Pending', colorScheme: 'gray.700' },
    { value: 'processing', label: 'Active', colorScheme: 'green' },
    { value: 'cancelled', label: 'Cancelled', colorScheme: 'orange' },
    { value: 'delivered', label: 'Delivered', colorScheme: 'blue' },
  ];

  const getTitleColor = status => {
    return statusOptions.find(option => option.value === status)?.colorScheme;
  };
  return (
    <Box p={1}>
      {' '}
      <Flex align="center" justify="space-between" marginBottom={5}>
        {/* Add Button */}

        <Box width="30">
          <InputText
            value={globalFilter}
            onChange={e => setGlobalFilter(e.target.value)}
            placeholder="Search"
            mb={4}
          />
        </Box>
      </Flex>
      <VStack align="stretch">
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
            value={ordersList}
            selectionMode="single"
            selection={selectedOrder}
            onSelectionChange={e => setSelectedOrder(e.value)}
            paginator
            rows={10}
            rowsPerPageOptions={[5, 10, 25]}
            globalFilter={globalFilter}
            emptyMessage="No orders found."
          >
            <Column field="_id" header="Order ID" sortable />
            <Column field="customer.username" header="Customer" sortable />
            <Column field="createdAt" header="Ordered Date" sortable />
            <Column
              field="status"
              header="Order Status"
              sortable
              body={rowData => (
                <div>
                  <Select
                    value={rowData.status}
                    onChange={event => handleChangeStatus(event, rowData._id)}
                    style={{ color: getTitleColor(rowData.status) }}
                  >
                    {statusOptions.map(option => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </Select>
                </div>
              )}
            />
            <Column
              field="amount"
              header="Amount"
              body={rowData => `$${rowData.amount}`}
              sortable
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
                        mb={2}
                        maxWidth="100px"
                        onClick={() => handleViewOrder(rowData)}
                      >
                        View
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
                        itemLabel="order"
                      />
                    </PopoverBody>
                  </PopoverContent>
                </Popover>
              )}
            />
          </DataTable>
        )}

        {isViewModalOpen && (
          <Box
            position="fixed"
            top="0"
            left="0"
            width="100%"
            height="100%"
            display="flex"
            alignItems="center"
            justifyContent="center"
            bg="rgba(0, 0, 0, 0.4)"
          >
            <Box
              maxW="700px"
              maxH="800px"
              width="100%"
              p={4}
              bg="white"
              borderRadius="md"
              boxShadow="md"
              overflowY="auto"
            >
              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                mb={4}
              >
                <Box fontSize="xl" fontWeight="bold">
                  Order Details
                </Box>
                <Button
                  size="sm"
                  colorScheme="red"
                  onClick={handleCloseViewModal}
                >
                  Close
                </Button>
              </Box>
              <Box>
                <Box>
                  <Box fontWeight="bold">Order ID: {selectedOrder._id}</Box>
                </Box>
                <Box>
                  <Box fontWeight="bold">{selectedOrder.createdAt}</Box>

                  <Box> Customer Name : {selectedOrder.customer.username}</Box>
                  <Box>Customer Email : {selectedOrder.customer.email}</Box>
                </Box>
                <hr />
                {selectedOrder.products.map(product => (
                  <Flex
                    templateColumns="1fr 1fr"
                    gap={6}
                    justifyContent="space-between"
                  >
                    <Square size="150px">
                      <img
                        src={product.image.url}
                        alt="Image"
                        style={{ width: '50%', aspectRatio: '1/1' }}
                      />
                    </Square>
                    <Box mt={14}>
                      {product.title} <br />
                      {product.quantity}
                    </Box>
                    <Box mt={14} justifySelf="flex-end">
                      ${product.price} X {product.qty} = ${' '}
                      {product.price * product.qty}
                      <br />
                    </Box>
                  </Flex>
                ))}

                <hr />
                <Grid templateColumns="1fr 1fr" gap={4}>
                  <GridItem>
                    <Box>
                      <strong>Delivery</strong>
                    </Box>
                    <p>Address</p>
                    <p>
                      Street Line 1 : {selectedOrder.address.line1} <br /> City
                      : {selectedOrder.address.city}
                    </p>
                  </GridItem>
                  <GridItem>
                    <Box>
                      <strong>Order Summary</strong>
                    </Box>
                    <Box>
                      <Flex justifyContent={'space-between'}>
                        <Box>Subtotal</Box>
                        <Box>${selectedOrder.amount}</Box>
                      </Flex>

                      <Flex justifyContent={'space-between'}>
                        <Box>
                          Delivery{' '}
                          <i class="fa fa-info-circle" aria-hidden="true"></i>
                        </Box>
                        <Box>$0.00</Box>
                      </Flex>

                      <hr />
                      <Flex justifyContent={'space-between'}>
                        <Box>
                          Total{' '}
                          <i class="fa fa-info-circle" aria-hidden="true"></i>
                        </Box>

                        <Box> $ {selectedOrder.amount}</Box>
                      </Flex>
                    </Box>
                  </GridItem>
                </Grid>
                <hr />
              </Box>
            </Box>
          </Box>
        )}
      </VStack>
    </Box>
  );
};

export default OrderList;
