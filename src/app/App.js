import React from "react";
import About from "../components/About";
import SignUp from "../components/auth/SignUp";
import Login from "../components/auth/Login";
import Mentors from "../components/mentors/List";
import Courses from "../components/courses/Courses";
import Course from "../components/courses/Course";
import MentorProfile from "../components/mentors/Profile";
import EditProfileForm from "../components/mentors/EditProfileForm";
import BookMentor from "../components/bookings/BookMentor";
import MyBookings from "../components/bookings/MyBookings";
import AddWork from "../components/AddWork";
import AddGallery from "../components/AddGallery";
import Articles from "../components/articles/Articles";
import Categories from "../components/articles/Categories";
import Category from "../components/articles/Category";
import Author from "../components/articles/Author";
import Profile from "../components/Profile";

import EditMentorForm from "../components/mentors/EditForm";

import SignupForm from "../components/mentors/SignupForm";
import Root from "../components/Root";
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'

import { RouterProvider, createBrowserRouter, createRoutesFromElements, Route } from 'react-router-dom';
import { CurrentUser } from '../context/UserContext';

import "./App.css";
import Landing from "../components/Landing";
import ScheduleLesson from "../components/mentors/ScheduleLesson";
import SendMessage from "../components/mentors/SendMessage";
import SuccessPayment from "../components/courses/SuccessPayment";
import Mycourses from "../features/courses/mycourses";

const router = createBrowserRouter(createRoutesFromElements(
  <Route path='/' element={<Root />}>
    <Route path='/' element={<Landing />} />
    <Route path='/about' element={<About />} />
    <Route path='/signup-mentor' element={<SignupForm />} />
    <Route path='/authors/:name' element={<Author />} />
    <Route path='/articles' element={<Articles />} />
    <Route path='/courses' element={<Courses />} />
    <Route path='/courses/:courseId' element={<Course />} />
    <Route path='/articles/:articleId' element={<Articles />} />
    <Route path='/categories' element={<Categories />}>
      <Route path=':name' element={<Category />} />
    </Route>
    <Route path='/login' element={<Login />} />
    <Route path='/mentors' element={<Mentors />} />
    <Route path='/profile' element={<EditProfileForm />} />
    <Route path='/mentors/:mentorId' element={<MentorProfile />} />
    <Route path='/mentors/:mentorId/add_work' element={<AddWork />} />
    <Route path='/mentors/:mentorId/add_gallery' element={<AddGallery />} />
    <Route path='/mentors/:mentorId/book' element={<BookMentor />} />
    <Route path='/mybookings' element={<MyBookings />} />
    <Route path='/mentors/:mentorId/edit' element={<EditMentorForm />} />
    <Route path='/mentors/:mentorId/schedule' element={<ScheduleLesson />} />
    <Route path='/mentors/:mentorId/message' element={<SendMessage />} />
    <Route path='/mycourses' element={<Courses />}></Route>
    <Route path='/profile1' element={<Profile />}></Route>
    <Route path='/signup_success/:courseId' element={<SuccessPayment />}>
    </Route>
    <Route path='/sign-up' element={<SignUp />} />
   
  </Route>)
);


function App() {

  return (
    <CurrentUser>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        
        <RouterProvider router={router}></RouterProvider>
      
      </LocalizationProvider>
    </CurrentUser>
  );
}

export default App;