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
        {JSON.stringify()}
        <ul className="mentor-list">

          {mentors.length > 0 && mentors.map(mentor => (

            <li key={mentor.id}>
                <Link to={`/mentors/${mentor.id}`}>
                  <span>{mentor.first_name} {mentor.last_name}</span>
                </Link>
                <span>Specialization: {mentor.specialization || "n/a"} </span>
                <span>Experience Years: {mentor.experience_years}</span>
              </li>
          ))}
        </ul>
        <button onClick={scrollUp}>Scroll to Top</button>
        <Search />

      </section>

    </div>
  )
}
