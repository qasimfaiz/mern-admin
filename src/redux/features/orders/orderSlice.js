import { createSlice } from '@reduxjs/toolkit';
import { AllOrders, deleteOrder } from './orderThunks';
import { toast } from 'react-toastify';

const orderSlice = createSlice({
  name: 'order',
  initialState: {
    ordersList: [],
    isLoading: false,
    error: null,
  },
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(AllOrders.pending, state => {
        state.isLoading = true;
        state.error = null;
        state.ordersList = [];
      })
      .addCase(AllOrders.fulfilled, (state, action) => {
        state.isLoading = false;
        state.ordersList = action.payload;
        state.error = null;
      })
      .addCase(AllOrders.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload; // or action.error.message depending on the structure of the rejection payload
        state.ordersList = [];
      })
      .addCase(deleteOrder.pending, state => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(deleteOrder.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        state.ordersList = state.ordersList.filter(
          order => order._id !== action.payload.id
        );
      })
      .addCase(deleteOrder.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload.message; // or action.error.message depending on the structure of the rejection payload
      });
  },
});

export default orderSlice.reducer;
