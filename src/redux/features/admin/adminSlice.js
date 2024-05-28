import { createSlice } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import { AllAdmins, deleteAdmin } from './adminThunks';

const adminSlice = createSlice({
  name: 'admin',
  initialState: {
    admin: [],
    isLoading: false,
    error: null,
  },
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(AllAdmins.pending, state => {
        state.isLoading = true;
        state.error = null;
        state.admin = [];
      })
      .addCase(AllAdmins.fulfilled, (state, action) => {
        state.isLoading = false;
        state.admin = action.payload;
        state.error = null;
      })
      .addCase(AllAdmins.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload; // or action.error.message depending on the structure of the rejection payload
        state.admin = [];
      })
      .addCase(deleteAdmin.pending, state => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(deleteAdmin.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        state.admin = state.admin.filter(
          admin => admin._id !== action.payload.id
        );
      })
      .addCase(deleteAdmin.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload; // or action.error.message depending on the structure of the rejection payload
      });
  },
});

export default adminSlice.reducer;
