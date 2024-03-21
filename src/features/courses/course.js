import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
export const loadCourse = createAsyncThunk(
  'courses/currentCourse/load',
  async (courseId) => {
    const data = await axios(`/api/courses/${courseId}/details`);
    return data.data;
  }
);

export const currentCourseSlice = createSlice({
  name: 'courses/currentCourse',
  initialState: {
    currentCourse: null,
    isLoadingCurrentCourse: false,
    hasError: false,
  },
  extraReducers: (builder) => {
    builder
      .addCase(loadCourse.pending, (state) => {
        state.isLoadingCurrentCourse = true;
        state.currentCourse = null;
        state.hasError = false;
      })
      .addCase(loadCourse.fulfilled, (state, action) => {
        state.currentCourse = action.payload.course;
        state.hasError = false;
        state.isLoadingCurrentCourse = false
      })
      .addCase(loadCourse.rejected, (state) => {
        state.hasError = true;
        state.isLoadingCurrentCourse = false;
        state.currentCourse = null
      })
  }
});
export const selectCurrentCourse = (state) => state.courses.currentCourse.currentCourse;
export const isLoadingCurrentCourse = (state) => state.courses.currentCourse.isLoadingCurrentCourse;
export const hasError = (state) => state.courses.currentCourse.hasError;

export default currentCourseSlice.reducer;
