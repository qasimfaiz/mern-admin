// authThunks.js
import { createAsyncThunk } from '@reduxjs/toolkit'; // Replace with your actual API service
import { apiRequest } from '../../../axios';
import { toast } from 'react-toastify';

export const AllAdmins = createAsyncThunk(
  'admin/AllAdmins',

  async (_, thunkAPI) => {
    try {
      const response = await apiRequest.get('/users/getAllAdmins');
      console.log(response.data);
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
// delete User

export const deleteAdmin = createAsyncThunk(
  'admin/deleteAdmin',

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

// update Admin

export const updateAdmin = createAsyncThunk(
  'admin/updateAdmin',
  async (user, thunkAPI) => {
    const dispatch = thunkAPI.dispatch;

    try {
      const response = await apiRequest.patch(`/users/admin/${user._id}`, user);

      console.log(response.data.user);
      toast.success(response.data.message);
      dispatch(AllAdmins());
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

// Add new Admin
export const AddAdmin = createAsyncThunk(
  'user/AddAdmin  ',
  async (admin, thunkAPI) => {
    try {
      const dispatch = thunkAPI.dispatch;
      const response = await apiRequest.post('/users/add-admin', admin);
      console.log(response.data);
      toast.success(response.data.message);
      dispatch(AllAdmins());
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
