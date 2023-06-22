import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
export const loadMentor = createAsyncThunk(
  'mentors/mentor/load',
  async (mentorId) => {
    const data = await axios(`https://myclassr00m.herokuapp.com/api/mentors/${mentorId}`);

    return data;
  }
);

export const mentorSlice = createSlice({
  name: 'mentors/mentor',
  initialState: {
    mentor: null,
    isLoadingCurrentMentor: false,
    hasError: false
  },
  extraReducers: (builder) => {
    builder
      .addCase(loadMentor.pending, (state) => {
        state.isLoadingCurrentMentor = true;
        state.hasError = false;
      })
      .addCase(loadMentor.fulfilled, (state, action) => {
        state.mentor = action.payload.data;
        state.hasError = false;
        state.isLoadingCurrentMentor = false
      })
      .addCase(loadMentor.rejected, (state) => {
        state.hasError = true;
        state.isLoadingCurrentMentor = false;
        state.mentor = null
      })
  }
});
export const selectCurrentMentor = (state) => state.mentors.mentor.mentor;
export const isLoadingCurrentMentor = (state) => state.mentors.mentor.isLoadingCurrentMentor;
export default mentorSlice.reducer;
