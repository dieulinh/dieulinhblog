import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { scheduleLesson } from '../../features/mentors/schedule';
// import { scheduleLesson } from '../actions/lessonActions';

function ScheduleLesson() {
  const dispatch = useDispatch();
  const currentMentor = useSelector((state) => state.mentors.currentMentor);
  const [lessonDate, setLessonDate] = useState('');

  const handleDateChange = (event) => {
    setLessonDate(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Dispatch the scheduleLesson action with the current mentor and lesson date
    dispatch(scheduleLesson(currentMentor, lessonDate));
    // Reset the form
    setLessonDate('');
  };

  return (
    <div>
      <h2>Schedule Lesson</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="lessonDate">Lesson Date:</label>
          <input
            type="date"
            id="lessonDate"
            value={lessonDate}
            onChange={handleDateChange}
          />
        </div>
        <button type="submit">Schedule</button>
      </form>
    </div>
  );
}

export default ScheduleLesson;