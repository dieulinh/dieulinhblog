import React, {useEffect, useContext, useState} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { hasError, isLoadingCurrentMentor, loadMentor, selectCurrentMentor } from '../../features/mentors/bookings';
import Loader from '../Loader.js';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { UserContext } from '../../context/UserContext';

import { loadBookings, isLoadingBookings, selectBookings } from "../../features/students/bookingsSlice";

export default function MyBookings() {

  const bookings = useSelector(selectBookings);
  const isLoading = useSelector(isLoadingBookings);

  const dispatch = useDispatch();
  const { currentUser, setCurrentUser } = useContext(UserContext);

  useEffect(() => {
    if (!currentUser) {
      return;
    }
    dispatch(loadBookings(currentUser.user_id))
  }, [currentUser])

  useEffect(() => {
    if(!bookings || bookings.length) {
      return;
    }

  }, [bookings]);

  if (isLoading)
    return <Loader />

  return (
    <>
      <h3>My Bookings</h3>
      { bookings && bookings.map(booking => (
        <div key={booking.id}>
          {booking.slot} <br />
          {booking.booking_date} {booking.mentor_id}
        </div>
      )
      )}
    </>
  )
}

