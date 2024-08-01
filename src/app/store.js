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
import updateMentorReducer from '../features/mentors/updateMentorSlice';
import exportMentorReducer from '../features/mentors/exportMentorSlice';
import userMentorReducer from '../features/mentors/userMentorSlice';
import vocabsReducer from '../features/learns/vocabSlice';
import newPostReducer from '../features/articles/newPostSlice';
// import { createRecipe } from '../features/recipes/createRecipeSlice';
import recipesReducer from '../features/recipes/recipesSlice';
export const store = configureStore({
  reducer: {
    recipes: recipesReducer,
    articles: articlesReducer,
    mentors: mentorsReducer,
    courses: coursesReducer,
    session: sessionReducer,
    authors: authorsReducer,
    auth: authReducer,
    bookings: bookingsReducer,
    currentArticle: currentArticleReducer,
    register: signupReducer,
    editMentor: editMentorReducer,
    signupMentor: signupMentorReducer,
    userMentor: userMentorReducer,
    updateMentor: updateMentorReducer,
    exportMentor: exportMentorReducer,
    vocabs: vocabsReducer,
    newPost: newPostReducer
  },
});
