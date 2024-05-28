import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';

const Public = () => {
  const { isLoggedIn } = useSelector(state => state.auth);
  return isLoggedIn ? <Navigate to="/dashboard" /> : <Outlet />;
};

export default Public;
