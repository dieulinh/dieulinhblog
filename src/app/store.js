import { configureStore } from '@reduxjs/toolkit';
import articlesReducer from '../features/articles/articlesSlice';
import mentorsReducer from '../features/mentors';
import bookingsReducer from '../features/students/bookingsSlice';
import coursesReducer from '../features/courses';
import currentArticleReducer from '../features/currentArticle/currentArticleSlice';
import sessionReducer from '../features/session/sessionSlice';
import authorsReducer from '../features/authors/authorsSlice';
import authReducer from '../features/auth/authSlice';
import signupReducer from '../features/auth/signupSlice';
import editMentorReducer from '../features/currentMentor/editMentorSlice';
import signupMentorReducer from '../features/mentors/signupMentorSlice';

export const store = configureStore({
  reducer: {
    articles: articlesReducer,
    mentors: mentorsReducer,
    courses: coursesReducer,
    session: sessionReducer,
    authors: authorsReducer,
    auth: authReducer,
    bookings: bookingsReducer,
    currentArticle: currentArticleReducer,
    registerReducer: signupReducer,
    editMentor: editMentorReducer,
    signupMentor: signupMentorReducer
  },
});
