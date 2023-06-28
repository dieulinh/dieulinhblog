import axios from '../../utils/axiosConfig';
import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';

export const loginUser = createAsyncThunk('auth/loginUser',
  async ({email,password}, thunkAPI) => {
    const data = await axios.post(`/api/login`,{email, password});
    return data;
  }
)

export const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: null,
    isAuthenticated: false,
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
        state.user = action.payload.data;
        state.hasError = false;
        state.isLoading = false

      })
      .addCase(loginUser.rejected, (state) => {
        state.hasError = true;
        state.isLoading = false;
        state.user = null
      })
  }
})
export const selectCurrentUser = (state) => state.auth.user;
export const isLoading = (state) => state.auth.isLoading;
export const isLoggedInHasError = (state) => state.auth.hasError;
export const selectIsLoggedIn = (state) => state.auth.isAuthenticated;
export default authSlice.reducer;
// export const { loginSuccess, loginFailed } = authSlice.actions;