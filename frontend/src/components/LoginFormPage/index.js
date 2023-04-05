import React, { useEffect, useRef, useState } from 'react';
import * as sessionActions from '../../store/session';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, Redirect } from 'react-router-dom';
import './LoginForm.css';
import apple from './assets/apple_logo.png';

function LoginFormPage() {
  const dispatch = useDispatch();
  const sessionUser = useSelector(state => state.session.user);
  const [credential, setCredential] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState([]);
  const [empty, setEmpty] = useState({});
  const emailEmptyInputRef = useRef(null);
  const passwordEmptyInputRef = useRef(null);

  useEffect(() => {
    if (emailEmptyInputRef.current) {
      emailEmptyInputRef.current.style.borderColor = empty.email ? 'rgb(201, 20, 20)' : '';
      emailEmptyInputRef.current.style.borderWidth = empty.email ? '2px' : '';
      emailEmptyInputRef.current.style.placeholderColor = empty.email ? 'red' : '';
    }
    if (passwordEmptyInputRef.current) {
      passwordEmptyInputRef.current.style.borderColor = empty.password ? 'rgb(201, 20, 20)' : '';
      passwordEmptyInputRef.current.style.borderWidth = empty.password ? '2px' : '';
    }
  }, [empty]);

  if (sessionUser) return <Redirect to="/" />;

  // const ele = document.getElementById('headBackground');
  // ele.style.backgroundColor = 'white';

  const demoLogin = (e) => {
    e.preventDefault();
    dispatch(sessionActions.login({ credential: 'demo@user.io', password: 'password' }));
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!credential){
      setEmpty(prevErrors => ({
        ...prevErrors,
        email: "Please enter an email address or phone number"
      }));
      return;
    }

    if (!password){
      setEmpty(() => ({
        password: "Please enter a password"
      }));
      return;
    }
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
    <div id='signInBackground'>
    <div className='fontFamily' id='signInPage'>
      <form className="signInForm" onSubmit={handleSubmit}>
        <ul>
          {errors.map(error => <li key={error}>{error}</li>)}
        </ul>

        <h1 id='signIn'>Sign in</h1>
        <p id='signInDescription'>Stay updated on your professional world</p>

        <input
            ref={emailEmptyInputRef}
            type="text"
            value={credential}
            placeholder="Email or Phone"
            onChange={(e) => setCredential(e.target.value)}
        />
        {empty.email && <div className='emptySignIn'>{empty.email}</div>}

        <input
            ref={passwordEmptyInputRef}
            type="password"
            value={password}
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
        />
        {empty.password && <div className='emptySignIn'>{empty.password}</div>}

        <NavLink to='/forgot' className='forgotSignup'>Forgot Password?</NavLink>

        <button type="submit" className='signInSubmit'>Sign in</button>
        <div id='signUpBorder'></div>
        <button type="submit" className='signUpSubmit' id='signUpGoogle' onClick={demoLogin}>Continue with Demo</button>
        <button type="submit" className='signUpSubmit' id='signInApple'> <img src={apple} alt='apple' id='google'/> Sign in with Apple</button>
      </form>

      <div id='newTo'> New to LinkedIn? <NavLink to="/signup" className='forgotSignup' id='signUpIn'>Join now</NavLink> </div>
    </div>
    </div>
  );
}

export default LoginFormPage;