import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import axios from '../utils/axiosConfig';
import { useParams } from "react-router-dom";

export default function AddWork() {
  const dispatch = useDispatch();
  const currentMentor = useSelector((state) => state.mentors.currentMentor);
  const [message, setMessage] = useState('');
  const [formData, setFormData] = useState({})
  const mentorId = useParams().mentorId;

  const handleChange = (evt) => {
    console.log('handle')
    const { name, value } = evt.target;
    setFormData(f => ({
      ...f,
      [name]: value,
    }));
  };
  const handleStartDate = (val) => {
    console.log(val)
    setFormData(f => ({
      ...f,
      ["start_date"]: val,
    }));
  }
  const handleSubmit = (event) => {
    event.preventDefault();
    // Perform the necessary logic to send the message to the current mentor
    axios.post(`/api/mentors/${mentorId}/works`, formData).then(
      (rs) => {
        console.log(rs)
      }
    )

  };

  return (
    <div>
      <h2>Send Message</h2>
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
          <label htmlFor="responsibilities">Work:</label>
          <textarea
            id="message"
            value={formData.responsibilities}
            onChange={handleChange}
          ></textarea>
        </div>
        <button type="submit">Add work</button>
      </form>
    </div>
  );
}
