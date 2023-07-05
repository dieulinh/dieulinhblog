import React from "react";
import About from "../components/About";
import SignUp from "../components/auth/SignUp";
import Login from "../components/auth/Login";
import Mentors from "../components/mentors/List";
import MentorProfile from "../components/mentors/Profile";
import AddWork from "../components/AddWork";
import Articles from "../components/Articles";

import Categories from "../components/articles/Categories";
import Category from "../components/articles/Category";
import Author from "../components/articles/Author";
import Profile from "../components/Profile";
import EditProfileForm from "../components/EditProfile";
import EditMentorForm from "../components/mentors/EditForm";
import Root from "../components/Root";

import { RouterProvider, createBrowserRouter, createRoutesFromElements, Route } from 'react-router-dom';
import { CurrentUser } from '../context/UserContext';

import "./App.css";
import Landing from "../components/Landing";
import ScheduleLesson from "../components/mentors/ScheduleLesson";
import SendMessage from "../components/mentors/SendMessage";

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
    <Route path='/mentors/:mentorId' element={<MentorProfile />} />
    <Route path='/mentors/:mentorId/add_work' element={<AddWork />} />
    <Route path='/mentors/:mentorId/edit' element={<EditMentorForm />} />
    <Route path='/mentors/:mentorId/schedule' element={<ScheduleLesson />} />
    <Route path='/mentors/:mentorId/message' element={<SendMessage />} />

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