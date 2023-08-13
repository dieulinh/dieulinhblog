import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from '../../utils/axiosConfig';
export const loadCourse = createAsyncThunk(
  'courses/course',
  async (courseId) => {
    const data = await axios(`/api/courses/${courseId}/details`);
    return data.data;
  }
);

export const courseSlice = createSlice({
  name: 'courses/course',
  initialState: {
    course: null,
    isLoadingCurrentCourse: false,
    hasError: false,
  },
  extraReducers: (builder) => {
    builder
      .addCase(loadCourse.pending, (state) => {
        state.isLoadingCurrentCourse = true;
        state.course = null;
        state.hasError = false;
      })
      .addCase(loadCourse.fulfilled, (state, action) => {
        state.course = action.payload.course;
        state.hasError = false;
        state.isLoadingCurrentCourse = false
      })
      .addCase(loadCourse.rejected, (state) => {
        state.hasError = true;
        state.isLoadingCurrentCourse = false;
        state.course = null
      })
  }
});
export const selectCurrentCourse = (state) => state.courses.course.course;
export const isLoadingCurrentCourse = (state) => state.courses.course.isLoadingCurrentCourse;
export const hasError = (state) => state.courses.course.hasError;

export default courseSlice.reducer;
