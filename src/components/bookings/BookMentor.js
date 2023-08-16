import React, { useEffect, useContext } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { hasError, isLoadingCurrentMentor, loadMentor, selectCurrentMentor } from '../../features/mentors/mentor';
import Loader from '../Loader.js';
import { Link, useParams } from 'react-router-dom';
import {UserContext} from '../../context/UserContext';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from "@fullcalendar/interaction"
import {editUser} from "../../features/session/sessionSlice";

// mentor search initialState


export default function BookMentor () {

  const mentor = useSelector(selectCurrentMentor)
  const error = useSelector(hasError)
  const isLoading = useSelector(isLoadingCurrentMentor)
  const mentorId = useParams().mentorId
  const dispatch = useDispatch();
  const { currentUser, setCurrentUser } = useContext(UserContext);


  useEffect(() => {
    dispatch(loadMentor(mentorId));
  }, [dispatch, mentorId]);


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

    console.log(e)
  };
  return (
    <div className='mentor-container'>
      <FullCalendar
        plugins={[ dayGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        dateClick={handleDateClick}
      />
    </div>
  )
}


