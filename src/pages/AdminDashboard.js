import React from 'react';
import { Link } from 'react-router-dom';
import {
  IconButton,
  Box,
  CloseButton,
  Flex,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
  Text,
  HStack,
  VStack,
  Icon,
  useColorModeValue,
  Image,
} from '@chakra-ui/react';
import {
  FiShoppingBag,
  FiPackage,
  FiUsers,
  FiUserCheck,
  FiMenu,
  FiBell,
  FiChevronDown,
} from 'react-icons/fi';
import ShopLogo from '../assets/ShopLogo.png';
import { useDispatch, useSelector } from 'react-redux';
import { logoutUser } from '../redux/features/auth/authThunks';
import Avatar from 'react-avatar';

const LinkItems = [
  { name: 'Orders', icon: FiShoppingBag, path: '/orders' },
  { name: 'Products', icon: FiPackage, path: '/products' },
  { name: 'Users', icon: FiUsers, path: '/users' },
  { name: 'Admins', icon: FiUserCheck, path: '/admins' },
];

export const SidebarContent = () => {
  return (
    <Box
      transition="3s ease"
      bg={useColorModeValue('white', 'gray.900')}
      borderRight="1px"
      borderRightColor={useColorModeValue('gray.200', 'gray.700')}
      w={{ base: 'full', md: 60 }}
      pos="fixed"
      h="full"
    >
      <Flex h="20" alignItems="center" mx="8" justifyContent="space-between">
        <Text fontSize="2xl" fontFamily="monospace" fontWeight="bold">
          <Link to={'/dashboard'}>
            <Image src={ShopLogo} width={80} />
          </Link>
        </Text>
      </Flex>
      {LinkItems.map(link => (
        <NavItem key={link.name} icon={link.icon} path={link.path}>
          {link.name}
        </NavItem>
      ))}
    </Box>
  );
};

const NavItem = ({ icon: IconComponent, children, path }) => {
  const dispatch = useDispatch();
  return (
    <Link to={path} style={{ textDecoration: 'none' }}>
      <Flex
        align="center"
        p="4"
        mx="4"
        borderRadius="lg"
        role="group"
        cursor="pointer"
        _hover={{
          bg: 'cyan.400',
          color: 'white',
        }}
      >
        {IconComponent && (
          <Icon
            mr="4"
            fontSize="16"
            _groupHover={{
              color: 'white',
            }}
            as={IconComponent}
          />
        )}
        {children}
      </Flex>
    </Link>
  );
};

export const MobileNav = () => {
  const dispatch = useDispatch();
  const { user } = useSelector(state => state.auth);
  return (
    <Flex
      ml={{ base: 0, md: 60 }}
      px={{ base: 4, md: 4 }}
      height="20"
      alignItems="center"
      bg={useColorModeValue('white', 'gray.900')}
      borderBottomWidth="1px"
      borderBottomColor={useColorModeValue('gray.200', 'gray.700')}
      justifyContent={{ base: 'space-between', md: 'flex-end' }}
    >
      <IconButton
        display={{ base: 'flex', md: 'none' }}
        variant="outline"
        aria-label="open menu"
        icon={<FiMenu />}
      />

      {/* <Text
        display={{ base: 'flex', md: 'none' }}
        fontSize="2xl"
        fontFamily="monospace"
        fontWeight="bold"
      >
        Logo{' '}
      </Text> */}
      <HStack spacing={{ base: '0', md: '6' }}>
        {/* <IconButton
          size="lg"
          variant="ghost"
          aria-label="open menu"
          icon={<FiBell />}
        /> */}
        <Flex alignItems={'center'}>
          <Menu>
            <MenuButton
              py={2}
              transition="all 0.3s"
              _focus={{ boxShadow: 'none' }}
            >
              <HStack>
                <Avatar
                  size={40}
                  round={true}
                  src={user?.image?.profilePic}
                  name={user?.username}
                />
                <VStack
                  display={{ base: 'none', md: 'flex' }}
                  alignItems="flex-start"
                  spacing="1px"
                  ml="2"
                >
                  <Text fontSize="sm">{user.username}</Text>
                  <Text fontSize="xs" color="gray.600">
                    {user.role}
                  </Text>
                </VStack>
                <Box display={{ base: 'none', md: 'flex' }}>
                  <FiChevronDown />
                </Box>
              </HStack>
            </MenuButton>
            <MenuList
              bg={useColorModeValue('white', 'gray.900')}
              borderColor={useColorModeValue('gray.200', 'gray.700')}
            >
              <MenuItem as={Link} to="/profile">
                Profile
              </MenuItem>
              <MenuItem as={Link} to="/change-password">
                Change Password
              </MenuItem>
              <MenuDivider />
              <MenuItem onClick={() => dispatch(logoutUser(dispatch))}>
                Sign out
              </MenuItem>
            </MenuList>
          </Menu>
        </Flex>
      </HStack>
    </Flex>
  );
};
