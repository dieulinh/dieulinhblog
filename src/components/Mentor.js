import React from 'react';
import { useSelector } from 'react-redux';
import { hasError, selectCurrentMentor } from '../features/mentors/mentor.js';

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
    first_name,
    last_name,
    email,
    phone,
    address,
    specialization,
    experience_years,
    bio,
    created_at,
    updated_at,
  } = mentor

  return (
    <div className='mentor-container'>
      <h1 className='mentor-title'>Some Mentor</h1>
      <div>
        {JSON.stringify(mentor)}
      </div>
    </div>
  )
}
