import axios from '../../utils/axiosConfig';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

export const loadUserMentor = createAsyncThunk('mentor/registerMentor',
  async () => {
    const response = await axios.post(`/api/mentors/mentor`, {});

    return response.data;
  }
)

export const userMentorSlice = createSlice({
  name: 'userMentor',
  initialState: {
    mentor: null,
    isLoading: false,
    hasError: false
  },
  extraReducers: (builder) => {
    builder
      .addCase(loadUserMentor.pending, (state) => {
        state.isLoading = true;
        state.hasError = false;
      })
      .addCase(loadUserMentor.fulfilled, (state, action) => {
        state.mentor = action.payload.mentor;
        state.hasError = false;
        state.isLoading = false
      })
      .addCase(loadUserMentor.rejected, (state) => {
        state.hasError = true;
        state.isLoading = false;
        state.mentor = null
      })
  }
})

export const isLoading = (state) => state.userMentor.isLoading;
export const selectMentor = (state) => state.userMentor.mentor
export default userMentorSlice.reducer;
