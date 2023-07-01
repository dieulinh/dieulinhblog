import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { hasError, isLoadingCurrentMentor, loadMentor, selectCurrentMentor } from '../features/mentors/mentor.js';
import './MentorProfile.css'
import Loader from './Loader.js';
import { Link, useParams } from 'react-router-dom';

// mentor search initialState




export default function Mentor () {
  const mentor = useSelector(selectCurrentMentor)
  const error = useSelector(hasError)
  const isLoading = useSelector(isLoadingCurrentMentor)
  const mentorId = useParams().mentorId
  const dispatch = useDispatch()

  useEffect(() => {    
    dispatch(loadMentor(mentorId));
  }, [dispatch, mentorId]);


  if (isLoading) {
    return (<Loader />)
  }
  if (error) {
    return <div>
      Error loading mentor.
    </div>
  }
  if (!mentor) {
    return
  }

  const {
    id,
    firstName,
    lastName,
    email,
    phone,
    address,
    specialization,
    experienceYears,
    bio,
    createdAt,
    updatedAt,    
  } = mentor


  return (
    <div className='mentor-container'>
      <h1 className='mentor-title'>{firstName} {lastName}</h1>
      <div className='mentor-info'>
        <p className='mentor-email'>Email: {email}</p>
        <p className='mentor-phone'>Phone: {phone}</p>
        <p className='mentor-address'>Address: {address}</p>
        <p className='mentor-specialization'>Specialization: {specialization}</p>
        <p className='mentor-experience'>Experience: {experienceYears} years</p>
      </div>
      <div>
        <Link to={`/mentors/${mentorId}/message`}>Send a message</Link> to {firstName} {lastName}.
      </div>
      <div>
        <Link to={`/mentors/${mentorId}/schedule`}>Schedule a meeting</Link> with {firstName} {lastName}.
      </div>
      {/* <div className="mentor-photo">                
        <img src="https://via.placeholder.com/300" alt="mentor" />
      </div> */}
      <div className="mentor-background">
        
      </div>
      {/* <div className="mentor-video">
        <video controls>
          <source src="https://www.w3schools.com/html/mov_bbb.mp4" type="video/mp4" />
          Your browser does not support HTML video.
        </video>
      </div> */
      }
      <div className='mentor-bio'>
        <h2>About Me</h2>
        <p>{bio}</p>
      </div>
      <div className="mentor-posts">

      </div>
      <div className='mentor-timeline'>
        {/* <p>Joined: {createdAt}</p> */}
        {/* <p>Updated at: {updatedAt}</p> */}
      </div>
    </div>
  )
}


