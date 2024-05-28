import {
  Avatar,
  AvatarBadge,
  Box,
  Button,
  Center,
  FormControl,
  FormLabel,
  Heading,
  IconButton,
  Input,
  InputGroup,
  InputRightElement,
  Spinner,
  Stack,
} from '@chakra-ui/react';
import React, { useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { PasswordUpdate } from '../redux/features/auth/authThunks';
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';

function ChangePassword() {
  const { user } = useSelector(state => state.auth);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [userInput, setUserInput] = useState({
    password: '',
    newPassword: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(prevShowPassword => !prevShowPassword);
  };

  const toggleNewPasswordVisibility = () => {
    setShowNewPassword(prevShowNewPassword => !prevShowNewPassword);
  };

  const handleInputChange = event => {
    const { name, value } = event.target;
    setUserInput(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handlePasswordUpdate = id => {
    console.log(userInput);
    PasswordUpdate(userInput, id);
    setLoading(false);
    resetInput();
  };
  const resetInput = () => {
    setUserInput({
      newPassword: '',
      password: '',
    });
  };

  return (
    <div>
      <Box
        flex={2}
        pl={6}
        width="40%"
        style={{
          margin: 'auto',
          marginTop: '50px',
          backgroundColor: '#fff',
          padding: '20px',
          borderRadius: '10px',
        }}
      >
        <Heading fontSize={'2xl'} fontFamily={'body'} mb={4}>
          Password Update
        </Heading>

        <FormControl id="password" isRequired style={{ marginTop: '20px' }}>
          <FormLabel>Password</FormLabel>
          <InputGroup>
            <Input
              placeholder="password"
              _placeholder={{ color: 'gray.500' }}
              type={showPassword ? 'text' : 'password'}
              name="password"
              value={userInput.password}
              onChange={handleInputChange}
            />
            <InputRightElement width="4.5rem">
              <IconButton
                h="1.75rem"
                size="sm"
                onClick={togglePasswordVisibility}
                aria-label={showPassword ? 'Hide password' : 'Show password'}
                icon={showPassword ? <ViewOffIcon /> : <ViewIcon />}
              />
            </InputRightElement>
          </InputGroup>
        </FormControl>
        <FormControl id="newPassword" isRequired style={{ marginTop: '20px' }}>
          <FormLabel>New Password </FormLabel>
          <InputGroup>
            <Input
              placeholder="New Password"
              _placeholder={{ color: 'gray.500' }}
              type={showNewPassword ? 'text' : 'password'}
              name="newPassword"
              value={userInput.newPassword}
              onChange={handleInputChange}
            />
            <InputRightElement width="4.5rem">
              <IconButton
                h="1.75rem"
                size="sm"
                onClick={toggleNewPasswordVisibility}
                aria-label={showNewPassword ? 'Hide password' : 'Show password'}
                icon={showNewPassword ? <ViewOffIcon /> : <ViewIcon />}
              />
            </InputRightElement>
          </InputGroup>
        </FormControl>
        <Button
          disabled={loading}
          type="submit"
          bg={'blue.400'}
          color={'white'}
          w="full"
          _hover={{
            bg: 'blue.500',
          }}
          mt={8}
          isLoading={loading} // Add the isLoading prop to disable the button when isLoading is true
          onClick={() => {
            setLoading(true);
            handlePasswordUpdate(user._id);
          }}
        >
          {loading ? <Spinner size="md" /> : 'Save Changes'}
        </Button>
      </Box>
    </div>
  );
}

export default ChangePassword;
