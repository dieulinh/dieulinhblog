import axios from '../../utils/axiosConfig';
import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import { storeUser } from './localStorage';
import { setCurrentUser } from '../session/sessionSlice';

export const registerUser = createAsyncThunk('auth/registerUser',
  async (user, thunkAPI) => {
    const data = await axios.post(`/api/login/register`,user);

    // if succeeds
    storeUser(data.data);
    thunkAPI.dispatch(setCurrentUser(data.data))
    return data;
  }
)

export const signupSlice = createSlice({
  name: 'register',
  initialState: {
    data: null,
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
        state.data = action.payload.data;
        state.hasError = false;
        state.isLoading = false
      })
      .addCase(registerUser.rejected, (state) => {
        state.hasError = true;
        state.isLoading = false;
        state.data = null
      })
  }
})

export const isLoading = (state) => state.registerReducer.isLoading;
export const isLoggedInHasError = (state) => state.registerReducer.hasError;

export default signupSlice.reducer;
