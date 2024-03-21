import axios from '../../utils/axiosConfig';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

export const loadMyCourses = createAsyncThunk(
  'courses/myCourses/load',
  async (query) => {
    console.log('query', query)
    const page = query.get('page') || 1
    const q = query.get('term') || ''
    const user_id = query.get('user_id')
    const response = await axios.get(`/api/courses/search?page=${page}&user_id=${user_id}&term=${encodeURIComponent(q)}`);
    return response.data
  }
);

export const myCoursesSlice = createSlice({
  name: 'courses/myCourses',
  initialState: {
    courses: [],
    isLoadingCourses: false,
    hasError: false
  },
  extraReducers: (builder) => {
    builder
      .addCase(loadMyCourses.pending, (state) => {
        state.isLoadingCourses = true;
        state.hasError = false;
      })
      .addCase(loadMyCourses.fulfilled, (state, action) => {
        state.courses = action.payload.courses;
        state.hasError = false;
        state.isLoadingCourses = false
      })
      .addCase(loadMyCourses.rejected, (state) => {
        state.hasError = true;
        state.isLoadingCourses = false;
        state.courses = []
      })
  }
});
export const selectCourses = (state) => state.courses.myCourses.courses;
export const isLoadingCourses = (state) => state.courses.myCourses.isLoadingCourses;
export const hasError = (state) => state.courses.myCourses.hasError;

export default myCoursesSlice.reducer;
