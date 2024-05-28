import React, { useState } from 'react';
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
  Tag,
  WrapItem,
  Wrap,
  Spinner,
} from '@chakra-ui/react';
import { useDispatch, useSelector } from 'react-redux';
import { CreateProduct } from '../redux/features/product/productThunks';

const AddProduct = () => {
  const { isLoading } = useSelector(state => state.product);
  const dispatch = useDispatch();

  const [productName, setProductName] = useState('');
  const [productDescription, setProductDescription] = useState('');
  const [productPrice, setProductPrice] = useState('');
  const [productCategory, setProductCategory] = useState([]);
  const [productImage, setProductImage] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [fileInputKey, setFileInputKey] = useState(0); // Add this state variable

  const handleImageChange = e => {
    const file = e.target.files[0];
    setProductImage(file);
    // Create a temporary URL for the selected image
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setSelectedImage(imageUrl);
    }
  };

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

    // Create a new FormData object
    const formData = new FormData();

    // Append form fields to the formData object
    formData.append('title', productName);
    formData.append('description', productDescription);
    formData.append('price', productPrice);
    formData.append('categories', JSON.stringify(productCategory)); // Convert the array to JSON string

    // Append the image file to the formData object
    formData.append('image', productImage);

    const resetFields = () => {
      setProductName('');
      setProductDescription('');
      setProductPrice('');
      setProductCategory([]);
      setProductImage(null);
      setSelectedImage(null);
      // Clear the file input by generating a new key for it
      setFileInputKey(prevKey => prevKey + 1);
    };
    try {
      const response = await dispatch(CreateProduct(formData));
      console.log(response);
      if (response.payload && response.payload.status === 200) {
        // Assuming the response contains the data
        // Reset the form fields after successful submission
        resetFields();
      }
    } catch (error) {
      console.error(error);
    }
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
        <FormControl>
          <FormLabel>Product Name</FormLabel>
          <Input
            value={productName}
            onChange={e => setProductName(e.target.value)}
            placeholder="Enter product name"
          />
        </FormControl>
        <FormControl>
          <FormLabel>Product Description</FormLabel>
          <Textarea
            value={productDescription}
            onChange={e => setProductDescription(e.target.value)}
            placeholder="Enter product description"
            height="100px"
          />
        </FormControl>
        <FormControl>
          <FormLabel>Product Price</FormLabel>
          <Input
            value={productPrice}
            onChange={e => setProductPrice(e.target.value)}
            type="number"
            placeholder="Enter product price"
            min={1}
          />
        </FormControl>
        <FormControl>
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
            name="image"
            accept=".png, .jpeg, .jpg"
            onChange={e => handleImageChange(e)}
            key={fileInputKey} // Add the key to the input to reset it
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
        {selectedImage ? (
          <img src={selectedImage} alt="Product" />
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
              <Text fontSize="sm">Image preview will appear here</Text>
            </Box>
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default AddProduct;
