import React, { useState, useEffect} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useParams } from "react-router-dom";
import { hasError, selectCurrentMentor, loadMentor } from '../features/mentors/mentor';

export default function EditMentorForm() {
  const dispatch = useDispatch();
  const mentor = useSelector(selectCurrentMentor)
  const error = useSelector(hasError)
  const selectedMentorId = useParams().mentorId;
  const [formData, setFormData] = useState({
  });
  function handleChange(evt) {
    const { name, value } = evt.target;
    setFormData(f => ({
      ...f,
      [name]: value,
    }));
  }
  const handleUpdateMentor = () => {

  }
  useEffect(() => {
    dispatch(loadMentor(selectedMentorId));
  }, [dispatch])
  useEffect(() => {
    if (!mentor) {
      return;
    }
    setFormData(mentor)
  }, [mentor])
  if (error) {
    return <div>
      Error loading mentor.
    </div>
  }
  if (!mentor) {
    return <></>
  }

  return (
    <div className='mentor-container'>
      <h1 className='mentor-title'>Update</h1>
      <div>
      <label>
          first name
          <div>
            <input
              id="first_name"
              value={formData.firstName}
              onChange={handleChange}
            />
          </div>
        </label>
        <label>
          last name
          <div>
            <input
              id="lastName"
              value={formData.lastName}
              onChange={handleChange}
            />
          </div>
        </label>
        <label>
          phone
          <div>
            <input
              id="phone"
              value={formData.phone}
              onChange={handleChange}
            />
          </div>
        </label>
        <label>
          specialization
          <div>
            <input
              id="specialization"
              value={formData.specialization}
              onChange={handleChange}
            />
          </div>
        </label>
        <label>
          bio
          <div>
            <input
              id="bio"
              value={formData.bio}
              onChange={handleChange}
            />
          </div>
        </label>
        <label>
          experience years
          <div>
            <input
              id="experienceYears"
              value={formData.experienceYears}
              onChange={handleChange}
            />
          </div>
        </label>
        <label>
          country
          <div>
            <input
              id="country"
              value={formData.country}
              onChange={handleChange}
            />
          </div>
        </label>
        <label>
          email
          <div>
            <input
              id="email"
              value={formData.email}
              onChange={handleChange}
            />
            <button className="primary">Update</button>
          </div>
        </label>

      </div>
    </div>
  )
}
