import React, { useEffect } from 'react';
import OrderList from '../components/OrderList';
import { AllOrders } from '../redux/features/orders/orderThunks';
import { useDispatch } from 'react-redux';
const Orders = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(AllOrders());
  }, [dispatch]);
  return (
    <div>
      <OrderList />
    </div>
  );
};

export default Orders;
