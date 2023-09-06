import axios from '../../utils/axiosConfig';
import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';

export const registerMentor = createAsyncThunk('mentor/registerMentor',
  async (mentorData) => {
    const response = await axios.post(`/api/mentors`, mentorData);

    return response.data;
  }
)

export const signupMentorSlice = createSlice({
  name: 'signupMentor',
  initialState: {
    mentor: null,
    isSaving: false,
    hasError: false
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerMentor.pending, (state) => {
        state.isSaving = true;
        state.hasError = false;
      })
      .addCase(registerMentor.fulfilled, (state, action) => {
        state.mentor = action.payload.mentor;
        state.hasError = false;
        state.isSaving = false
      })
      .addCase(registerMentor.rejected, (state) => {
        state.hasError = true;
        state.isSaving = false;
        state.mentor = null
      })
  }
})

export const isSaving = (state) => state.signupMentor.isSaving;
export const selectMentor = (state) => state.signupMentor.mentor
export default signupMentorSlice.reducer;
