import React, { useState } from 'react';
import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  Stack,
  Button,
  Heading,
  Text,
  useColorModeValue,
  Spinner,
} from '@chakra-ui/react';

import { useDispatch, useSelector } from 'react-redux';
import { ResetPassword } from '../redux/features/auth/authThunks';

export default function ForgetPassword() {
  const { isLoading, error } = useSelector(state => state.auth);

  const dispatch = useDispatch();

  const [email, setEmail] = useState('');

  const handleSubmit = async event => {
    event.preventDefault();

    try {
      const response = await dispatch(ResetPassword({ email }));
      if (response.payload && response.payload.status === 200) {
        setEmail('');
      }
    } catch (err) {
      console.log(err);
    }
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
          <Heading fontSize={'4xl'}>Forget Password ?</Heading>
          <Text fontSize={'lg'} color={'gray.600'}>
            Reterive Your Password✌️
          </Text>
        </Stack>
        <Box
          rounded={'lg'}
          bg={useColorModeValue('white', 'gray.700')}
          boxShadow={'lg'}
          p={8}
        >
          <Stack spacing={4} width="400px">
            {' '}
            {/* Set the desired width */}
            <form onSubmit={handleSubmit}>
              <FormControl>
                <FormLabel>Email address</FormLabel>
                <Input
                  // type="email"
                  name="email"
                  placeholder="Enter your email address"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  style={{ marginBottom: 12 }}
                />
              </FormControl>

              <Stack spacing={10}>
                <Button
                  disabled={isLoading}
                  type="submit"
                  bg="blue.400"
                  color="white"
                  _hover={{
                    bg: 'blue.500',
                  }}
                  isLoading={isLoading} // Add the isLoading prop to disable the button when isLoading is true
                  width="100%" // Set the desired width for the button
                >
                  {isLoading ? <Spinner size="md" /> : 'Submit'}
                </Button>
              </Stack>
            </form>
          </Stack>
        </Box>
      </Stack>
    </Flex>
  );
}
