import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
export const loadCurrentArticle = createAsyncThunk(
  'currentArticle/loadCurrentArticle',
  async (articleId) => {
    console.log(articleId)
    const data = await axios(`https://myclassr00m.herokuapp.com/api/articles/${articleId}`);

    return data;
  }
);

export const currentArticleSlice = createSlice({
  name: 'currentArticle',
  initialState: {
    article: null,
    isLoadingCurrentArticle: false,
    hasError: false
  },
  extraReducers: (builder) => {
    builder
      .addCase(loadCurrentArticle.pending, (state) => {
        state.isLoadingCurrentArticle = true;
        state.hasError = false;
      })
      .addCase(loadCurrentArticle.fulfilled, (state, action) => {
        state.article = action.payload.data;
        state.hasError = false;
        state.isLoadingCurrentArticle = false
      })
      .addCase(loadCurrentArticle.rejected, (state) => {
        state.hasError = true;
        state.isLoadingCurrentArticle = false;
        state.article = null
      })
  }
});
export const selectCurrentArticle = (state) => state.currentArticle.article;
export const isLoadingCurrentArticle = (state) => state.currentArticle.isLoadingCurrentArticle;
export default currentArticleSlice.reducer;
