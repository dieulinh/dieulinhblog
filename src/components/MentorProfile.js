import React from 'react';
import { useSelector } from 'react-redux';
import { hasError, selectCurrentMentor } from '../features/mentors/mentor.js';
import './MentorProfile.css'

export default function Mentor () {
  const mentor = useSelector(selectCurrentMentor)
  const error = useSelector(hasError)
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
      <div className='mentor-bio'>
        <h2>About Me</h2>
        <p>{bio}</p>
      </div>
      <div className='mentor-timeline'>
        <p>Created at: {createdAt}</p>
        <p>Updated at: {updatedAt}</p>
      </div>
    </div>
  )
}
