import React, {useEffect, useContext, useState, useCallback} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { hasError, isLoadingCurrentMentor, loadMentor, selectCurrentMentor } from '../../features/mentors/mentor';
import Loader from '../Loader.js';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { UserContext } from '../../context/UserContext';
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
  const navigate = useNavigate();
  const mentor = useSelector(selectCurrentMentor);
  const booking = useSelector(selectCurrentBooking);
  const error = useSelector(hasError);
  const isLoading = useSelector(isLoadingCurrentMentor);
  const mentorId = useParams().mentorId
  const dispatch = useDispatch();
  const { currentUser, setCurrentUser } = useContext(UserContext);
  const [showMentorEvent, setShowMentorEvent] = useState(false);
  const [date, setDate] = useState();
  const [modalOpen, setModalOpen] = useState(false);
  const [modalIsOpen, setIsOpen] = useState(false);
  const [slot, setSlot] = useState('');
  const calculateSlot = useCallback(() => {
    dispatch(bookMentor({mentorId, slot, date}));
  },[date, slot]);
  
  const hours = Array.from({ length: 24 }, (_, index) => index); // Create an array of numbers from 0 to 23
  useEffect(() => {
    dispatch(loadMentor(mentorId));
  }, [dispatch, mentorId]);


  const handleHourChange = (event) => {
    if(!currentUser){
      navigate('/login')
    }
    console.log('event', event.target.value)
    setSlot(event.target.value);
  };
  useEffect(() => {
    if (!date) return;

  }, [date]);
  const handleBookEvent = (event) => {
    event.preventDefault()
    console.log('event', slot)
    dispatch(bookMentor({mentorId, slot, date}));
    closeModal()
  }
  const handleBookingSlot = (slot) => {
    console.log('slot', slot)
    // console.log('event', event.target.innerText)
    // const slot = parseInt(event.target.innerText.split(':')[0]);
    // setSlot(slot);
    dispatch(bookMentor({mentorId, slot, date}));
    closeModal()
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
    <div className='calendar-container'>
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
        <div className={"flex-container"}>
          <div className={"flex-row-end"}>
            <button className="left-side" onClick={closeModal}>close</button>
          </div>

          <div>{date&&date.dateStr}</div>
          <form>
            <h2>Book a slot</h2>
            <div className='time-slot'>
            {hours.map((hour) => (
                <div className='hour-slot'>
                  <span> {hour.toString().padStart(2, '0')}:00</span>
                  <button className="btn btn-book" onClick={() => handleBookingSlot(hour)}>Book</button>
                </div>
              ))}
            </div>
            {slot !== '' && (
              <p>You selected: {slot.toString().padStart(2, '0')}:00</p>
            )}
            <button onClick={handleBookEvent}>Book</button>

          </form>
        </div>
      </Modal>
      { showMentorEvent && <BookingPopup />}

    </div>
  )
}


