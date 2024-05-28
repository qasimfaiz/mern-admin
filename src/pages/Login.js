import React, { useState } from 'react';
import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  Checkbox,
  Stack,
  Button,
  Heading,
  Text,
  useColorModeValue,
  Spinner,
  InputGroup,
  InputRightElement,
  IconButton,
} from '@chakra-ui/react';

import { useDispatch, useSelector } from 'react-redux';
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';
import { loginUser } from '../redux/features/auth/authThunks';
import { Link } from 'react-router-dom';

export default function Login() {
  const { isLoading } = useSelector(state => state.auth);

  const dispatch = useDispatch();
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(prevShowPassword => !prevShowPassword);
  };
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    // rememberMe: false,
  });

  const handleInputChange = event => {
    // const { name, value, type, checked } = event.target;
    // const inputValue = type === 'checkbox' ? checked : value;
    // setFormData(prevFormData => ({ ...prevFormData, [name]: inputValue }));
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const handleSubmit = event => {
    event.preventDefault();
    // Perform any necessary actions with the form data (e.g., send it to a server)
    dispatch(loginUser(formData, dispatch));
  };

  return (
    <Flex
      minH={'100vh'}
      align={'center'}
      justify={'center'}
      bg={useColorModeValue('gray.100', 'gray.900')} // Change the background color here
    >
      <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
        <Stack align={'center'}>
          <Heading fontSize={'4xl'}>Sign in to your account</Heading>
          <Text fontSize={'lg'} color={'gray.600'}>
            Welcome back✌️
          </Text>
        </Stack>
        <Box
          rounded={'lg'}
          bg={useColorModeValue('white', 'gray.700')}
          boxShadow={'lg'}
          p={8}
        >
          <Stack spacing={4}>
            <form onSubmit={handleSubmit}>
              <FormControl>
                <FormLabel>Email address</FormLabel>
                <Input
                  // type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                />
              </FormControl>
              <FormControl>
                <FormLabel>Password</FormLabel>
                <InputGroup>
                  <Input
                    type={showPassword ? 'text' : 'password'}
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
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
              <Stack spacing={10}>
                <Stack
                  direction={{ base: 'column', sm: 'row' }}
                  align={'start'}
                  justify={'space-between'}
                >
                  <Checkbox
                    name="rememberMe"
                    checked={formData.rememberMe}
                    onChange={handleInputChange}
                  >
                    Remember me
                  </Checkbox>
                  <Link to={'/forget-password'} style={{ color: 'blue' }}>
                    Forgot password?
                  </Link>
                </Stack>
                <Button
                  disabled={isLoading}
                  type="submit"
                  bg="blue.400"
                  color="white"
                  _hover={{
                    bg: 'blue.500',
                  }}
                  isLoading={isLoading} // Add the isLoading prop to disable the button when isLoading is true
                >
                  {isLoading ? <Spinner size="md" /> : 'Sign in'}
                </Button>
              </Stack>
            </form>
          </Stack>
        </Box>
      </Stack>
    </Flex>
  );
}
