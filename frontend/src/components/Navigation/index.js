import React from 'react';
import { NavLink } from 'react-router-dom';
import './Navigation.css';
import logo from './Linkedin_logo.png'
import { useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import * as sessionActions from '../../store/session';

function Navigation() {

  const dispatch = useDispatch();
  const location = useLocation();
  const sessionUser = useSelector(state => state.session.user);
  const logout = (e) => {
    e.preventDefault();
    dispatch(sessionActions.logout());
  };
  

  return (
    <>
      <nav className="fontFamily" id='nav'>
          <NavLink exact to="/"><img src={logo} alt="home" id='logo'/></NavLink>
          {location.pathname === '/' && !sessionUser ? (
          <ul>
            <li><NavLink to="/signup" className="homenav" id='signUpButton'>Join now</NavLink></li>
            <li><NavLink to="/login" className="homenav" id='signInButton'>Sign in</NavLink></li>
          </ul>
          ) : null }
          {sessionUser ? (
          <button onClick={logout}>Log Out</button>
          ): null }
      </nav>
    </>
  )
}

export default Navigation;