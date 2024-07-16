import axios from '../../utils/axiosConfig';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

export const loadVocabs = createAsyncThunk('learns/loadVocabs',
  async (prompt) => {
    const response = await axios.post(`/api/learns/vocabs`, { prompt });

    return response.data;
  }
)

export const vocabsSlice = createSlice({
  name: 'vocabs',
  initialState: {
    vocabs: null,
    isMentorLoading: false,
    hasError: false
  },
  extraReducers: (builder) => {
    builder
      .addCase(loadVocabs.pending, (state) => {
        state.isMentorLoading = true;
        state.hasError = false;
      })
      .addCase(loadVocabs.fulfilled, (state, action) => {
        state.vocabs = action.payload.vocabs;
        state.hasError = false;
        state.isMentorLoading = false
      })
      .addCase(loadVocabs.rejected, (state) => {
        state.hasError = true;
        state.isMentorLoading = false;
        state.vocabs = null
      })
  }
})

export const isMentorLoading = (state) => state.vocabs.isMentorLoading;
export const selectVocabs = (state) => state.vocabs.vocabs
export default vocabsSlice.reducer;
