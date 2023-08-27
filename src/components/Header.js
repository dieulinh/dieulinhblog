import React, { useContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import { CurrentUser, UserContext } from "../context/UserContext";
import { logOut } from "../features/session/sessionSlice"

// Import the NavLink component.
import { NavLink, Outlet } from 'react-router-dom';

export default function Header() {  
  const { currentUser } = useContext(UserContext);
  const dispatch = useDispatch();
  const handleLogout = e => {
    dispatch(logOut())
  }

  // Replace the 4 <a> tags with <NavLink> components
  return (
    <div className="header">
      <div className={"left-nav-bar"}>
        <NavLink to="/" height={70} alt="">iMentor</NavLink>

        <NavLink to="/mentors">Mentors</NavLink>
        <NavLink to="/courses">Courses</NavLink>
        <NavLink to="/articles">Articles</NavLink>
      </div>
      <div className={"right-nav-bar"}>
        {
          currentUser && currentUser.email
            ?
            (
              <>
                <NavLink to="/profile" className="profile-link">profile</NavLink>
                <NavLink to="/mybookings" className="profile-link">my bookings</NavLink>
                <button onClick={handleLogout} className="btn user-btn"> Log Out </button>
              </>
            )
            : <NavLink to="/login" className="user-btn">Login</NavLink>
        }
      </div>
    </div>
  )
}
