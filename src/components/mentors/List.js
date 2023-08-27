import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import { hasError, selectMentors, loadMentors, isLoadingMentors } from "../../features/mentors/list";
import { Link, useLocation } from "react-router-dom";

import Loader from "../Loader";
import './List.css';
import MentorSearchForm from "./Search";



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
      <h3>Mentors</h3>
        <MentorSearchForm />
      <div className="mentors">
        <ul className="mentors-list">
          {mentors.map(mentor => (
            <li key={mentor.id} className="mentor-item">
              <Link to={`/mentors/${mentor.slug||mentor.id}`} key={mentor.id}>
                <div>{mentor.first_name} {mentor.last_name}</div>
              </Link>
              <div>
                <span>Teaches {mentor.specialization || "n/a"} </span>
                <span>Experience: {mentor.experience_years}</span>
                <span>Country: {mentor.country}</span>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
