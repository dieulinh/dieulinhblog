import React, { useState, useEffect, useContext } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from "react-router-dom";

import { UserContext } from '../../context/UserContext'
import { CountryDropdown } from 'react-country-region-selector'
import { loadUserMentor, isLoading, selectMentor} from "../../features/mentors/userMentorSlice";
import { updateMentor } from "../../features/mentors/updateMentorSlice";
export default function EditProfileForm() {
  const dispatch = useDispatch();
  const mentor = useSelector(selectMentor)
  const isLoadingMentor = useSelector(isLoading);
  const navigate = useNavigate();
  const { currentUser } = useContext(UserContext);

  const [formData, setFormData] = useState({});

  useEffect(() => {
    if(!currentUser) return;

    dispatch(loadUserMentor())
    if(!mentor) return;
    setFormData(mentor);
  }, [dispatch, currentUser])

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
    navigate(`/mentors/${mentor.id}`)
  }

  if (isLoadingMentor) {
    return <p>Loading data</p>
  }
  if (!formData) {
    return
  }
  return (
    <div className='mentor-container'>
      <h1 className='mentor-title'>my profile</h1>
      <div>
        <label>
          first name
          <div>
            <input
              id="first_name"
              name="first_name"
              value={formData.first_name}
              onChange={handleChange}
            />
          </div>
        </label>
        <label>
          last name
          <div>
            <input
              id="lastName"
              name="last_name"
              value={formData.last_name}
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
              value={formData.hourly_rate}
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
              name={"experience_years"}
              value={formData.experience_years}
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
