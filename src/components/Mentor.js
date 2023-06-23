import React from 'react';

export default function Mentor ({ mentor }) {
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
