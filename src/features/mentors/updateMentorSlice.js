import axios from '../../utils/axiosConfig';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

export const updateMentor = createAsyncThunk('currentMentor/update',
  async (mentor, thunkAPI) => {
    const response = await axios.post(`/api/mentors/update_mentor`, mentor);
    return response.data;
  }
)

export const updateMentorSlice = createSlice({
  name: 'updateMentor',
  initialState: {
    mentor: null,
    isLoading: false,
    hasError: false
  },
  extraReducers: (builder) => {
    builder
      .addCase(updateMentor.pending, (state) => {
        state.isLoading = true;
        state.hasError = false;
      })
      .addCase(updateMentor.fulfilled, (state, action) => {
        state.mentor = action.payload.mentor;
        state.hasError = false;
        state.isLoading = false
      })
      .addCase(updateMentor.rejected, (state) => {
        state.hasError = true;
        state.isLoading = false;
        state.mentor = null
      })
  }
})
export const selectMentor = (state) => state.updateMentor.mentor;
export const isUpdating = (state) => state.updateMentor.isLoading;
export const updateHasError = (state) => state.updateMentor.hasError;
export default updateMentorSlice.reducer;
