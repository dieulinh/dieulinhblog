
// import { ARTICLES } from '../../app/data';

// export const articlesSlice = createSlice({
//   name: 'articles',
//   initialState: {
//     articles: ARTICLES,
//   },
//   reducers: {}
// });




import axios from 'axios';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

export const loadArticles = createAsyncThunk(
  'articles/loadArticles',
  async () => {
    const data = await axios(`https://myclassr00m.herokuapp.com/api/articles`);

    return data

  }
);

export const articlesSlice = createSlice({
  name: 'articles',
  initialState: {
    articles: [],

    isLoadingArticles: false,
    hasError: false
  },
  extraReducers: (builder) => {
    builder
    .addCase(loadArticles.pending, (state) => {
      state.isLoadingArticles = true;
      state.hasError = false;
    })
    .addCase(loadArticles.fulfilled, (state, action) => {
      state.articles = action.payload.data;
      state.hasError = false;
      state.isLoadingArticles = false
    })
    .addCase(loadArticles.rejected, (state) => {
      state.hasError = true;
      state.isLoadingArticles = false;
      state.articles = []
    })
  }
});
export const selectArticles = (state) => state.articles.articles;
export const isLoadingArticles = (state) => state.articles.isLoadingArticles;

export const filterArticles = (query, articles) => Object.values(articles).filter(article => article.title.toLowerCase().includes(query.toLowerCase()))
export default articlesSlice.reducer;
