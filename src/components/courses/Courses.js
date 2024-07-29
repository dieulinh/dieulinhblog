import React, { useContext, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import { hasError, selectCourses, loadMyCourses, isLoadingCourses } from "../../features/courses/mycourses";
import { Link, useLocation } from "react-router-dom";

import Loader from "../Loader";
import { UserContext } from "../../context/UserContext";


export default function Courses() {
  const dispatch = useDispatch();

  // use search reducer
  const { currentUser }  = useContext(UserContext)

  const isLoading = useSelector(isLoadingCourses);
  const courses = useSelector(selectCourses);

  const error = useSelector(hasError);
  const location = useLocation();

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    if (currentUser) {
      queryParams.append('user_id', currentUser.user_id); 
    }
    
    dispatch(loadMyCourses(queryParams));
  }, [dispatch, currentUser]);


  if (isLoading) {
    return (<Loader />)
  }
  return (
    <div className="container-center">
      <div className="mentors">
        <ul className="mentors-list">
          {courses.map(course => (
            <li key={course.id} className="mentor-item">
              <Link to={`/learn/${course.id}`}>
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
