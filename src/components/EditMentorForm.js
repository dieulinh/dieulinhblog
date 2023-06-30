import React, { useState, useEffect} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useParams } from "react-router-dom";
import { hasError, selectCurrentMentor, loadMentor } from '../features/mentors/mentor';

export default function EditMentorForm() {
  const dispatch = useDispatch();
  const mentor = useSelector(selectCurrentMentor)
  const error = useSelector(hasError)
  const [firstName, setFirstName] = useState()
  const [lastName, setLastName] = useState()
  const selectedMentorId = useParams().mentorId;
  useEffect(() => {
    dispatch(loadMentor(selectedMentorId));
    if (mentor) {
      setFirstName(mentor.firstName);
      setLastName(mentor.lastName)
    }
  }, [dispatch])
  if (error) {
    return <div>
      Error loading mentor.
    </div>
  }
  if (!mentor) {
    return
  }
  // const {
  //   id,
  //   firstName,
  //   lastName,
  //   email,
  //   phone,
  //   address,
  //   specialization,
  //   experienceYears,
  //   bio,
  //   createdAt,
  //   updatedAt,
  // } = mentor

  return (
    <div className='mentor-container'>
      <h1 className='mentor-title'>Update</h1>
      <div>
      <label>
          first name
          <div>
            <input
              id="first_name"
              value={firstName}
              onChange={(e) => setFirstName(e.currentTarget.value)}
            />
          </div>
        </label>
        <label>
          last name
          <div>
            <input
              id="last_name"
              value={lastName}
              onChange={(e) => setLastName(e.currentTarget.value)}
            />
            <button className="primary">Update</button>
          </div>
        </label>
      </div>
    </div>
  )
}
