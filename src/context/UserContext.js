import React, { useState } from 'react';
export const UserContext = React.createContext();
export const CurrentUser = ({children}) => {
  let [currentUser, setCurrentUser] = useState(null);
  return (
    <UserContext.Provider value={{currentUser, setCurrentUser}}>
      {children}
    </UserContext.Provider>
  );
}
