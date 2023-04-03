import React, { useState } from 'react';
import * as sessionActions from '../../store/session';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, Redirect } from 'react-router-dom';
import './ForgotPage.css';
import background from '../HomePage/HomePage.svg'

function ForgotPage() {
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
    <div className='fontFamily' id='homePage'>
        <div className='signIn'>
            <form onSubmit={handleSubmit} className='homeLogin'>
                <ul>
                    {errors.map(error => <li key={error}>{error}</li>)}
                </ul>

                <h1 id='homeHeading'>Welcome to your professional community</h1>

                <label className='homeLabel'>
                    Email or phone
                </label>
                <input
                    type="text"
                    value={credential}
                    onChange={(e) => setCredential(e.target.value)}
                    required
                />

                <label className='homeLabel'>
                    Password
                </label>
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />

                <NavLink to='/forgot' className='forgotSignup' id='homeSignIn'>Forgot Password?</NavLink>
                <button type="submit" id='signInSubmit'>Sign in</button>
            </form>
        </div>
        <img src={background} alt='background' id='homeImg'></img>
    </div>
  );
}

export default ForgotPage;