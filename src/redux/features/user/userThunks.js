// authThunks.js
import { createAsyncThunk } from '@reduxjs/toolkit'; // Replace with your actual API service
import { apiRequest } from '../../../axios';
import { toast } from 'react-toastify';

export const AllUsers = createAsyncThunk(
  'user/AllUsers',
  async (_, thunkAPI) => {
    try {
      const response = await apiRequest.get('/users/getAllUsers');
      console.log(response.data);

      // Return the data or handle the response as needed
      return response.data;
    } catch (error) {
      const { message } = error.response.data;
      // Handle the error or reject the thunk with the error message
      console.log(error);
      toast.error(message);

      return thunkAPI.rejectedWithValue(message);
    }
  }
);
// delete User

export const deleteUser = createAsyncThunk(
  'user/deleteUser',

  async (id, thunkAPI) => {
    try {
      const response = await apiRequest.delete(`/users/${id}`);
      console.log(response);
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

// update User

export const updateUser = createAsyncThunk(
  'user/updateUser',
  async (user, thunkAPI) => {
    const dispatch = thunkAPI.dispatch;
    try {
      const response = await apiRequest.patch(`/users/admin/${user._id}`, user);

      console.log(response.data.user);
      toast.success(response.data.message);
      dispatch(AllUsers());
      const res = {
        status: 200,
      };
      return res;
    } catch (error) {
      const { message } = error.response.data;
      // Handle the error or reject the thunk with the error message
      console.log(error);
      toast.error(message);
      return thunkAPI.rejectedWithValue(message);
    }
  }
);

// Add new User
export const AddUser = createAsyncThunk(
  'user/AddUser  ',
  async (user, thunkAPI) => {
    try {
      const dispatch = thunkAPI.dispatch;
      const response = await apiRequest.post('/users/add-user', user);
      console.log(response.data);
      toast.success(response.data.message);
      dispatch(AllUsers());
      const res = {
        status: 200,
      };
      return res;
    } catch (error) {
      const { message } = error.response.data;
      // Handle the error or reject the thunk with the error message
      console.log(error);
      toast.error(message);
      return thunkAPI.rejectedWithValue(message);
    }
  }
);
