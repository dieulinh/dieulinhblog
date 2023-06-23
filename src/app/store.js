import { configureStore } from '@reduxjs/toolkit';
import articlesReducer from '../features/articles/articlesSlice';
import mentorsReducer from '../features/mentors';
import currentArticleReducer from '../features/currentArticle/currentArticleSlice';
import sessionReducer from '../features/session/sessionSlice';
import authorsReducer from '../features/authors/authorsSlice';
import authReducer from '../features/auth/authSlice';
import mentorReducer from '../features/mentors/mentorsSlice';
import signupReducer from '../features/auth/signupSlice';

export const store = configureStore({
  reducer: {
    articles: articlesReducer,
    mentors: mentorsReducer,
    session: sessionReducer,
    authors: authorsReducer,
    auth: authReducer,
    mentors: mentorReducer,
    currentArticle: currentArticleReducer,
    registerReducer: signupReducer
  },
});
