import axios from '../../utils/axiosConfig';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

export const loadCourses = createAsyncThunk(
  'courses/list/load',
  async (query) => {
    const page = query.get('page') || 1
    const q = query.get('term') || ''
    const response = await axios.get(`/api/courses/search?page=${page}&term=${encodeURIComponent(q)}`);
    return response.data
  }
);

export const coursesSlice = createSlice({
  name: 'courses/list',
  initialState: {
    courses: [],

    isLoadingCourses: false,
    hasError: false
  },
  extraReducers: (builder) => {
    builder
      .addCase(loadCourses.pending, (state) => {
        state.isLoadingCourses = true;
        state.hasError = false;
      })
      .addCase(loadCourses.fulfilled, (state, action) => {
        state.courses = action.payload.courses;
        state.hasError = false;
        state.isLoadingCourses = false
      })
      .addCase(loadCourses.rejected, (state) => {
        state.hasError = true;
        state.isLoadingCourses = false;
        state.courses = []
      })
  }
});
export const selectCourses = (state) => state.courses.list.courses;
export const isLoadingCourses = (state) => state.courses.list.isLoadingCourses;
export const hasError = (state) => state.courses.list.hasError;


export default coursesSlice.reducer;
