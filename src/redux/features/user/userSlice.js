import { createSlice } from '@reduxjs/toolkit';
import { AllUsers, deleteUser, updateUser } from './userThunks';

const userSlice = createSlice({
  name: 'user',
  initialState: {
    user: [],
    isLoading: false,
    error: null,
  },
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(AllUsers.pending, state => {
        state.isLoading = true;
        state.error = null;
        state.user = [];
      })
      .addCase(AllUsers.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload;
        state.error = null;
      })
      .addCase(AllUsers.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload; // or action.error.message depending on the structure of the rejection payload
        state.user = [];
      })
      .addCase(deleteUser.pending, state => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(deleteUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        state.user = state.user.filter(user => user._id !== action.payload.id);
      })
      .addCase(deleteUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload.message; // or action.error.message depending on the structure of the rejection payload
      });
    // .addCase(updateUser.pending, state => {
    //   state.isLoading = true;
    //   state.error = null;
    // })
    // .addCase(updateUser.fulfilled, (state, action) => {
    //   state.isLoading = false;
    //   state.error = null;
    //   state.user = state.user.map(user => {
    //     if (user._id === action.payload._id) {
    //       return action.payload;
    //     }
    //     return user;
    //   });
    // })
    // .addCase(updateUser.rejected, (state, action) => {
    //   state.isLoading = false;
    //   state.error = action.payload; // or action.error.message depending on the structure of the rejection payload
    // });
  },
});

export default userSlice.reducer;
