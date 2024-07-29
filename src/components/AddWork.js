import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import axios from '../utils/axiosConfig';
import { Link, useParams, useNavigate } from "react-router-dom";


export default function AddWork() {
  const navigate = useNavigate();

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
  const handleStartDate = (val) => {
    setFormData(f => ({
      ...f,
      ["start_date"]: val,
    }));
  }
  const handleEndDate = (val) => {
    setFormData(f => ({
      ...f,
      ["end_date"]: val,
    }));
  }
  const handleSubmit = (event) => {
    event.preventDefault();
    // Perform the necessary logic to send the message to the current mentor
    axios.post(`/api/mentors/${mentorId}/works`, formData).then(
      (rs) => {
        console.log(rs)
        navigate(`/mentors/${mentorId}`)
      }
    )

  };

  return (
    <div>
      <h2>Add work experience</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>
            company name
            <div>
              <input
                id="company_name"
                name="company_name"
                value={formData.company_name}
                onChange={handleChange}
              />
            </div>
          </label>
          <label htmlFor="start_date">Start date</label>
          <DatePicker format="MM/DD/YYYY" onChange={handleStartDate}/>
          <label htmlFor="end_date">End date</label>
          <DatePicker format="MM/DD/YYYY" onChange={handleEndDate}/>
          <label htmlFor="responsibilities">Responsibilities:</label>
          <textarea
            id="responsibilities"
            name="responsibilities"
            value={formData.responsibilities}
            onChange={handleChange}
          ></textarea>
        </div>
        <button type="submit">Add work</button>
      </form>
    </div>
  );
}
