import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosClient from '../../http/axios';

interface IKnownError {
  errorMessage: string;
}

export const registerUser = createAsyncThunk(
  'auth/register',
  async (userData, thunkAPI) => {
    try {
      const response = await axiosClient.post('/user/register', userData);

      if (response.data) {
        return response;
      }
    } catch (error: any) {
      const message =
        (error.response && error.response.data.message) || error.message;

      // rejectWithValue sends the error message as payload
      return thunkAPI.rejectWithValue(message);
    }
  }
);
