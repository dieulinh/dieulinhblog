import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import { hasError, selectCourses, loadCourses, isLoadingCourses } from "../../features/courses/list";
import { Link, useLocation } from "react-router-dom";

import Loader from "../Loader";
import './List.css';

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
    <div className="container-center">
      <div className="mentors">
        <ul className="mentors-list">
          {courses.map(course => (
            <li key={course.id} className="mentor-item">
              <Link to={`/courses/${course.id}`}>
                <div>{course.course_name}</div>
              </Link>
              <div>
                <span> {course.created_at || "n/a"} </span>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
