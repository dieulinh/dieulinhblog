import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from '../../utils/axiosConfig';
export const bookMentor = createAsyncThunk(
  'mentors/mentor/book',
  async (bookingParams) => {

    const data = await axios.post(`/api/mentors/${bookingParams.mentorId}/book`, bookingParams);
    return data.data;
  }
);

export const bookMentorSlice = createSlice({
  name: 'mentors/mentor',
  initialState: {
    booking: null,
    isLoadingBooking: false,
    hasError: false,
  },
  extraReducers: (builder) => {
    builder
      .addCase(bookMentor.pending, (state) => {
        state.isLoadingBooking = true;
        state.booking = null;
        state.hasError = false;
      })
      .addCase(bookMentor.fulfilled, (state, action) => {
        state.booking = action.payload.booking;
        state.hasError = false;
        state.isLoadingBooking = false
      })
      .addCase(bookMentor.rejected, (state) => {
        state.hasError = true;
        state.isLoadingBooking = false;
        state.booking = null
      })
  }
});
export const selectCurrentBooking = (state) => state.mentors.mentor.booking;
export const isLoadingBooking = (state) => state.mentors.mentor.isLoadingBooking;
export const hasError = (state) => state.mentors.mentor.hasError;

export default bookMentorSlice.reducer;
