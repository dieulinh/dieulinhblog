import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import { hasError, selectMentors, loadMentors, isLoadingMentors } from "../features/mentors/list";
import { Link, useLocation } from "react-router-dom";

import Loader from "./Loader";
import './Mentors.css';
import MentorSearchForm from "./MentorSearch";



export default function Mentors() {
  const dispatch = useDispatch();

  // use search reducer
  

  const isLoading = useSelector(isLoadingMentors);
  const mentors = useSelector(selectMentors);

  const error = useSelector(hasError);
  const location = useLocation();

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    dispatch(loadMentors(queryParams));
  }, [dispatch, location]);


  if (isLoading) {
    return (<Loader />)
  }
  return (
    <div>
      <h1>Mentors</h1>
        <MentorSearchForm />
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
