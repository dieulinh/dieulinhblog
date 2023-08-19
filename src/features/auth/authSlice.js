import axios from '../../utils/axiosConfig';
import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import { storeUser } from './localStorage';
import { setCurrentUser } from '../session/sessionSlice';

export const loginUser = createAsyncThunk('auth/loginUser',
  async ({email,password}, thunkAPI) => {    
    const data = await axios.post(`/api/login`,{email, password});

    // if succeeds
    storeUser(data.data)
    thunkAPI.dispatch(setCurrentUser(data.data))
    return data;
  }
)

export const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: null,
    data: null,
    isLoading: false,
    hasError: false
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
        state.hasError = false;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.data = action.payload.data;
        state.hasError = false;
        state.isLoading = false
      })
      .addCase(loginUser.rejected, (state) => {
        state.hasError = true;
        state.isLoading = false;
        state.data = null
      })
  }
})

export const isLoading = (state) => state.auth.isLoading;
export const isLoggedInHasError = (state) => state.auth.hasError;

export default authSlice.reducer;
