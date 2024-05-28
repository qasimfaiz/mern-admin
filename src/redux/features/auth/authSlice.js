import { createSlice } from '@reduxjs/toolkit';
import {
  ResetPassword,
  UpdateProfile,
  adminLoginStatus,
  getAdminDetail,
  loginUser,
  logoutUser,
} from './authThunks';
import { toast } from 'react-toastify';

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: '',
    isLoading: false,
    error: null,
    isLoggedIn: false,
  },
  reducers: {
    // You can include other non-async reducers here
  },
  extraReducers: builder => {
    builder
      //  Login
      .addCase(loginUser.pending, state => {
        state.isLoading = true;
        state.error = null;
        state.user = '';
        state.isLoggedIn = false;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload;
        state.error = null;
        state.isLoggedIn = true;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload; // or action.error.message depending on the structure of the rejection payload
        state.user = '';
        state.isLoggedIn = false;
      })

      // Admin Login Status

      .addCase(adminLoginStatus.pending, state => {
        state.isLoggedIn = false;
      })
      .addCase(adminLoginStatus.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isLoggedIn = action.payload;
      })
      .addCase(adminLoginStatus.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload; // or action.error.message depending on the structure of the rejection payload
        state.isLoggedIn = false;
        state.user = '';
      })
      // Admin Login Detail

      // .addCase(getAdminDetail.pending, state => {
      //   state.isLoading = true;
      // })
      .addCase(getAdminDetail.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload;
        state.error = null;
        state.isLoggedIn = true;
      })
      .addCase(getAdminDetail.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload; // or action.error.message depending on the structure of the rejection payload
        state.isLoggedIn = false;
        state.user = '';
      })

      // Logout

      .addCase(logoutUser.pending, state => {
        state.isLoading = false;
        state.error = null;
        state.isLoggedIn = false;
      })
      .addCase(logoutUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = '';
        state.error = null;
        state.isLoggedIn = false;
      })
      .addCase(logoutUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload; // or action.error.message depending on the structure of the rejection payload
        state.isLoggedIn = false;
        state.user = '';
      })
      .addCase(UpdateProfile.pending, state => {
        state.isLoading = true;
        state.error = null;
        state.isLoggedIn = true;
      })
      .addCase(UpdateProfile.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload.user;
        state.error = null;
        state.isLoggedIn = true;
      })
      .addCase(UpdateProfile.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload; // or action.error.message depending on the structure of the rejection payload
        state.isLoggedIn = true;
      })
      .addCase(ResetPassword.pending, state => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(ResetPassword.fulfilled, (state, action) => {
        state.isLoading = false;

        state.error = null;
      })
      .addCase(ResetPassword.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload; // or action.error.message depending on the structure of the rejection payload
      });
  },
});

export default authSlice.reducer;
