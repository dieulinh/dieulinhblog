import React from 'react';
import { Parser } from 'html-to-react'

export default function Mentor (props) {
  const {mentor} = props

  return (
    <div className='mentor-container'>
      <h1 className='mentor-title'>Some Mentor</h1>
      <div>
        {JSON.stringify(mentor)}
      </div>
    </div>
  )
}
