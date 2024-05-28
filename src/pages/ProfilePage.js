import React, { useState } from 'react';
import {
  Flex,
  Heading,
  Box,
  Stack,
  Text,
  Divider,
  Badge,
  Button,
  FormControl,
  FormLabel,
  Input,
  AvatarBadge,
  Center,
  IconButton,
  Spinner,
  InputRightElement,
  InputGroup,
} from '@chakra-ui/react';
import { SmallCloseIcon, ViewIcon, ViewOffIcon } from '@chakra-ui/icons';
import { useDispatch, useSelector } from 'react-redux';
import {
  RemoveProfileNotify,
  RemoveProfilePic,
  UpdateProfile,
  UpdateProfilePic,
} from '../redux/features/auth/authThunks';
import { apiRequest } from '../axios';
import Avatar from 'react-avatar';

function ProfilePage() {
  const dispatch = useDispatch();
  const { user, isLoading } = useSelector(state => state.auth);
  const [selectedImage, setSelectedImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState(null);
  const [userInput, setUserInput] = useState({
    username: '',
    email: '',
    password: '',
  });
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(prevShowPassword => !prevShowPassword);
  };
  const handleIconChange = async event => {
    const file = event.target.files[0];
    setSelectedImage(file);
    // Create a temporary URL for the selected image
    if (file) {
      const ImageUrl = URL.createObjectURL(file);
      setImageUrl(ImageUrl);
    }
  };

  const handleInputChange = event => {
    const { name, value } = event.target;
    setUserInput(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };
  const handleUserUpdate = async () => {
    try {
      const formData = new FormData();
      if (selectedImage) {
        formData.append('profilePic', selectedImage);
      }
      formData.append('username', userInput.username);
      formData.append('email', userInput.email);
      formData.append('password', userInput.password);
      const response = await dispatch(UpdateProfile(formData));

      if (response) {
        setLoading(false);
        resetInput();
        setSelectedImage(null);
        setImageUrl(null);
      }
    } catch (error) {
      // Handle the error
      console.log(error);
    }
  };

  const resetInput = () => {
    setUserInput({
      username: '',
      email: '',
      password: '',
    });
  };

  return (
    <Flex minH={'100vh'} align={'center'} justify={'center'} bg={'gray.50'}>
      <Box maxW={'5xl'} w={'full'} p={8} borderWidth={1} borderRadius={'lg'}>
        <Flex>
          <Box flex={1} pr={6}>
            <div style={{ position: 'relative' }}>
              <Avatar
                size={130}
                round={true}
                src={user?.image?.profilePic}
                alt={user.username}
                name={user.username}
                mb={4}
              />

              {user?.image?.profilePic && (
                <IconButton
                  style={{
                    position: 'absolute',
                    bottom: '20px',
                    top: '-10px',
                    left: '95px',
                  }}
                  size="sm"
                  rounded="full"
                  colorScheme="red"
                  aria-label="Remove Image"
                  icon={<SmallCloseIcon />}
                  onClick={() => {
                    const publicId = user.image.publicId;
                    const id = user._id;
                    RemoveProfileNotify({ publicId, id }, dispatch);
                  }}
                />
              )}
            </div>

            <Heading fontSize={'3xl'} fontFamily={'body'} mb={2} mt={6}>
              {user.username}
            </Heading>
            <Text color={'gray.500'} fontSize={'lg'} mb={4}>
              {user.email}
            </Text>

            <Divider my={6} />

            <Stack spacing={4} align={'left'}>
              <Text fontWeight={'bold'} fontSize={'lg'}>
                Username:
              </Text>
              <Text fontSize={'md'}>{user.username}</Text>
              <Text fontWeight={'bold'} fontSize={'lg'}>
                Email:
              </Text>
              <Text fontSize={'md'}>{user.email}</Text>
              {/* <Text fontWeight={'bold'} fontSize={'lg'}>
                Bio:
              </Text>
              <Text fontSize={'md'}>{user.bio}</Text> */}
            </Stack>

            <Divider my={6} />

            <Stack direction={'row'} spacing={4}>
              <Badge colorScheme="green" px={2} py={1}>
                {user.role}
              </Badge>
              {/* <Badge colorScheme="blue" px={2} py={1}>
                Premium Member
              </Badge> */}
            </Stack>
          </Box>

          <Box
            flex={1}
            pl={6}
            style={{
              backgroundColor: '#fff',
              padding: '20px',
              borderRadius: '10px',
            }}
          >
            <Heading fontSize={'2xl'} fontFamily={'body'} mb={4}>
              Edit Profile
            </Heading>
            <FormControl id="userIcon">
              {/* <FormLabel>User Icon</FormLabel> */}
              <Stack direction={['column', 'row']} spacing={24}>
                <Center>
                  <div
                    style={{ position: 'relative', display: 'inline-block' }}
                  >
                    <Avatar
                      size={130}
                      round={true}
                      src={imageUrl ? imageUrl : user.image.profilePic}
                      alt={user.name}
                      name={user.username}
                    />

                    {selectedImage && (
                      <IconButton
                        size="sm"
                        rounded="full"
                        colorScheme="red"
                        aria-label="Remove Image"
                        icon={<SmallCloseIcon />}
                        onClick={() => {
                          setSelectedImage(null);
                          setImageUrl(null);
                        }}
                        style={{
                          position: 'absolute',
                          top: '-10px',
                          right: '5px',
                        }}
                      />
                    )}
                  </div>
                </Center>

                <Center w="full">
                  <Button as="label" htmlFor="icon" width="full">
                    Change Icon
                    <Input
                      id="icon"
                      type="file"
                      accept=".png, .jpeg, .jpg"
                      name="profilePic"
                      style={{ display: 'none' }}
                      onChange={handleIconChange}
                    />
                  </Button>
                </Center>
              </Stack>
            </FormControl>

            <FormControl id="userName" style={{ marginTop: '20px' }}>
              <FormLabel>
                User name{' '}
                <Text as="span" color="gray.500" fontSize="sm">
                  (Optional)
                </Text>
              </FormLabel>
              <Input
                placeholder={user.username}
                _placeholder={{ color: 'gray.500' }}
                type="text"
                name="username"
                value={userInput.username}
                onChange={handleInputChange}
              />
            </FormControl>
            <FormControl id="email" style={{ marginTop: '20px' }}>
              <FormLabel>
                Email address{' '}
                <Text as="span" color="gray.500" fontSize="sm">
                  (Optional)
                </Text>
              </FormLabel>
              <Input
                placeholder={user.email}
                _placeholder={{ color: 'gray.500' }}
                type="email"
                name="email"
                value={userInput.email}
                onChange={handleInputChange}
              />
            </FormControl>
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
                    aria-label={
                      showPassword ? 'Hide password' : 'Show password'
                    }
                    icon={showPassword ? <ViewOffIcon /> : <ViewIcon />}
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
                handleUserUpdate();
              }}
            >
              {loading ? <Spinner size="md" /> : 'Save Changes'}
            </Button>
          </Box>
        </Flex>
      </Box>
    </Flex>
  );
}

export default ProfilePage;
