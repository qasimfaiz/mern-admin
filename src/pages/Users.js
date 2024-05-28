import React, { useEffect } from 'react';
import User from '../components/Users';
import { AllUsers } from '../redux/features/user/userThunks';
import { useDispatch } from 'react-redux';
const Users = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(AllUsers());
  }, [dispatch]);

  return (
    <div>
      <User />
    </div>
  );
};

export default Users;
