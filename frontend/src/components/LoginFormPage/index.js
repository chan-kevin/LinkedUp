import React, { useEffect, useRef, useState } from 'react';
import * as sessionActions from '../../store/session';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, Redirect } from 'react-router-dom';
import './LoginForm.css';

function LoginFormPage() {
  const dispatch = useDispatch();
  const sessionUser = useSelector(state => state.session.user);
  const [credential, setCredential] = useState('');
  const [password, setPassword] = useState('');
  const [empty, setEmpty] = useState({});
  const emailEmptyInputRef = useRef(null);
  const passwordEmptyInputRef = useRef(null);
  const [passwordType, setPasswordType] = useState('password');

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

  const demoLogin = (e) => {
    e.preventDefault();
    dispatch(sessionActions.login({ credential: 'demo@user.io', password: 'password' }));
  }

  const changePasswordType = (e) => {
    e.preventDefault();
    if (passwordType === 'password') {
      setPasswordType('text')
    } else {
      setPasswordType('password')
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!credential){
      setEmpty({
        email: "Please enter an email address or phone number"
      });
      return;
    }

    if (!password){
      setEmpty({
        password: "Please enter a password"
      });
      return;
    }

    if (!isNaN(credential) && !credential.includes('@') && credential.length < 3){
      setEmpty({
        email: "Please enter a valid username"
      });
      return;
    }

    if ((isNaN(credential) && !credential.includes('@')) || (credential[credential.length - 1] === '@')){
      setEmpty({
        email: "Please enter a valid username"
      });
      return;
    }

    if (password.length < 6){
      setEmpty({
        password: "The password you provided must have at least 6 characters"
      });
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
        if (data?.errors) setEmpty({email: data.errors});
      });
  }

  return (
    <div id='signInBackground'>
    <div className='fontFamily' id='signInPage'>
      <form className="signInForm" onSubmit={handleSubmit}>

        <h1 id='signIn'>Sign in</h1>
        <p id='signInDescription'>Stay updated on your professional world</p>

        <input
            ref={emailEmptyInputRef}
            type="text"
            value={credential}
            placeholder="Email or Phone"
            onChange={(e) => setCredential(e.target.value)}
            className='credentials-input'
        />
        {empty.email && <div className='emptySignIn'>{empty.email}</div>}

        <div className='password-input'>
        <input
            ref={passwordEmptyInputRef}
            type={passwordType}
            value={password}
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
            className='credentials-input'
        />
        {passwordType === 'password' ? 
                    <button type='button' onClick={changePasswordType}>Show</button> :
                    <button type='button' onClick={changePasswordType}>Hide</button>}
        </div>
        {empty.password && <div className='emptySignIn'>{empty.password}</div>}

        <button type="submit" className='signInSubmit' id='withoutForgotPassword'>Sign in</button>

        <div className="divider-container" id='login-divider'>
          <div className="divider-item"></div>
          <div className="divider-text">or</div>
          <div className="divider-item"></div>
        </div>

        <button type="submit" className='signUpSubmit' id='signUpGoogle' onClick={demoLogin}>Continue with Demo</button>
      </form>

      <div id='newTo'> New to LinkedUp? <NavLink to="/signup" className='forgotSignup' id='signUpIn'>Join now</NavLink> </div>
    </div>
    </div>
  );
}

export default LoginFormPage;