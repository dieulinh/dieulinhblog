import React, { useState } from "react";
import { registerUser } from "../../features/auth/signupSlice";
import { useDispatch } from "react-redux";
import { useNavigate, Link } from 'react-router-dom';

export default function SignUp() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  // const [email, setEmail] = useState("");
  const dispatch = useDispatch();

  // Grab the navigate function
  const navigate = useNavigate();

  const handleSubmit = e => {
    e.preventDefault();
    dispatch(registerUser({ email, password, password_confirmation: passwordConfirmation }));
    navigate('/profile')
  }

  return (
    <section>
      <h1>Sign Up</h1>
      <form onSubmit={handleSubmit}>
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
          <div>
            <input
              id="password"
              value={password}
              type="password"
              onChange={(e) => setPassword(e.currentTarget.value)}
            />
          </div>
        </label>
        <label>
          Password confirmation
          <div>
            <input
              id="password"
              value={passwordConfirmation}
              type="password"
              onChange={(e) => setPasswordConfirmation(e.currentTarget.value)}
            />
          </div>
        </label>
        <button type="submit" className="btn primary">
          Sign Up
        </button>
        <Link to={'/login'}>Login</Link>
      </form>
    </section>
  );
}
