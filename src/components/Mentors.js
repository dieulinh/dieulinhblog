import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import { hasError, loadMentor, selectCurrentMentor } from '../features/mentors/mentor';

import Mentor from './MentorProfile';
import { selectMentors, loadMentors, isLoadingMentors } from "../features/mentors/list";
import Search from "./Search";
import { Link, useParams, useLocation } from "react-router-dom";

import './Mentors.css'
import Loader from "./Loader";

export default function Mentors() {
  const dispatch = useDispatch();

  const isLoading = useSelector(isLoadingMentors);
  const mentors = useSelector(selectMentors);

  const error = useSelector(hasError);
  const location = useLocation();

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    dispatch(loadMentors(queryParams));
  }, [dispatch]);


  if (isLoading) {
    return (<Loader />)
  }
  return (
    <div>
      <h1>Mentors</h1>
      <Search />
      <div className="mentors">
        <ul className="mentors-list">
          {mentors.map(mentor => (
            <li key={mentor.id}>
              <Link to={`/mentors/${mentor.id}`}>
                <div>{mentor.first_name} {mentor.last_name}</div>
              </Link>
              <span>Teaches {mentor.specialization || "n/a"} </span>
              <span>Experience: {mentor.experience_years}</span>
              <span>Country: {mentor.country}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
