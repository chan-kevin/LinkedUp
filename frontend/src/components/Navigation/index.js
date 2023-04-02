import React from 'react';
import { NavLink } from 'react-router-dom';
import './Navigation.css';

function Navigation() {

  return (
    <>
      <ul className="nav">
        <li>
          <NavLink exact to="/">Home</NavLink>
          <NavLink to="/login">Log In</NavLink>
          <NavLink to="/signup">Sign Up</NavLink>
        </li>
      </ul>
    </>
  )
}

export default Navigation;