import { createSlice } from '@reduxjs/toolkit';

const searchSlice = createSlice({
  name: 'search',
  initialState: {
    country: 'all',
    searchTerm: ''
  },
  reducers: {
    setCountry(state, action) {
      state.country = action.payload
    },
    setSearchTerm(state, action) {
      state.searchTerm = action.payload
    }
  }
})

export const { setCountry, setSearchTerm } = searchSlice.actions;
export const selectSearch = state => state.mentors.search;
export const selectCountry = state => state.mentors.search.country;
export const selectSearchTerm = state => state.mentors.search.searchTerm;
export default searchSlice.reducer;