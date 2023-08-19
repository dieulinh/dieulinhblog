import { createSlice } from '@reduxjs/toolkit';
import { clearUser } from '../auth/localStorage';

export const logOut = () => {
  return dispatch => {
    clearUser()
    dispatch(sessionSlice.actions.logOut())
  }
}

export const sessionSlice = createSlice({
  name: 'session',
  initialState: {
    user: null,
    isLoggedIn: false
  },
  reducers: {
    setCurrentUser: (state, action) => {
      state.user = action.payload;
      state.isLoggedIn = true;
    },
    logOut: (state, action) => {
      state.user = null;
      state.isLoggedIn = false;
    }
  }
});

export const { setCurrentUser } = sessionSlice.actions;
export const selectCurrentUser = (state) => state.session.user;
export const selectIsLoggedIn = (state) => state.session.isLoggedIn;

export default sessionSlice.reducer;
