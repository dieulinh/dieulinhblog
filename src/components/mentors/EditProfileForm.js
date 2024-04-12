import React, { useState, useEffect, useContext } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useQuery } from 'react-query';
import { useNavigate } from "react-router-dom";
import axios from '../../utils/axiosConfig';

import { UserContext } from '../../context/UserContext'
import { CountryDropdown } from 'react-country-region-selector'
import { loadUserMentor, isLoading, selectMentor} from "../../features/mentors/userMentorSlice";
import { loadMentor, isMentorLoading, selectCurrentMentor} from "../../features/mentors/loadMentorSlice";
import { updateMentor } from "../../features/mentors/updateMentorSlice";
import { exportMentor } from "../../features/mentors/exportMentorSlice";
const BASE_URL = process.env.REACT_APP_DEFAULT_API_URL
export default function EditProfileForm() {
  const dispatch = useDispatch();
  const mentor = useSelector(selectMentor)
  const isLoadingMentor = useSelector(isLoading);
  const navigate = useNavigate();
  const { currentUser, currentMentorId } = useContext(UserContext);
  // const { mydata, ismentorLoading, error } = useQuery(['myMentor',currentMentorId],loadMentor)

  const [formData, setFormData] = useState({});

  useEffect(() => {
    if(!currentUser) return;
    if(currentMentorId) {

      const response = axios.get(`/api/mentors/${currentMentorId}`);
      response.then(rsp => {
          setFormData(rsp.data.mentor)
        }
      )
    } else {
      // dispatch(loadUserMentor())
      if(!mentor) return;
      setFormData(mentor);
    }
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
  const downloadPdf = (url) => {
    axios.get(`${BASE_URL}${url}`, {responseType: 'arraybuffer'}).then((res) => {
     
        const fileUrl = window.URL.createObjectURL(new Blob([res.data]));
        const hiddenAnchor = document.createElement('a');
        hiddenAnchor.href = fileUrl;
        hiddenAnchor.download = 'my_downloaded_pdf.pdf';
        hiddenAnchor.click();
      }).catch(exc => {
        console.error(exc.response)
      })
    

   
   
   
    // link.href = url;
    //   link.setAttribute('download', 'resume.pdf');
  
    //   link.click(); 
    // Remove the element after use
    // responseType: 'arraybuffer'
    // axios.get(`${url}`, {responseType: 'arraybuffer'})
    // .then(res => {
    //   const url = window.URL.createObjectURL(new Blob([res.data]
    //     ,{type: "application/pdf"}))
    //   var link = document.createElement('a');
    //   link.href = url;
    //   link.setAttribute('download', 'resume.pdf');
    //   document.body.appendChild(link);
    //   link.click();
    // })
  };
  const handleExportProfile = () => {
    let rq = axios.post(`/api/pdf_export/`,{email: currentUser.email, mentor_id: currentMentorId});
    rq.then(rs => {
      console.log(rs)
      downloadPdf(rs.data.path)
    })
    // navigate(`/mentors/${mentorId}`)
  }
  if (isLoadingMentor) return <div>Loading</div>

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
            <button className="primary" onClick={handleExportProfile}>Export pdf</button>
          </div>
        </label>
      </div>
    </div>
  )
}
