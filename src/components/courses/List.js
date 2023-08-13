import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import { hasError, selectCourses, loadCourses, isLoadingCourses } from "../../features/courses/list";
import { Link, useLocation } from "react-router-dom";

import Loader from "../Loader";



export default function Courses() {
  const dispatch = useDispatch();

  // use search reducer

  const isLoading = useSelector(isLoadingCourses);
  const courses = useSelector(selectCourses);

  const error = useSelector(hasError);
  const location = useLocation();

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    dispatch(loadCourses(queryParams));
  }, [dispatch, location]);


  if (isLoading) {
    return (<Loader />)
  }
  return (
    <div>
      <h1>Courses</h1>

      <div className="mentors">
        <ul className="mentors-list">
          {courses.map(mentor => (
            <li key={mentor.id} className="mentor-item">
              <Link to={`/courses/${mentor.slug}`}>
                <div>{mentor.course_name} {mentor.last_name}</div>
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
