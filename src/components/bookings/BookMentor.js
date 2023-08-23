import React, {useEffect, useContext, useState} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { hasError, isLoadingCurrentMentor, loadMentor, selectCurrentMentor } from '../../features/mentors/mentor';
import Loader from '../Loader.js';
import { Link, useParams } from 'react-router-dom';
import {UserContext} from '../../context/UserContext';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from "@fullcalendar/interaction"
import { bookMentor, isLoadingBooking, selectCurrentBooking } from "../../features/mentors/book-mentor";

import Modal from 'react-modal'

// mentor search initialState
const customStyles = {
  content: {
    top: '20%',
    left: '30%',
    right: 'auto',
    bottom: 'auto',
    height: '470px',
    marginRight: '-50%',
    width: '40%',
    zIndex: 10
  },
};
Modal.setAppElement('#root');
export default function BookMentor () {
  const mentor = useSelector(selectCurrentMentor)
  const booking = useSelector(selectCurrentBooking)
  const error = useSelector(hasError)
  const isLoading = useSelector(isLoadingCurrentMentor)
  const mentorId = useParams().mentorId
  const dispatch = useDispatch();
  const { currentUser, setCurrentUser } = useContext(UserContext);
  const [showMentorEvent, setShowMentorEvent] = useState(false);
  const [date, setDate] = useState();
  const [modalOpen, setModalOpen] = useState(false);
  const [modalIsOpen, setIsOpen] = useState(false);
  const [slot, setSlot] = useState('');

  const hours = Array.from({ length: 24 }, (_, index) => index); // Create an array of numbers from 0 to 23
  useEffect(() => {
    dispatch(loadMentor(mentorId));
  }, [dispatch, mentorId]);

  useEffect(() => {
    if(booking) return;

    if (booking) {
      closeModal()
    }
  }, [booking]);
  const handleHourChange = (event) => {
    setSlot(event.target.value);
  };
  useEffect(() => {
    if (!date) return;

  }, [date]);
  const handleBookEvent = (event) => {
    event.preventDefault()

    dispatch(bookMentor({mentorId, slot, date}));

  }


  if (isLoading) {
    return (<Loader />)
  }
  if (error) {
    return <div>
      Error loading mentor.
    </div>
  }
  if (!mentor) {
    return
  }

  const handleDateClick = (e) => {
    setDate(e.dateStr)
    openModal();
  };
  const openModal = () => {
    setIsOpen(true);
  }

  const afterOpenModal = () => {
    // references are now sync'd and can be accessed.
    //subtitle.style.color = '#f00';
  }

  const closeModal = () => {
    setIsOpen(false);
  }

  const BookingPopup = () => {
    return <div className="modal"><h2>This is a popup {date&&date.dateStr} </h2></div>
  }
  return (
    <div className='mentor-container'>
      <FullCalendar
        timeZone={"local"}
        plugins={[ dayGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        dateClick={handleDateClick}
      />
      <Modal
        isOpen={modalIsOpen}
        onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
        overlayClassName="Overlay"
      >
        <button onClick={closeModal}>close</button>
        <div>{date&&date.dateStr}</div>
        <form>
          <label htmlFor="hour-select">Select an Hour:</label>
          <select id="hour-select" value={slot} onChange={handleHourChange}>
            <option value="">Select</option>
            {hours.map((hour) => (
              <option key={hour} value={hour}>
                {hour.toString().padStart(2, '0')}:00
              </option>
            ))}
          </select>
          {slot !== '' && (
            <p>You selected: {slot.toString().padStart(2, '0')}:00</p>
          )}
          <button onClick={handleBookEvent}>Book</button>

        </form>
      </Modal>
      { showMentorEvent && <BookingPopup />}

    </div>
  )
}


