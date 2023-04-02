import React, { useState } from 'react';
import * as sessionActions from '../../store/session';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
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
    <form className="signInForm" onSubmit={handleSubmit}>
      <ul>
        {errors.map(error => <li key={error}>{error}</li>)}
      </ul>
      <label>
        Username or Email
        <input
          type="text"
          value={credential}
          placeholder="enter username or email"
          onChange={(e) => setCredential(e.target.value)}
          required
        />
      </label>
      <label>
        Password
        <input
          type="password"
          value={password}
          placeholder="enter password"
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </label>
      <button type="submit">Log In</button>
    </form>
  );
}

export default LoginFormPage;