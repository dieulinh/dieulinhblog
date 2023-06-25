import axios from 'axios';
import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';

export const registerUser = createAsyncThunk('auth/registerUser',
  async (user, thunkAPI) => {
    const data = await axios.post(`https://myclassr00m.herokuapp.com/api/login/register`,user);
    return data;
  }
)
export const signupSlice = createSlice({
  name: 'register',
  initialState: {
    user: null,
    isLoading: false,
    hasError: false
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.isLoading = true;
        state.hasError = false;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.user = action.payload.data;
        state.hasError = false;
        state.isLoading = false

      })
      .addCase(registerUser.rejected, (state) => {
        state.hasError = true;
        state.isLoading = false;
        state.user = null
      })
  }
})
export const selectCurrentUser = (state) => state.auth.user;
export const isLoading = (state) => state.auth.isLoading;
export const isLoggedInHasError = (state) => state.auth.hasError;
export default signupSlice.reducer;
