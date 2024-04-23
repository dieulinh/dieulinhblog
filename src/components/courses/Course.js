import React, { useEffect, useContext, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {  useNavigate } from "react-router-dom";
import { hasError, isLoadingCurrentCourse, loadCourse, selectCurrentCourse } from '../../features/courses/course';

import Loader from '../Loader.js';
import { loadStripe } from "@stripe/stripe-js";
import {
  Elements,
  useStripe,
  useElements,
} from '@stripe/react-stripe-js';
import { Link, useParams } from 'react-router-dom';
import { UserContext } from '../../context/UserContext'
import { Parser } from "html-to-react";
import CheckoutForm from './CheckoutForm';
import axios from  '../../utils/axiosConfig';

// mentor search initialState
const stripePromise = loadStripe("pk_test_jYpGyyUVSACPcOE8pDk3DJmU");
export default function Course () {
  const course = useSelector(selectCurrentCourse)
  const error = useSelector(hasError)
  const isLoading = useSelector(isLoadingCurrentCourse)
  const courseId = useParams().courseId
  const [signedCourse, setSignedCourse] =  useState(false)
  const dispatch = useDispatch();
  const [clientSecret, setClientSecret] = useState('')
  const { currentUser, setCurrentUser } = useContext(UserContext);
  const navigate = useNavigate()

  const handleCheckout = async () => {
    if(signedCourse)  {
      navigate(`/learn/${courseId}`)
    }
    if(!currentUser) {
      navigate('/login')
    }
    // const { data } = axios.post(`/api/checkout/courses/${courseId}`,{ amount: course.price, course_id: courseId})
    axios.post("/api/checkout/createpayment_intent", {
      items: [{ id: course.course_name,price: course.price, course_id: courseId, user_id: currentUser.user_id }] },
    )
      
    .then((data) => {
      setClientSecret(data.data.clientSecret)
      // navigate(`/checkout/courses/${courseId}?payment_intent_client_secret=${data.clientSecret}`)
    }
    ).catch(error => {
      if (error.response.status ==409) {
        console.log('redirect to course')
        setSignedCourse(true)
        navigate(`/learn/${courseId}`)
      }
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
      {clientSecret && 
        <Elements  stripe={stripePromise} options={options}>
              <CheckoutForm courseId={courseId} userId={currentUser.user_id}/>
        </Elements>
      }
      <div className='grid-2-even'>
        <div className='mentor-info'>
          {Parser().parse(description)}
        </div>
        <div className="course-action">
          <div>$ {price}</div>
          <button onClick={handleCheckout} className='btn btn-primary'>{ signedCourse ? 'Start learning' :  'Enroll now' }</button>
        </div>

      </div>

    </div>
  )
}


