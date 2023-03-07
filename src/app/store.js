import { configureStore } from '@reduxjs/toolkit';
import articlesReducer from '../features/articles/articlesSlice';
import currentArticleReducer from '../features/currentArticle/currentArticleSlice';
import sessionReducer from '../features/session/sessionSlice';
import authorsReducer from '../features/authors/authorsSlice';

export const store = configureStore({
  reducer: {
    articles: articlesReducer,
    session: sessionReducer,
    authors: authorsReducer,
    currentArticle: currentArticleReducer
  },
});
