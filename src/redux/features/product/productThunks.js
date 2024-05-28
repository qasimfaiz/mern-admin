// authThunks.js
import { createAsyncThunk } from '@reduxjs/toolkit'; // Replace with your actual API service
import { apiRequest } from '../../../axios';
import { toast } from 'react-toastify';

export const AllProducts = createAsyncThunk(
  'product/AllProducts',

  async (_, thunkAPI) => {
    try {
      const response = await apiRequest.get('/products');
      console.log(response.data.products);

      // Return the data or handle the response as needed
      return response.data.products;
    } catch (error) {
      const { message } = error.response.data;
      // Handle the error or reject the thunk with the error message
      console.log(error);
      toast.error(message);

      return thunkAPI.rejectedWithValue(message);
    }
  }
);

// delete Product

export const deleteProduct = createAsyncThunk(
  'product/deleteProduct',

  async (id, thunkAPI) => {
    try {
      const response = await apiRequest.delete(`/products/${id}`);
      console.log(response.data);

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

// Add Product

export const CreateProduct = createAsyncThunk(
  'product/AddProduct',

  async (formData, thunkAPI) => {
    try {
      const response = await apiRequest.post(`/products`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data', // Important to set this header for file uploads
        },
      });
      console.log(response.data);

      toast.success(response.data.message);
      const res = {
        status: 200,
      };
      return res;
      // Return the data or handle the response as needed
    } catch (error) {
      const { message } = error.response.data;
      // Handle the error or reject the thunk with the error message
      console.log(error);
      toast.error(message);
      return thunkAPI.rejectedWithValue(message);
    }
  }
);

// Edit Product

export const ProductUpdate = createAsyncThunk(
  'product/ProductUpdate',

  async ({ formData, id }, thunkAPI) => {
    try {
      const response = await apiRequest.patch(`/products/${id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data', // Important to set this header for file uploads
        },
      });
      console.log(response.data);

      toast.success(response.data.message);
      return response.data.message;
      // Return the data or handle the response as needed
    } catch (error) {
      const { message } = error.response.data;
      // Handle the error or reject the thunk with the error message
      console.log(error);
      toast.error(message);
      return thunkAPI.rejectedWithValue(message);
    }
  }
);
// Get Single Product

// export const singleProduct = createAsyncThunk(
//   'product/singleProduct',

//   async (id, thunkAPI) => {
//     try {
//       const response = await apiRequest.get(`/products/find/${id}`, id);
//       console.log(response.data);

//       toast.success('Product detail fetched successfully');
//       return response.data;
//       // Return the data or handle the response as needed
//     } catch (error) {
//       const { message } = error.response.data;
//       // Handle the error or reject the thunk with the error message
//       console.log(error);
//       toast.error('Product detail fetched failed');
//       return thunkAPI.rejectedWithValue(message);
//     }
//   }
// );
