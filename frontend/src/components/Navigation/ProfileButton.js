import React, { useState, useEffect } from "react";
import { useDispatch } from 'react-redux';
import * as sessionActions from '../../store/session';
import dropdown from './dropdownProfile.png'
import './ProfileButton.css'

function ProfileButton({ user }) {
  const dispatch = useDispatch();
  const [showMenu, setShowMenu] = useState(false);
  
  const openMenu = (e) => {
    if (showMenu) return;
    e.stopPropagation();
    setShowMenu(true);
  };
  
  useEffect(() => {
    if (!showMenu) return;
    const closeMenu = () => {
        setShowMenu(false);
    };
  
    document.addEventListener('click', closeMenu)

    return () => document.removeEventListener('click', closeMenu);
  }, [showMenu]);

  const logout = (e) => {
    e.preventDefault();
    dispatch(sessionActions.logout());
  };

  return (
    <>
    <div id="dropdown">
      <button onClick={openMenu} id='dropdownbutton'>
        <img src={dropdown} alt='profile' id="dropPic"/>
      </button>
      {showMenu && (
        <ul className="profile-dropdown">
          <li>{user.firstName + ' ' + user.lastName}</li>
          <li><button id='viewProfile'>View Profile</button></li>
          <li>Account</li>
          <li><button className='dropdownOptions'>Try Premium for free</button></li>
          <li><button className='dropdownOptions'>Setting</button></li>
          <li><button className='dropdownOptions'>Help</button></li>
          <li><button className='dropdownOptions'>Language</button></li>
          <li>Manage</li>
          <li><button className='dropdownOptions'>Post & Activity</button></li>
          <li><button className='dropdownOptions'>Job Posting Account</button></li>
          <li>
            <button onClick={logout} className='dropdownOptions'>Sign Out</button>
          </li>
        </ul>
      )}
      </div>
    </>
  );
}

export default ProfileButton;
