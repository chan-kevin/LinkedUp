import React, { useState } from 'react';
import * as sessionActions from '../../store/session';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, Redirect } from 'react-router-dom';
import './HomePage.css';
import background from './HomePage.svg'
import google from './google_logo.png'

function HomePage() {
  const dispatch = useDispatch();
  const sessionUser = useSelector(state => state.session.user);
  const [credential, setCredential] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState([]);

  if (sessionUser) return <Redirect to="/" />;

//   const ele = document.getElementById('headBackground');
//   ele.style.backgroundColor = 'white';

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
    <div id='homeColor'>
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
                <div id='homeBorder'><button type="submit" className='signInSubmit' id='homeSign'>Sign in</button></div>
                <button type="submit" className='signInSubmit' id='homeGoogle'> <img src={google} id='google'/> Sign in with Google</button>
                <NavLink to='/signup' className='signInSubmit' id='homeNew'>New to LinkedIn? Join now</NavLink>
            </form>
        </div>
        <img src={background} alt='background' id='homeImg'></img>
    </div>
    </div>
  );
}

export default HomePage;