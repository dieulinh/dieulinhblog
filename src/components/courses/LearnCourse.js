import React, { useEffect, useContext, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {  useNavigate } from "react-router-dom";
import { hasError, isLoadingCurrentCourse, loadCourse, selectCurrentCourse } from '../../features/courses/course';

import Loader from '../Loader.js';
import { loadStripe } from "@stripe/stripe-js";

import { Link, useParams } from 'react-router-dom';
import { UserContext } from '../../context/UserContext'
import { Parser } from "html-to-react";

import axios from  '../../utils/axiosConfig';

// mentor search initialState
const stripePromise = loadStripe("pk_test_jYpGyyUVSACPcOE8pDk3DJmU");
export default function Course () {
  const course = useSelector(selectCurrentCourse)
  const error = useSelector(hasError)
  const [content,setContent] = useState([])
  const isLoading = useSelector(isLoadingCurrentCourse)
  const courseId = useParams().courseId
  const [signedCourse, setSignedCourse] =  useState(false)
  const dispatch = useDispatch();
  const [clientSecret, setClientSecret] = useState('')
  const [activeSection, setActiveSection] = useState()
  const { currentUser, setCurrentUser } = useContext(UserContext);
  const navigate = useNavigate()
  // send post request to create payment intent
  // send post request to create payment intent and get client secret
  const handleNext = async () => {
    console.log('next')

    if (!activeSection) return
    let nextIndex = content.findIndex((item) => item.id == activeSection.id) + 1
    if(nextIndex >= content.length + parseInt(content[0].id) - 1) { 

      return 
    }
    else {
      console.log('firstId', content[0].id)
      if(nextIndex > content.length + parseInt(content[0].id) - 1 ) {
    
        return
      }
      setActiveSection(content[nextIndex])
    
    }
    
  }
  const handleSwitch = (post) => async () => {
    console.log('switching to post', setActiveSection(post))
  }
  const handleStart = async () => {
    console.log('start learning')
    if(!currentUser) {
      navigate('/login')
    }
    axios.post("/api/learning_progresses", {
      course_id: courseId,
      student_id: currentUser.user_id,
      completed: 0,
      post_id: 1
    })
    .then((response) => {
      console.log(response.data)
      setContent(response.data)
      setActiveSection(response.data[0])
      // Handle the response
    })
    .catch((error) => {
      // Handle the error
      console.log(error.response)
    });
  }
  useEffect(() => {
    dispatch(loadCourse(courseId));
  }, [dispatch, courseId]);
  useEffect(() => {
    if (!clientSecret) return;
  }, [clientSecret])
  
  const appearance = {
    theme: 'stripe',
  };
  const options = {
    clientSecret,
    appearance,
  };

  if (isLoading) {
    return (<Loader />)
  }

  if (!course) {
    return
  }

  const {
    id,
    course_name,
    description,price
  } = course

  return (
    <div className='mentor-container'>
      <h1 className='mentor-title'>{course_name}</h1>
      
      <div className='grid-2-even'> 
        { content.length ==0 && <div className='mentor-info'>
          {Parser().parse(description)}
        </div>}
       
        
        { content.length ==0 ? 
          <div className="course-action">
        
            <button onClick={handleStart} className='btn primary'>Start Learning</button>
          </div>
        :
          <div className='flex-row'>
            <div>
              <h3>Course Content</h3>
              <ul>
                
                {content.length && content.map((item, index) => {return <li className={activeSection.id ==item.id ? "course-section active-section" : "course-section"} key={index}><a onClick={handleSwitch(item)} >{item.title}</a></li>})}
              </ul>
            </div>
            <div className='section-content'>
              <div className='flex-row section-nav'><button className='btn btn-primary' disabled={activeSection.id ==content[content.length - 1].id} onClick={handleNext}>Next</button></div>
              <section className='section-content-container'>
                {activeSection && Parser().parse(activeSection.content)}
              </section>
            </div>

          </div>
        }
      </div>
    </div>
  )
}


