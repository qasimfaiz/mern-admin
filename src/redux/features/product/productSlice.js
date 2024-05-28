import { createSlice } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import {
  AllProducts,
  CreateProduct,
  ProductUpdate,
  deleteProduct,
} from './productThunks';

const productSlice = createSlice({
  name: 'product',
  initialState: {
    product: [],
    isLoading: false,
    error: null,
  },
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(AllProducts.pending, state => {
        state.isLoading = true;
        state.error = null;
        state.product = [];
      })
      .addCase(AllProducts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.product = action.payload;
        state.error = null;
      })
      .addCase(AllProducts.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload; // or action.error.message depending on the structure of the rejection payload
        state.product = [];
      })
      .addCase(deleteProduct.pending, state => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(deleteProduct.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        state.product = state.product.filter(
          product => product._id !== action.payload.id
        );
      })
      .addCase(deleteProduct.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload.message; // or action.error.message depending on the structure of the rejection payload
      })
      .addCase(CreateProduct.pending, state => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(CreateProduct.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
      })
      .addCase(CreateProduct.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload; // or action.error.message depending on the structure of the rejection payload
      })
      .addCase(ProductUpdate.pending, state => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(ProductUpdate.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
      })
      .addCase(ProductUpdate.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload; // or action.error.message depending on the structure of the rejection payload
      });
  },
});

export default productSlice.reducer;
