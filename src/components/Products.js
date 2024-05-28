import React, { useEffect, useState } from 'react';
import { FaEllipsisV } from 'react-icons/fa';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import {
  Image,
  Box,
  VStack,
  Button,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverBody,
  PopoverArrow,
  PopoverCloseButton,
  Flex,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  CircularProgress,
  useDisclosure,
  Text,
} from '@chakra-ui/react';
import { useSelector } from 'react-redux';

import DeleteConfirmationDialog from './Modals/DeleteConfirmationDialog';
import { InputText } from 'primereact/inputtext';
import { Link } from 'react-router-dom';

const ProductPage = () => {
  const { product, isLoading } = useSelector(state => state.product);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = React.useRef();
  const [currentId, setCurrentId] = useState(null);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [globalFilter, setGlobalFilter] = useState('');

  const handleViewProduct = id => {
    // Logic for viewing the details of an order with the provided orderSerial
    const SingleProduct = product.find(product => product._id === id);
    setSelectedProduct(SingleProduct);
    setIsViewModalOpen(true);
  };

  return (
    <Box p={1}>
      {/* Add Button */}
      <Flex align="center" justify="space-between" marginBottom={5}>
        {/* Add Button */}
        <Link to="/products/add-product">
          <Button colorScheme="green">Add Product</Button>
        </Link>
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
            value={product}
            selectionMode="single"
            selection={selectedProduct}
            onSelectionChange={e => setSelectedProduct(e.value)}
            paginator
            rows={10}
            rowsPerPageOptions={[5, 10, 25]}
            globalFilter={globalFilter}
            emptyMessage="No products found."
          >
            <Column field="_id" header="ID" sortable />
            <Column field="title" header="Product" sortable />
            <Column
              field="price"
              header="Price"
              body={rowData => `$${rowData.price}`}
              sortable
            />
            <Column
              header="Image"
              body={rowData => (
                <Image
                  src={rowData.image.url}
                  alt={rowData.title}
                  boxSize="100px"
                />
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
                        onClick={() => handleViewProduct(rowData._id)}
                        mb={2}
                        maxWidth="100px"
                      >
                        View
                      </Button>

                      <Button
                        size="sm"
                        colorScheme="blue"
                        mb={2}
                        maxWidth="100px"
                      >
                        <Link to={`/products/edit-product/${rowData._id}`}>
                          Edit
                        </Link>
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
                        itemLabel="product"
                      />
                    </PopoverBody>
                  </PopoverContent>
                </Popover>
              )}
            />
          </DataTable>
        )}
      </VStack>

      {isViewModalOpen && (
        <Modal
          isOpen={true}
          onClose={() => setIsViewModalOpen(false)}
          size="lg"
        >
          <ModalOverlay />
          <ModalContent borderRadius="lg" boxShadow="md" bg="white">
            <ModalHeader fontWeight="bold" borderBottom="1px solid gray">
              Product Details
            </ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <Box>
                <Box fontWeight="bold">Product ID: {selectedProduct._id}</Box>
              </Box>
              <hr />
              <Box
                display="flex"
                alignItems="center"
                justifyContent="center"
                my={4}
              >
                <Image
                  src={selectedProduct.image.url}
                  maxH="300px"
                  objectFit="contain"
                />
              </Box>
              <Box textAlign="center">
                <Text fontWeight="bold" fontSize="3xl" mb={2}>
                  {selectedProduct.title}
                </Text>
                <Text fontSize="2xl" color="teal" mb={2}>
                  ${selectedProduct.price}
                </Text>
                <Text fontSize="xl" color="gray.500" mb={2}>
                  Category: {selectedProduct.categories.join(', ')}
                </Text>
                <Text fontSize="lg" mb={4}>
                  {selectedProduct.description}
                </Text>
              </Box>
            </ModalBody>
            <Box textAlign="center" p={4} borderTop="1px solid gray">
              <Button
                colorScheme="teal"
                variant="solid"
                _hover={{ bg: 'teal.600' }}
                onClick={() => setIsViewModalOpen(false)}
              >
                Close
              </Button>
            </Box>
          </ModalContent>
        </Modal>
      )}
    </Box>
  );
};

export default ProductPage;
