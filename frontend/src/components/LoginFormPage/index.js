import React, { useState } from 'react';
import * as sessionActions from '../../store/session';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, Redirect } from 'react-router-dom';
import './LoginForm.css';

function LoginFormPage() {
  const dispatch = useDispatch();
  const sessionUser = useSelector(state => state.session.user);
  const [credential, setCredential] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState([]);

  if (sessionUser) return <Redirect to="/" />;

  const handleSubmit = (e) => {
    e.preventDefault();
    return dispatch(sessionActions.login({ credential, password }))
      .catch(async (res) => {
        let data;
        try {
          data = await res.json();
        } catch {
          data = await res.text();
        }
        if (data?.errors) setErrors(data.errors);
        else if (data) setErrors([data]);
        else setErrors([res.statusText]);
      });
  }

  return (
    <div className='fontFamily' id='signInPage'>
      <form className="signInForm" onSubmit={handleSubmit}>
        <ul>
          {errors.map(error => <li key={error}>{error}</li>)}
        </ul>

        <h1 id='signIn'>Sign in</h1>
        <p id='signInDescription'>Stay updated on your professional world</p>

        <input
            type="text"
            value={credential}
            placeholder="Email or Phone"
            onChange={(e) => setCredential(e.target.value)}
            required
          />

        <input
            type="password"
            value={password}
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
            required
          />

        <NavLink to='/forgot' className='forgotSignup'>Forgot Password?</NavLink>

        <button type="submit" id='signInSubmit'>Sign in</button>
      </form>

      <div id='newTo'> New to LinkedIn? <NavLink to="/signup" className='forgotSignup' id='signUpIn'>Join now</NavLink> </div>
    </div>
  );
}

export default LoginFormPage;