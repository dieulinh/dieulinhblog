import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import { hasError, loadMentor, selectCurrentMentor } from '../features/mentors/mentor';

import Mentor from './Mentor';
import { selectMentors, loadMentors, isLoadingMentors } from "../features/mentors/list";
import Search from "./Search";
import { Link, useParams } from "react-router-dom";

export default function Mentors() {
  const dispatch = useDispatch();

  const isLoading = useSelector(isLoadingMentors);
  const mentors = useSelector(selectMentors);

  const selectedMentorId = useParams().mentorId
  const error = useSelector(hasError)

  useEffect(() => {
    dispatch(loadMentors());
  }, [dispatch]);

  useEffect(() => {
    if (!selectedMentorId) return;

    dispatch(loadMentor(selectedMentorId));

  }, [selectedMentorId]);

  if (isLoading) {
    return (<p>Mentors are loading</p>)
  }
  return (
    <div>
      {selectedMentorId && (<Mentor />)}
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
        <Search />

      </section>

    </div>
  )
}
