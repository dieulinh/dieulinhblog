import React, { useState } from "react";
// import { editUser } from "../features/session/sessionSlice";
import { useDispatch } from "react-redux";

export default function EditProfileForm() {
  const [username, setUsername] = useState("");
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();

    // TODO: use edit user endpoint 
    // call the setCurrentUser action in session/sessionSlice    
    // or make an editUser action in session/sessionSlice
    
    // old way: dispatch(editUser({ username: username }));
  };

  return (
    <section>
      <h2>Edit Username</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Username
          <div>
            <input
              id="username"
              value={username}
              onChange={(e) => setUsername(e.currentTarget.value)}
            />
            <button className="primary">Edit</button>
          </div>
        </label>
      </form>
    </section>
  );
}
