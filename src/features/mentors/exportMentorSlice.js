import axios from '../../utils/axiosConfig';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

export const exportMentor = createAsyncThunk('currentMentor/export',
  async (mentorId, thunkAPI) => {
    const response = await axios.post(`/api/mentors/export`, mentorId);
    return response.data;
  }
)

export const exportMentorSlice = createSlice({
  name: 'exportMentor',
  initialState: {
    mentor: null,
    isLoading: false,
    hasError: false
  },
  extraReducers: (builder) => {
    builder
      .addCase(exportMentor.pending, (state) => {
        state.isLoading = true;
        state.hasError = false;
      })
      .addCase(exportMentor.fulfilled, (state, action) => {
        state.mentor = action.payload.mentor;
        state.hasError = false;
        state.isLoading = false
      })
      .addCase(exportMentor.rejected, (state) => {
        state.hasError = true;
        state.isLoading = false;
        state.mentor = null
      })
  }
})
export const selectMentor = (state) => state.exportMentor.mentor;
export const isUpdating = (state) => state.exportMentor.isLoading;
export const updateHasError = (state) => state.exportMentor.hasError;
export default exportMentorSlice.reducer;
