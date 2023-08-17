import React from "react";
import { useSelector } from "react-redux";
import { Link, Outlet } from "react-router-dom";
import { selectCurrentUser, selectIsLoggedIn } from "../features/session/sessionSlice";

export default function Profile () {
  const currentUser = useSelector(selectCurrentUser)
  const loggedIn = useSelector(selectIsLoggedIn);
  
  // use loggedIn to return a Navigate

  return (
    <main>
      <h1>{loggedIn && currentUser.username}</h1>
      <Link to={`/profile`}>Edit</Link>
      <Outlet />
    </main>
  )
}
