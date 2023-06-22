import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import {  loadMentor, selectCurrentMentor } from '../features/mentors/mentor';
import Mentor from './Mentor';
import { selectMentors, loadMentors, isLoadingMentors } from "../features/mentors/list";
import Search from "./Search";
import { Link, useParams } from "react-router-dom";

export default function Mentors() {
  const dispatch = useDispatch();

  const isLoading = useSelector(isLoadingMentors);
  const mentors = useSelector(selectMentors);

  const selectedMentorId = useParams().mentorId
  const selectedMentor = useSelector(selectCurrentMentor)

  const scrollUp = (event) => {
    console.log(event)
    window.scrollTo(0, 0)
  }

  useEffect(() => {
    dispatch(loadMentors());
  }, [dispatch]);

  useEffect(() => {
    if (!selectedMentorId) return;

    scrollUp()
    dispatch(loadMentor(selectedMentorId));

  }, [selectedMentorId]);

  if (isLoading) {
    return (<p>Mentors are loading</p>)
  }
  return (
    <div>

      {selectedMentor && (<Mentor mentor={selectedMentor} />)}
      <section>
        <h1>Mentors</h1>

        <ul className="mentor-list">

          {mentors.length > 0 && mentors.map(mentor => (

            <Link to={`/mentors/${mentor.id}`}>
              <li key={mentor.id}>
                {mentor.title}
              </li>
            </Link>
          ))}
        </ul>
        <button onClick={scrollUp}>Scroll to Top</button>
        <Search />

      </section>

    </div>
  )
}
