import axios from 'axios';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

const  BASE_URL = process.env.REACT_APP_DEFAULT_API_URL;
export const loadMentors = createAsyncThunk(
  'mentors/loadMentors',
  async () => {
    const data = await axios(`${BASE_URL}/api/mentors`);
    return data
  }
);

export const mentorsSlice = createSlice({
  name: 'mentors',
  initialState: {
    mentors: [],

    isLoadingMentors: false,
    hasError: false
  },
  extraReducers: (builder) => {
    builder
      .addCase(loadMentors.pending, (state) => {
        state.isLoadingMentors = true;
        state.hasError = false;
      })
      .addCase(loadMentors.fulfilled, (state, action) => {
        state.mentors = action.payload.data;
        state.hasError = false;
        state.isLoadingMentors = false
      })
      .addCase(loadMentors.rejected, (state) => {
        state.hasError = true;
        state.isLoadingMentors = false;
        state.mentors = []
      })
  }
});
export const selectMentors = (state) => state.mentors.mentors;
export const isLoadingMentors = (state) => state.mentors.isLoadingMentors;

export const filterArticles = (query, articles) => Object.values(articles).filter(article => article.title.toLowerCase().includes(query.toLowerCase()))
export default mentorsSlice.reducer;
