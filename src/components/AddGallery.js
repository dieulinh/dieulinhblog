import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import axios from '../utils/axiosConfig';
import { Link, useParams, useNavigate } from "react-router-dom";

export default function AddGallery() {
  const dispatch = useDispatch();
  const navigate = useNavigate()

  const [message, setMessage] = useState('');
  const [formData, setFormData] = useState({})
  const mentorId = useParams().mentorId;

  const handleChange = (evt) => {
    const { name, value } = evt.target;
    setFormData(f => ({
      ...f,
      [name]: value,
    }));
  };

  const onFileChange = (event) => {
    if(event.target.files) {
      setFormData(f => ({
        ...f,
        ["image"]: event.target.files[0]
      }));
      console.log(formData)
    }

    console.log(event.target.files[0])

  }
  const handleSubmit = (event) => {
    event.preventDefault();
    // Perform the necessary logic to send the message to the current mentor
    axios.post(`/api/mentors/${mentorId}/gallery`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    }).then(
      (rs) => {
        console.log(rs)
        navigate(`/mentors/${mentorId}`)
      }
    )
  };
  const onFileUpload = (event) => {

  }

  return (
    <div>
      <h2>Add work gallery</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>
            title
            <div>
              <input
                id="title"
                name="title"
                value={formData.title}
                onChange={handleChange}
              />
            </div>
          </label>
          <label>
            gallery description
            <div>
              <input
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
              />
            </div>
          </label>
          <div>
            <input type="file"
                   name="image" onChange={onFileChange} />
          </div>


        </div>
        <button type="submit">Add work</button>
      </form>
    </div>
  );
}
