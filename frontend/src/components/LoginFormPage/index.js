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
    <div className='signInPage'>
      <form className="signInForm" onSubmit={handleSubmit}>
        <ul>
          {errors.map(error => <li key={error}>{error}</li>)}
        </ul>

        <h1 className='fontFamily' id='signIn'>Sign in</h1>
        <p className='fontFamily' id='signInDescription'>Stay updated on your professional world</p>

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

        <NavLink to='/forgot' className='fontFamily' id='forgotPassword'>Forgot Password?</NavLink>

        <button type="submit" className='fontFamily' id='signInSubmit'>Sign in</button>
      </form>

      <p className='fontFamily'> New to LinkedIn? </p>
    </div>
  );
}

export default LoginFormPage;