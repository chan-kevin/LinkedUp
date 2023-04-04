import React, { useState, useEffect } from "react";
import { useDispatch } from 'react-redux';
import * as sessionActions from '../../store/session';

function ProfileButton({ user }) {
  const dispatch = useDispatch();
  const [showMenu, setShowMenu] = useState(false);
  
  const openMenu = () => {
    if (showMenu) return;
    console.log('clicked')
    setShowMenu(true);
  };
  
  useEffect(() => {
    if (!showMenu) return;
    console.log("hi")
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
      <button onClick={openMenu}>
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
