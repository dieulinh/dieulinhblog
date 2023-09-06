import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from '../../utils/axiosConfig';
export const loadBookings = createAsyncThunk(
  'bookings/load',
  async (studentId) => {
    const data = await axios(`/api/bookings/${studentId}`);
    return data.data;
  }
);

export const bookingsSlice = createSlice({
  name: 'mentors/bookings',
  initialState: {
    bookings: [],
    isLoadingBookings: false,
    hasError: false,
  },
  extraReducers: (builder) => {
    builder
      .addCase(loadBookings.pending, (state) => {
        state.isLoadingBookings = true;
        state.bookings = null;
        state.hasError = false;
      })
      .addCase(loadBookings.fulfilled, (state, action) => {
        state.bookings = action.payload.bookings;
        state.hasError = false;
        state.isLoadingBookings = false
      })
      .addCase(loadBookings.rejected, (state) => {
        state.hasError = true;
        state.isLoadingBookings = false;
        state.bookings = null
      })
  }
});
export const selectBookings = (state) => state.bookings.bookings;
export const isLoadingBookings = (state) => state.bookings.isLoadingBookings;


export default bookingsSlice.reducer;
