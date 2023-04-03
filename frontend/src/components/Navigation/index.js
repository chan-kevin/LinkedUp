import React from 'react';
import { NavLink } from 'react-router-dom';
import './Navigation.css';
import logo from './LinkedIn_logo.png'
import { useLocation } from 'react-router-dom';

function Navigation() {

  const location = useLocation();

  return (
    <>
      <nav className="nav">
          <NavLink exact to="/"><img src={logo} alt="home" /></NavLink>
          {location.pathname === '/' ? (
          <ul>
            <li><NavLink to="/signup" className="homenav" id='signUpButton'>Join now</NavLink></li>
            <li><NavLink to="/login" className="homenav" id='signInButton'>Sign in</NavLink></li>
          </ul>
          ) : null }
      </nav>
    </>
  )
}

export default Navigation;