import React from 'react';
import { NavLink } from 'react-router-dom';
import './Navigation.css';
import logo from './assets/LinkedUp_Blue.png'
import smallLogo from './assets/Up_Blue.png'
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
                <div className='choices'>
                  <ul className='diffButtons'>
                    <li>
                      <a href='/' className='navButtons' id='home'>
                        <i className="fa-solid fa-house-chimney"></i>
                        <span className='navTitle'>Home</span>
                      </a>
                    </li>

                    <li>
                      <a target='_blank' rel='noreferrer' href='https://www.linkedin.com/in/kevin-chan-426203158/' className='navButtons' id='network'>
                        <i className="fa-brands fa-linkedin"></i>
                        <span className='navTitle'>My LinkedIn</span>
                      </a>
                    </li>

                    <li>
                    <a target='_blank' rel='noreferrer' href='https://github.com/kchannn13' className='navButtons' id='network'>
                        <i className="fa-brands fa-github"></i>
                        <span className='navTitle'>My GitHub</span>
                      </a>
                    </li>

                    <li><ProfileButton user={sessionUser} /></li>
                  </ul>
                </div>
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