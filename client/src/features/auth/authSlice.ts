import { createSlice } from '@reduxjs/toolkit';
import { registerUser } from './authActions';

const initialState = {
  user: null,
  loading: false,
  error: false,
  success: false,
  message: '',
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.error = false;
        state.user = action.payload?.data;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.user = null;
        state.success = false;
        state.error = true;
        state.message = action.payload as string;
      });
  },
});

export default authSlice.reducer;
