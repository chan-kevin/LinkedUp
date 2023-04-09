import React from 'react';
import { NavLink } from 'react-router-dom';
import './Navigation.css';
import logo from './assets/LinkedIn_logo.png'
import smallLogo from './assets/linkedin_small_logo.png'
import { useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import SearchBar from '../SearchBar/SearchBar';

function Navigation() {

  const location = useLocation();
  const sessionUser = useSelector(state => state.session.user);

  return (
    <>
      <nav className="fontFamily">

          {sessionUser ? (
            <header className='fontFamily' id='loginHeader'>
              <div className='nav' id='withUserHome'>
                <NavLink exact to="/"><img src={smallLogo} alt="home" id='withUserHomeLogo'/></NavLink>
                <SearchBar />
                <ul>
                  <li><ProfileButton user={sessionUser} /></li>
                </ul>
              </div>
            </header>
          ) : 

          <header className='fontFamily' id='headBackground'>
          <div className='nav' id='withoutUserHome'>
            <NavLink exact to="/"><img src={logo} alt="home" className='logo'/></NavLink>

            {location.pathname === '/' && !sessionUser ? (
              <ul>
                <li><NavLink to="/signup" className="homenav" id='signUpButton'>Join now</NavLink></li>
                <li><NavLink to="/login" className="homenav" id='signInButton'>Sign in</NavLink></li>
              </ul>
          ) : null }
          </div></header> }
      </nav>
    </>
  )
}

export default Navigation;