import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import Admins from '../components/Admins';
import { AllAdmins } from '../redux/features/admin/adminThunks';
const Admin = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(AllAdmins());
  }, [dispatch]);
  return (
    <div>
      <Admins />
    </div>
  );
};

export default Admin;
