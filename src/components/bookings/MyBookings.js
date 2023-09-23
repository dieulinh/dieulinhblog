import React, {useEffect, useContext, useState} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { hasError, isLoadingCurrentMentor, loadMentor, selectCurrentMentor } from '../../features/mentors/bookings';
import Loader from '../Loader.js';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { UserContext } from '../../context/UserContext';

import { loadBookings, isLoadingBookings, selectBookings } from "../../features/students/bookingsSlice";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import { formatDate } from '@fullcalendar/core';
import interactionPlugin from "@fullcalendar/interaction";
import momentTimezonePlugin from "@fullcalendar/moment-timezone";

export default function MyBookings() {

  const bookings = useSelector(selectBookings);
  const isLoading = useSelector(isLoadingBookings);

  const dispatch = useDispatch();
  const { currentUser, setCurrentUser } = useContext(UserContext);
  const [bookedEvents, setBookedEvents] = useState();
  const [eventInfoEvents, setEventInfoEvents] = useState();
  // const handleDateClick = (e) => {
  //   console.log(e)
  // };
  const handleEventClk = (info) => {
    info.jsEvent.preventDefault(); // don't let the browser navigate
    if (info.event.url) {
      window.open(info.event.url);
    }
  }
  const renderEventContent = (eventInfo) => {
    return (
      <>
        <b>{eventInfo.timeText}</b>
        <i>{eventInfo.event.title}</i>
      </>
    )
  }

  useEffect(() => {
    if (!currentUser) {
      return;
    }
    dispatch(loadBookings(currentUser.user_id))
  }, [currentUser])

  useEffect(() => {
    if(!bookings || !bookings.length) {
      return;
    }

    setBookedEvents(bookings.map(book => {
      return {title: book.mentor.first_name, date:  book.booking_date, interactive: true, color: 'red', url: `/mentors/${book.mentor.id}`}
    }))

  }, [bookings]);

  if (isLoading)
    return <Loader />


  return (
    <>
      <h3>My Bookings</h3>
      {bookings.length && <FullCalendar
        timeZone={"UTC"}
        plugins={[ dayGridPlugin, interactionPlugin, momentTimezonePlugin]}
        initialView="dayGridMonth"

        events={bookedEvents}
        eventClick={handleEventClk}
      />}
      <ul>
      { bookings && bookings.map(booking => (
          <li key={booking.id}>
            <span>Time: {booking.slot} : 00</span><br />
            Date: {booking.booking_date} {booking.mentor.first_name}
          </li>
        )
      )}

      </ul>


    </>
  )
}

