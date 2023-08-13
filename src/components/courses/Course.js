import React, { useEffect, useContext } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { hasError, isLoadingCurrentCourse, loadCourse, selectCurrentCourse } from '../../features/courses/course';

import Loader from '../Loader.js';
import { Link, useParams } from 'react-router-dom';
import { UserContext } from '../../context/UserContext'
import { Parser } from "html-to-react";

// mentor search initialState

export default function Mentor () {
  const course = useSelector(selectCurrentCourse)
  const error = useSelector(hasError)
  const isLoading = useSelector(isLoadingCurrentCourse)
  const courseId = useParams().courseId
  const dispatch = useDispatch();
  const { currentUser, setCurrentUser } = useContext(UserContext);

  useEffect(() => {
    dispatch(loadCourse(courseId));
  }, [dispatch, courseId]);


  if (isLoading) {
    return (<Loader />)
  }
  if (error) {
    return <div>
      Error loading mentor.
    </div>
  }
  if (!course) {
    return
  }

  const {
    id,
    course_name,
    description
  } = course

  return (
    <div className='mentor-container'>
      <h1 className='mentor-title'>{course_name}</h1>

      <div className='mentor-info'>
        {Parser().parse(description)}
      </div>

      <div className="mentor-background">

      </div>

      <div className="work-histories">


      </div>

      <div className='mentor-timeline'>

      </div>
    </div>
  )
}


