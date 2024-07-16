import axios from '../../utils/axiosConfig';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

export const addNewPost = createAsyncThunk('articles/addNewPost',
  async (initialPost) => {
    const response = await axios.post(`/api/articles`, initialPost);
    return response.data;
  }
)

export const newPostSlice = createSlice({
  name: 'post',
  initialState: {
    post: null,
    isLoading: false,
    hasError: false
  },
  extraReducers: (builder) => {
    builder
      .addCase(addNewPost.pending, (state) => {
        state.isLoading = true;
        state.hasError = false;
      })
      .addCase(addNewPost.fulfilled, (state, action) => {
        state.post = action.payload;
        state.hasError = false;
        state.isLoading = false
      })
      .addCase(addNewPost.rejected, (state) => {
        state.hasError = true;
        state.isLoading = false;
        state.post = null
      })
  }
})

export const isUpdating = (state) => state.post.isLoading;
export const updateHasError = (state) => state.post.hasError;
export default newPostSlice.reducer;
