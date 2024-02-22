import React, { useState, useEffect, useContext } from "react";

import { loginUser } from "../../features/auth/authSlice";
import { isLoggedInHasError, isLoading } from "../../features/auth/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from 'react-router-dom';
import { selectIsLoggedIn } from "../../features/session/sessionSlice";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const authIsLoading = useSelector(isLoading)
  const hasError = useSelector(isLoggedInHasError)

  // Grab the navigate function
  const navigate = useNavigate();
  useEffect(() => {
    if (isLoggedIn) {
      navigate('/profile')
    }
  }, [isLoggedIn])

  const handleSubmit = (e) => {
    e.preventDefault()
    dispatch(loginUser({ email, password }))
  }

  if (authIsLoading) {
    return <p>Logging in</p>
  }

  return (
    <section>
      <h1>Login</h1>
      <form>
        {hasError && (<p>Wrong email or password</p>)}
        <div className="form-group">
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
        </div>
        
        <div className="form-group">
          <label>
            Password
            <div>
              <input
                id="password" type="password"
                value={password}
                autoComplete="on"
                onChange={(e) => setPassword(e.currentTarget.value)} />
            </div>
            
          </label>
        </div>
        <button type="submit" className="primary" onClick={handleSubmit}>
          Log In
        </button>
        <Link to={'/sign-up'}>Sign Up</Link>
      </form>
    </section>
  );
}
