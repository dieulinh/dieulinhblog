import axios from '../../utils/axiosConfig';
import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';

export const updateMentor = createAsyncThunk('currentMentor/update',
  async (mentor, thunkAPI) => {
    const response = await axios.post(`/api/mentors/`, mentor);
    return response.data;
  }
)

// export const loadMentor = createAsyncThunk('currentMentor/load',
//   async (mentorId, thunkAPI) => {
//     const data = await axios.get(`/api/mentors/${mentorId}`);
//     return data;
//   }
// )

export const editMentorSlice = createSlice({
  name: 'currentMentor',
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
export const selectCurrentMentor = (state) => state.currentMentor.mentor;
export const isLoading = (state) => state.currentMentor.isLoading;
export const loadHasError = (state) => state.currentMentor.hasError;
export default editMentorSlice.reducer;
