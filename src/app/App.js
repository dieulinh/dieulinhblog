import React from "react";
import About from "../components/About";
import SignUp from "../components/SignUp";
import Login from "../components/Login";
import Mentors from "../components/Mentors";
import Articles from "../components/Articles";

import Categories from "../components/Categories";
import Category from "../components/Category";
import Author from "../components/Author";
import Profile from "../components/Profile";
import EditProfileForm from "../components/EditProfileForm";
import Root from "../components/Root";

import { RouterProvider, createBrowserRouter, createRoutesFromElements, Route } from 'react-router-dom';
import { CurrentUser } from '../context/UserContext';

import "./App.css";
import Landing from "../components/Landing";

const router = createBrowserRouter(createRoutesFromElements(
  <Route path='/' element={<Root />}>
    <Route path='/' element={<Landing />} />
    <Route path='/about' element={<About />} />
    <Route path='/authors/:name' element={<Author />} />
    <Route path='/articles' element={<Articles />} />
    <Route path='/articles/:articleId' element={<Articles />} />
    <Route path='/categories' element={<Categories />}>
      <Route path=':name' element={<Category />} />
    </Route>
    <Route path='/login' element={<Login />} />
    <Route path='/mentors' element={<Mentors />} />
    <Route path='/mentors/:mentorId' element={<Mentors />} />

    <Route path='/profile' element={<Profile />}>
      <Route path="edit" element={<EditProfileForm />}>

      </Route>
    </Route>
    <Route path='/sign-up' element={<SignUp />} />
  </Route>)
);


function App() {
  return (
    <CurrentUser>
      <RouterProvider router={router}></RouterProvider>
    </CurrentUser>
  );
}

export default App;