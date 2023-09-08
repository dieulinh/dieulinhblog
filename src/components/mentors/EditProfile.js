import React, {useState, useEffect, useContext} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams, useNavigate } from "react-router-dom";
import { hasError, isLoadingCurrentMentor, selectCurrentMentor, loadMentor } from '../../features/mentors/mentor';

import {isUpdating, selectMentor, updateMentor} from '../../features/currentMentor/editMentorSlice';
import {UserContext} from '../../context/UserContext'
import { CountryDropdown } from 'react-country-region-selector'
export default function EditMentorForm() {
  const navigate = useNavigate()
  const dispatch = useDispatch();
  const mentor = useSelector(selectCurrentMentor)
  const isLoadingMentor = useSelector(isLoadingCurrentMentor);
  const mentorId = useParams().mentorId;
  const { currentUser, setCurrentUser } = useContext(UserContext);

  const [formData, setFormData] = useState({});
  useEffect(() => {
    dispatch(loadMentor(mentorId));
  }, [dispatch, mentorId])
  useEffect(() => {
    if(!mentor) return;
    setFormData(mentor)
  }, [mentor])
  const handleChange = (evt) => {
    const { name, value } = evt.target;
    setFormData(f => ({
      ...f,
      [name]: value,
    }));
  }
  const handleCountry = (evt) => {
    setFormData(f => ({
      ...f,
      country: evt
    }));
  }
  const handleUpdateMentor = () => {
    dispatch(updateMentor(formData))
    navigate(`/mentors/${mentorId}`)
  }

  if (isLoadingMentor) {
    return <p>Loading data</p>
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
              name="firstName"
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
              name="lastName"
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
              name={"phone"}
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
              name={"specialization"}
              value={formData.specialization}
              onChange={handleChange}
            />
          </div>
        </label>
        <label>
          hourly rate
          <div>
            <input
              id="hourly_rate"
              name={"hourly_rate"}
              value={formData.hourlyRate}
              onChange={handleChange}
            />
          </div>
        </label>
        <label>
          bio
          <div>
            <input
              id="bio"
              name={"bio"}
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
              name={"experienceYears"}
              value={formData.experienceYears}
              onChange={handleChange}
            />
          </div>
        </label>
        <label>
          country
          <div>
            <CountryDropdown
              classes='country-dropdown'
              defaultOptionLabel="Any Country"
              value={formData.country}
              name={"country"}
              valueType='short'
              onChange={handleCountry} />
          </div>
        </label>
        <label>
          email
          <div>
            <input
              id="email"
              name={"email"}
              value={formData.email}
              onChange={handleChange}
            />
            <button className="primary" onClick={handleUpdateMentor}>Update</button>
          </div>
        </label>
      </div>
    </div>
  )
}
