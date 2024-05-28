import React, { useEffect, useState } from 'react';
import {
  Box,
  VStack,
  FormControl,
  FormLabel,
  Input,
  Select,
  Button,
  Text,
  Textarea,
  Wrap,
  WrapItem,
  Tag,
  Spinner,
} from '@chakra-ui/react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { ProductUpdate } from '../redux/features/product/productThunks';

const EditProduct = () => {
  const { isLoading } = useSelector(state => state.product);
  const dispatch = useDispatch();
  const { id } = useParams();
  console.log(id);
  const { product } = useSelector(state => state.product);

  // Use the product ID to find the single product from the product list
  // Find the single product from the product list based on the ID
  const getSingleProduct = product.find(item => item._id === id);
  const { title, description, price, categories, image } = getSingleProduct;

  console.log(getSingleProduct);

  const [productName, setProductName] = useState(title || '');
  const [productDescription, setProductDescription] = useState(
    description || ''
  );
  const [productPrice, setProductPrice] = useState(price || '');
  const [productCategory, setProductCategory] = useState(categories || []);
  const [productImage, setProductImage] = useState('');
  const [fileInputKey, setFileInputKey] = useState(0); // Add this state variable
  const handleCategoryChange = e => {
    const selectedCategory = e.target.value;
    if (
      selectedCategory !== '' &&
      !productCategory.includes(selectedCategory)
    ) {
      setProductCategory([...productCategory, selectedCategory]);
    }

    console.log(productCategory);
  };
  const handleRemoveCategory = categoryToRemove => {
    setProductCategory(prevCategories =>
      prevCategories.filter(category => category !== categoryToRemove)
    );
    console.log(productCategory);
  };
  const handleSubmit = async e => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('title', productName);
    formData.append('description', productDescription);
    formData.append('price', productPrice);
    formData.append('categories', JSON.stringify(productCategory)); // Convert the array to JSON string

    if (productImage) {
      formData.append('image', productImage);
    }

    // Dispatch the action to create the product

    await dispatch(ProductUpdate({ formData, id }));
    // Clear the file input by generating a new key for it
    setFileInputKey(prevKey => prevKey + 1);
    // Implement your logic for submitting the product to the server here
    // For example, you can use an API call to add the product to your database

    // Reset the form fields after successful submission
    // setProductName('');
    // setProductDescription('');
    // setProductPrice('');
    // setProductCategory([]);
    // setProductImage(null);
  };

  return (
    <Box display="flex" justifyContent="space-between" paddingBottom={10}>
      {/* Left Column - Product Form */}
      <VStack
        spacing={4}
        width="50%"
        style={{
          margin: 'auto',
          marginTop: '10px',
          backgroundColor: '#fff',
          padding: '20px',
          borderRadius: '10px',
        }}
      >
        <FormControl isRequired>
          <FormLabel>Product Name</FormLabel>
          <Input
            value={productName}
            onChange={e => setProductName(e.target.value)}
            placeholder="Enter product name"
          />
        </FormControl>
        <FormControl isRequired>
          <FormLabel>Product Description</FormLabel>
          <Textarea
            value={productDescription}
            onChange={e => setProductDescription(e.target.value)}
            placeholder="Enter product description"
            height="100px"
          />
        </FormControl>
        <FormControl isRequired>
          <FormLabel>Product Price</FormLabel>
          <Input
            value={productPrice}
            onChange={e => setProductPrice(e.target.value)}
            type="number"
            placeholder="Enter product price"
          />
        </FormControl>
        <FormControl isRequired>
          <FormLabel>Product Category</FormLabel>
          <Select
            value={productCategory}
            onChange={handleCategoryChange}
            placeholder="Select product category"
          >
            <option value="men">Men</option>
            <option value="women">Women</option>
          </Select>
        </FormControl>
        {/* Display selected categories */}
        <Box width="60%" p={1}>
          <Wrap align="center" spacing={3}>
            {productCategory.map((category, index) => (
              <WrapItem key={index}>
                <Tag
                  size="md"
                  borderRadius="full"
                  variant="solid"
                  colorScheme="teal"
                  display="flex"
                  alignItems="center"
                  justifyContent="space-between"
                  px={3} // Added padding-left
                >
                  {category}
                  <Button
                    size="sm"
                    colorScheme="teal"
                    variant="ghost"
                    onClick={() => handleRemoveCategory(category)}
                    ml={2} // Added margin-left
                  >
                    X
                  </Button>
                </Tag>
              </WrapItem>
            ))}
          </Wrap>
        </Box>
        <FormControl>
          <FormLabel>Product Image</FormLabel>
          <Input
            type="file"
            key={fileInputKey} // Add the key to the input to reset it
            accept=".png, .jpeg, .jpg"
            onChange={e => setProductImage(e.target.files[0])}
          />
        </FormControl>
        <Button
          disabled={isLoading}
          type="submit"
          bg={'blue.400'}
          color={'white'}
          w="full"
          _hover={{
            bg: 'blue.500',
          }}
          mt={8}
          isLoading={isLoading}
          colorScheme="blue"
          onClick={handleSubmit}
        >
          {isLoading ? <Spinner size="md" /> : 'Submit'}
        </Button>
      </VStack>

      {/* Right Column - Product Image */}
      <Box width="40%" p={4}>
        {/* Display product image here */}
        {productImage ? (
          <img src={URL.createObjectURL(productImage)} alt="Product" />
        ) : (
          <Box
            width="350px"
            height="500px"
            border="1px solid gray"
            position="relative"
          >
            <Box
              position="absolute"
              top="50%"
              left="50%"
              transform="translate(-50%, -50%)"
              textAlign="center"
            >
              <img src={image.url} alt="Product" />
            </Box>
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default EditProduct;
