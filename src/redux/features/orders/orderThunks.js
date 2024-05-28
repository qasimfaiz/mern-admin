// authThunks.js
import { createAsyncThunk } from '@reduxjs/toolkit'; // Replace with your actual API service
import { apiRequest } from '../../../axios';
import { toast } from 'react-toastify';

export const AllOrders = createAsyncThunk(
  'order/AllOrders',
  // U can write (_, thunkAPI) == (credentials, { rejectedWithValue }
  // We write (_) when we have no data
  async (_, thunkAPI) => {
    try {
      const response = await apiRequest.get('/orders');
      console.log(response.data);
      // navigate('/dashboard');

      // Return the data or handle the response as needed
      return response.data;
    } catch (error) {
      const { message } = error.response.data;
      // Handle the error or reject the thunk with the error message
      console.log(error);
      toast.error(message);
      // if u write  (_, thunkAPI) then u can use thunkAPI.rejectedWithValue
      return thunkAPI.rejectedWithValue(message);
    }
  }
);

// delete Order

export const deleteOrder = createAsyncThunk(
  'order/deleteOrder',

  async (id, thunkAPI) => {
    try {
      const response = await apiRequest.delete(`/orders/${id}`);
      console.log(response);
      // Return the data or handle the response as needed
      toast.success(response.data.message);
      return { id, message: response.data.message };
    } catch (error) {
      const { message } = error.response.data;
      // Handle the error or reject the thunk with the error message
      console.log(error);
      toast.error(message);
      return thunkAPI.rejectedWithValue(message);
    }
  }
);

export const updateOrder = async ({ id, status }, dispatch) => {
  try {
    const response = await apiRequest.patch(`/orders/${id}`, { status }); // Pass an object with 'status' property
    console.log(response);
    // Return the data or handle the response as needed
    toast.success(response.data.message);
    dispatch(AllOrders());
  } catch (error) {
    const { message } = error.response.data;
    // Handle the error or reject the thunk with the error message
    console.log(error);
    toast.error(message);
  }
};
