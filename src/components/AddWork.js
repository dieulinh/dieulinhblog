import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

export default function AddWork() {
  const dispatch = useDispatch();
  const currentMentor = useSelector((state) => state.mentors.currentMentor);
  const [message, setMessage] = useState('');

  const handleMessageChange = (event) => {
    console.log('handle')
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Perform the necessary logic to send the message to the current mentor

  };

  return (
    <div>
      <h2>Send Message</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="message">Work:</label>
          <textarea
            id="message"
            value={message}
            onChange={handleMessageChange}
          ></textarea>
        </div>
        <button type="submit">Add work</button>
      </form>
    </div>
  );
}
