// authThunks.js
import { createAsyncThunk } from '@reduxjs/toolkit'; // Replace with your actual API service
import { apiRequest } from '../../../axios';
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';

export const loginUser = createAsyncThunk(
  'auth/loginUser',
  // U can write (_, thunkAPI) == (credentials, { rejectedWithValue }
  // We write (_) when we have no data
  async (formData, thunkAPI) => {
    try {
      const response = await apiRequest.post('/auth/admin-login', formData);
      console.log(response.data);
      toast.success(response.data.message);
      // Return the data or handle the response as needed
      return response.data;
    } catch (error) {
      const { message } = error.response.data;
      // Handle the error or reject the thunk with the error message
      console.log(message);
      toast.error(message);
      // if u write  (_, thunkAPI) then u can use thunkAPI.rejectedWithValue
      return thunkAPI.rejectedWithValue(message);
    }
  }
);

export const logoutUser = createAsyncThunk(
  'auth/logoutUser',
  async (_, thunkAPI) => {
    try {
      const response = await apiRequest.get('/auth/logout');
      console.log(response.data.message);

      toast.success(response.data.message);
      // Return the data or handle the response as needed
      return response.data.message;
    } catch (error) {
      // Handle the error or reject the thunk with the error message
      console.log(error.response.data.message);
      return thunkAPI.rejectedWithValue(error.response.data.message);
    }
  }
);

export const adminLoginStatus = createAsyncThunk(
  'auth/adminLoginStatus',
  // U can write (_, thunkAPI) == (credentials, { rejectedWithValue }
  // We write (_) when we have no data
  async (_, thunkAPI) => {
    try {
      const response = await apiRequest.get('/auth/adminLoginStatus');
      console.log(response.data);

      // Return the data or handle the response as needed
      return response.data;
    } catch (error) {
      // Handle the error or reject the thunk with the error message

      // if u write  (_, thunkAPI) then u can use thunkAPI.rejectedWithValue
      return thunkAPI.rejectedWithValue(error.response.data.message);
    }
  }
);
export const getAdminDetail = createAsyncThunk(
  'auth/getAdminDetail',
  // U can write (_, thunkAPI) == (credentials, { rejectedWithValue }
  // We write (_) when we have no data
  async (_, thunkAPI) => {
    try {
      const response = await apiRequest.get('/users/getAdminDetail');
      console.log(response.data);

      // Return the data or handle the response as needed
      return response.data;
    } catch (error) {
      // Handle the error or reject the thunk with the error message

      const { message } = error.response.data;
      // toast.error(message);
      // if u write  (_, thunkAPI) then u can use thunkAPI.rejectedWithValue
      return thunkAPI.rejectedWithValue(error.response.data.message);
    }
  }
);

export const UpdateProfile = createAsyncThunk(
  'admin/UpdateProfile',
  async (data, thunkAPI) => {
    const dispatch = thunkAPI.dispatch;
    try {
      const response = await apiRequest.patch(
        '/users/admin/update-profile',
        data,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );
      console.log(response.data);
      toast.success(response.data.message);

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
// export const UpdateProfilePic = async data => {
//   try {
//     const response = await apiRequest.post(
//       '/users/admin/upload-profile',
//       data,
//       {
//         headers: {
//           'Content-Type': 'multipart/form-data',
//         },
//       }
//     );
//     console.log(response.data);

//     return response.data;
//   } catch (error) {
//     const { message } = error.response.data;
//     // Handle the error or reject the thunk with the error message
//     console.log(error);

//     return message;
//   }
// };
export const RemoveProfilePic = async (data, dispatch) => {
  try {
    const response = await apiRequest.post('/users/admin/remove-profile', data);
    dispatch(getAdminDetail());
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const RemoveProfileNotify = (data, dispatch) =>
  toast.promise(RemoveProfilePic(data, dispatch), {
    pending: 'Removing Profile Pic',
    success: 'Profile Pic Removed Successfully',
    error: 'Failed To Remove Profile Pic',
  });

export const PasswordUpdate = async (data, id) => {
  console.log(data, id);
  try {
    const response = await apiRequest.patch(
      `/users/change-password/${id}`,
      data
    );

    toast.success(response.data.message);
  } catch (error) {
    const { message } = error.response.data;
    // Handle the error or reject the thunk with the error message
    console.log(message);

    toast.error(message);
  }
};

//ResetPassword

export const ResetPassword = createAsyncThunk(
  'admin/ResetPassword',
  async (email, thunkAPI) => {
    const dispatch = thunkAPI.dispatch;
    try {
      const response = await apiRequest.post('/auth/reset-password', email);
      console.log(response.data);
      toast.success(response.data.message);

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
