import React, { useState, useEffect, useRef } from "react";
import { useDispatch } from 'react-redux';
import * as sessionActions from '../../store/session';

function ProfileButton({ user }) {
  const dispatch = useDispatch();
  const [showMenu, setShowMenu] = useState(false);

  const buttonRef = useRef();
  
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
    console.log('clicked')
    dispatch(sessionActions.logout());
  };

  return (
    <>
      <button ref={buttonRef} onClick={openMenu}>
        <p>''</p>
      </button>
      {showMenu && (
        <ul className="profile-dropdown">
          <li>{user.email}</li>
          <li>
            <button onClick={logout}>Log Out</button>
          </li>
        </ul>
      )}
    </>
  );
}

export default ProfileButton;
