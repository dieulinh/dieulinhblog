import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectCurrentUser, setCurrentUser as setUserInRedux } from '../features/session/sessionSlice';
import { loadUser } from '../features/auth/localStorage';

export const UserContext = React.createContext();

export const CurrentUser = ({ children }) => {
  let [currentUser, setCurrentUser] = useState(null);
  let [currentMentorId, setCurrentMentorId] = useState(null);

  const user = useSelector(selectCurrentUser);
  const dispatch = useDispatch();

  useEffect(() => {
    if (user && user.email) {
      setCurrentUser(user)
      setCurrentMentorId(user.mentor_id);
      return
    }

    let storedUser = loadUser();
    if (storedUser && storedUser.token) {
      dispatch(setUserInRedux(storedUser))
    } else {
      setCurrentUser(null)
    }
  }, [user])

  return (
    <UserContext.Provider value={{ currentUser, currentMentorId }}>
      {children}
    </UserContext.Provider>
  );
}
