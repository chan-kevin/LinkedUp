import React, { useEffect, useRef, useState } from 'react';
import * as sessionActions from '../../store/session';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, Redirect } from 'react-router-dom';
import './HomePage.css';
import background from './HomePage.svg'
import LoginFormPage from '../LoginFormPage';
import PostPage from '../PostPage';

function HomePage() {
  const dispatch = useDispatch();
  const sessionUser = useSelector(state => state.session.user);
  const [credential, setCredential] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState([]);
  const [empty, setEmpty] = useState({});
  const emailEmptyInputRef = useRef(null);
  const passwordEmptyInputRef = useRef(null);
  const emailEmptyLabelRef = useRef(null);
  const passwordEmptyLabelRef = useRef(null);
  const [passwordType, setPasswordType] = useState('password')
  // const emailError = errors.find(error => error.includes('Email'));

  useEffect(() => {
    if (emailEmptyInputRef.current) {
      emailEmptyInputRef.current.style.borderColor = empty.email ? 'rgb(201, 20, 20)' : '';
    }
    if (passwordEmptyInputRef.current) {
      passwordEmptyInputRef.current.style.borderColor = empty.password ? 'rgb(201, 20, 20)' : '';
    }
    if (emailEmptyLabelRef.current) {
      emailEmptyLabelRef.current.style.color = empty.email ? 'rgb(201, 20, 20)' : '';
    }
    if (passwordEmptyLabelRef.current) {
      passwordEmptyLabelRef.current.style.color = empty.password ? 'rgb(201, 20, 20)' : '';
    }
  }, [empty]);

  if (sessionUser) return <Redirect to="/home" />;

//   const ele = document.getElementById('headBackground');
//   ele.style.backgroundColor = 'white';

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

  const demoLogin = (e) => {
    e.preventDefault();
    dispatch(sessionActions.login({ credential: 'demo@user.io', password: 'password' }));
  }

  const changeCredential = (e) => {
    setCredential(e.target.value)
  }

  const changePassword = (e) => {
    setPassword(e.target.value)
  }

  // const handleInputFocus = (e) => {
  //   const input = e.target;
  //   const label = input.previousSibling;
  //   if (input) {
  //     input.style.borderColor = '#0073b1';
  //     label.style.color = '#0073b1';
  //   }
  // }
  
  // const handleInputBlur = (e) => {
  //   const input = e.target;
  //   const label = input.previousSibling;
  //   if (input) {
  //     input.style.borderColor = '';
  //     label.style.color = '';
  //   }
  // }

  const changePasswordType = (e) => {
    e.preventDefault();
    if (passwordType === 'password') {
      setPasswordType('text')
    } else {
      setPasswordType('password')
    }
  }

  return (
    <div id='homeColor'>
      <div className='fontFamily' id='homePage'>
          {/* <div className='signIn'> */}
              <form onSubmit={handleSubmit} className='homeLogin'>
                  {/* <ul>
                      {errors.map(error => <li key={error}>{error}</li>)}
                  </ul> */}

                  <h1 id='homeHeading'>Welcome to your professional community</h1>

                  <div className='email-input'>
                    <label className='homeLabel' id='emailEmptyLabel' ref={emailEmptyLabelRef}>
                        Email or phone
                    </label>
                    <input
                        id='emailEmptyInput' 
                        ref={emailEmptyInputRef}
                        type="text"
                        value={credential}
                        onChange={changeCredential}
                        // onFocus={handleInputFocus}
                        // onBlur={handleInputBlur}
                    />
                  </div>
                  {empty.email && <div className='empty'>{empty.email}</div>}

                  <div className='password-input'>
                    <label className='homeLabel' id='passwordEmptyLabel' ref={passwordEmptyLabelRef}>
                        Password
                    </label>
                    <input
                        id='passwordEmptyInput'
                        ref={passwordEmptyInputRef}
                        type={passwordType}
                        value={password}
                        onChange={changePassword}
                        // onFocus={handleInputFocus}
                        // onBlur={handleInputBlur}
                    />
                    {passwordType === 'password' ? 
                    <button type='button' onClick={changePasswordType}>Show</button> :
                    <button type='button' onClick={changePasswordType}>Hide</button>}
                  </div>
                  {empty.password && <div className='empty'>{empty.password}</div>}

                  {/* <NavLink to='/forgot' className='forgotSignup' id='homeSignIn'>Forgot Password?</NavLink> */}
                  <div id='homeBorder'><button type="submit" className='signInSubmit' id='homeSign' onClick={handleSubmit}>Sign in</button></div>
                  {/* {errors ? <LoginFormPage credential={credential} errors={errors} /> : null} */}

                  <div class="divider-container" id='home-divider'>
                    <div class="divider-item"></div>
                    <div class="divider-text">or</div>
                    <div class="divider-item"></div>
                  </div>

                  <button type="submit" className='signInSubmit' id='homeGoogle' onClick={demoLogin}>Sign in as Demo</button>
                  <NavLink to='/signup' className='signInSubmit' id='homeNew'>New to LinkedUp? Join now</NavLink>
              </form>
          {/* </div> */}
          <img src={background} alt='background' id='homeImg'></img>
      </div>
      
    </div>
  );
}

export default HomePage;