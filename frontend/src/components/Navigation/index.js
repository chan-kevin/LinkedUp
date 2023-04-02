import React from 'react';
import { NavLink } from 'react-router-dom';
import './Navigation.css';
import logo from './LinkedIn_logo.png'

function Navigation() {

  return (
    <>
      <nav className="nav">
          <NavLink exact to="/"><img src={logo} alt="home" /></NavLink>
          <ul>
            <li><NavLink to="/signup" className="homenav" id='signUpButton'>Join now</NavLink></li>
            <li><NavLink to="/login" className="homenav" id='signInButton'>Sign in</NavLink></li>
          </ul>
      </nav>
    </>
  )
}

export default Navigation;