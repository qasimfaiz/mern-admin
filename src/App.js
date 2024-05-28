import React, { useEffect } from 'react';
import './App.css';

import Routing from './Routing/Routing';
import {
  adminLoginStatus,
  getAdminDetail,
} from './redux/features/auth/authThunks';
import { useDispatch } from 'react-redux';
import { AllOrders } from './redux/features/orders/orderThunks';

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(adminLoginStatus());

    dispatch(getAdminDetail());
  }, [dispatch]);

  return (
    <div>
      <Routing />
    </div>
  );
}

export default App;
