import React, {useState, useEffect, useContext} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams, useNavigate } from "react-router-dom";

import { UserContext } from '../../context/UserContext'
import { CountryDropdown } from 'react-country-region-selector'
import { loadUserMentor, isLoading, selectMentor} from "../../features/mentors/userMentorSlice";
export default function EditProfileForm() {
  const dispatch = useDispatch();
  const mentor = useSelector(selectMentor)
  const isLoadingMentor = useSelector(isLoading);

  const { currentUser, setCurrentUser } = useContext(UserContext);

  const [formData, setFormData] = useState({});

  useEffect(() => {
    if(!currentUser) return;
    console.log('user___', currentUser)
    dispatch(loadUserMentor())
  }, [currentUser, dispatch])

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
    // dispatch(updateMentor(formData))
    // navigate(`/mentors/${mentorId}`)
  }

  if (isLoadingMentor) {
    return <p>Loading data</p>
  }
  if (!mentor) {
    return
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
              value={mentor.first_name}
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
              value={mentor.last_name}
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
              value={mentor.phone}
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
              value={mentor.specialization}
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
              value={mentor.hourly_rate}
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
              value={mentor.bio}
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
              value={mentor.experience_years}
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
              value={mentor.country}
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
              value={mentor.email}
              onChange={handleChange}
            />
            <button className="primary" onClick={handleUpdateMentor}>Update</button>
          </div>
        </label>
      </div>
    </div>
  )
}
