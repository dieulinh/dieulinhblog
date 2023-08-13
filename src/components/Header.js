import React, { useContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import { CurrentUser, UserContext } from "../context/UserContext";
// import { selectCurrentUser, logOut } from "../features/session/sessionSlice"

// Import the NavLink component.
import { NavLink, Outlet } from 'react-router-dom';

export default function Header() {
  // const currentUser = useContext(CurrentUser)
  const { currentUser, setCurrentUser } = useContext(UserContext);
  const dispatch = useDispatch();

  const handleLogout = e => {
    // dispatch(logOut())
    console.log('Logout')
  }

  // Replace the 4 <a> tags with <NavLink> components
  return (
    <div className="header">
      <div className={"left-nav-bar"}>
        <img src="logo192.png" height={70} alt="" />
        <NavLink to="/articles">Articles</NavLink>
        <NavLink to="/mentors">Mentors</NavLink>
        <NavLink to="/courses">Courses</NavLink>
      </div>

      {
        currentUser && currentUser.email
          ?
          (
            <div className={"right-nav-bar"}>

              <NavLink to="/profile" className="btn user-btn">Profile</NavLink>
              <button onClick={handleLogout} className="btn user-btn"> Log Out </button>
            </div>
          )
          : <NavLink to="/login" className="user-btn">Login</NavLink>
      }

    </div>
  )
}
