import React from 'react';
import { useSelector } from 'react-redux';
import Login from './pages/Login';
import { Navigate, Outlet } from 'react-router-dom';
import { Box, useColorModeValue } from '@chakra-ui/react';
import { MobileNav, SidebarContent } from './pages/AdminDashboard';

const Protected = () => {
  const { user, isLoading, error, isLoggedIn } = useSelector(
    state => state.auth
  );

  const colorModeValue = useColorModeValue('gray.100', 'gray.900');

  return isLoggedIn ? (
    <Box minH="100vh" bg={colorModeValue}>
      {/* mobilenav */}
      <SidebarContent display={{ base: 'none', md: 'block' }} />
      <MobileNav />

      <Box ml={{ base: 0, md: 60 }} p="4">
        <Outlet />
      </Box>
    </Box>
  ) : (
    <Navigate to="/login" />
  );
};

export default Protected;
