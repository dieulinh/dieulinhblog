import axios from '../../utils/axiosConfig';
import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';

export const loadMentor = createAsyncThunk('mentor/loadMentor',
  async (mentorId) => {
    const response = await axios.get(`/api/mentors/${mentorId}`);

    return response.data;
  }
)

export const loadMentorSlice = createSlice({
  name: 'loadMentor',
  initialState: {
    mentor: null,
    isMentorLoading: false,
    hasError: false
  },
  extraReducers: (builder) => {
    builder
      .addCase(loadMentor.pending, (state) => {
        state.isMentorLoading = true;
        state.hasError = false;
      })
      .addCase(loadMentor.fulfilled, (state, action) => {
        state.mentor = action.payload.mentor;
        state.hasError = false;
        state.isMentorLoading = false
      })
      .addCase(loadMentor.rejected, (state) => {
        state.hasError = true;
        state.isMentorLoading = false;
        state.mentor = null
      })
  }
})

export const isMentorLoading = (state) => state.loadMentor.isMentorLoading;
export const selectCurrentMentor = (state) => state.loadMentor.mentor
export default loadMentorSlice.reducer;
