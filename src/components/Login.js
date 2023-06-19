import React, { useState, useEffect } from "react";

import { loginUser } from "../features/auth/authSlice";
import {selectIsLoggedIn, selectCurrentUser, isLoggedInHasError,isLoading } from "../features/auth/authSlice";

import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from 'react-router-dom';

export default function Login () {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const user = useSelector(selectCurrentUser);
  const authIsLoading = useSelector(isLoading)
  const hasError = useSelector(isLoggedInHasError)

  // Grab the navigate function
  const navigate = useNavigate();

  useEffect(() => {
    if(!user) {
      return;
    }

    if(user.token) {
      navigate('/articles')
    }
  }, [user])
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(loginUser({ email, password }));
  }

  if(authIsLoading) {
    return <p> Logging in</p>
  }

  return (
    <section>
      <h1>Login</h1>
      <form>
        {hasError && (<p>Wrong email or password</p>)}
        <label>
          Username
          <div>
            <input
              id="username"
              value={email}
              onChange={(e) => setEmail(e.currentTarget.value)}
            />
          </div>
        </label>
        <label>
          Password
          <input
            id="password" type="password"
            value={password}
            onChange={(e) => setPassword(e.currentTarget.value)} />
        </label>
        <button type="submit" className="primary" onClick={handleSubmit}>
          Log In
        </button>
      </form>
    </section>
  );
}
