import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { sendMessage } from '../features/mentors/messages';
// import './SendMessage.css';

function SendMessage() {
  const dispatch = useDispatch();
  const currentMentor = useSelector((state) => state.mentors.currentMentor);
  const [message, setMessage] = useState('');

  const handleMessageChange = (event) => {
    setMessage(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Perform the necessary logic to send the message to the current mentor
    dispatch(sendMessage({ mentorId: currentMentor.id, content: message }));
    // Reset the form
    setMessage('');
  };

  return (
    <div>
      <h2>Send Message</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="message">Message:</label>
          <textarea
            id="message"
            value={message}
            onChange={handleMessageChange}
          ></textarea>
        </div>
        <button type="submit">Send</button>
      </form>
    </div>
  );
}

export default SendMessage;