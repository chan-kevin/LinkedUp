import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import * as sessionActions from "../../store/session";
import "./ProfileButton.css";

function ProfileButton({ user }) {
  const dispatch = useDispatch();
  const [showMenu, setShowMenu] = useState(false);
  const sessionUser = useSelector((state) => state.session.user);

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

    document.addEventListener("click", closeMenu);

    return () => document.removeEventListener("click", closeMenu);
  }, [showMenu]);

  const logout = (e) => {
    e.preventDefault();
    dispatch(sessionActions.logout());
  };

  return (
    <>
      <div id="dropdown">
        <div onClick={openMenu} className="navButtons" id="drop">
          <div className="navPic">
            <img src={sessionUser.photoUrl} alt="defaultProfile" />
          </div>
          <span className="navTitle">
            Me<i className="fa-solid fa-sort-down" id="dropIcon"></i>
          </span>
        </div>
        {showMenu && (
          <ul className="profile-dropdown">
            <li>
              <div className="navPic">
                <img src={sessionUser.photoUrl} alt="defaultProfile" />
              </div>
              <div className="navProfile">
                <div>{user.firstName + " " + user.lastName}</div>
                <div className="navHeadline">{user.headline}</div>
              </div>
            </li>
            <li>
              <NavLink to={`/users/${user.id}`} id="viewProfile">
                <p>View Profile</p>
              </NavLink>
            </li>
            <li>Account</li>
            <li>
              <a
                target="_blank"
                rel="noreferrer"
                href="https://chan-kevin.github.io/The-Adventures-of-Gary-the-Snail/"
                className="dropdownOptions"
              >
                Try Gary Adventure for free
              </a>
            </li>
            <li>
              <a
                target="_blank"
                rel="noreferrer"
                href="https://github.com/chan-kevin/LinkedUp/blob/main/README.md"
                className="dropdownOptions"
              >
                Help - ReadMe
              </a>
            </li>
            <li>Manage</li>
            {/* <li><a target='_blank' rel='noreferrer' href='' className='dropdownOptions'>Contact Me</a></li> */}
            <li>
              <a
                target="_blank"
                rel="noreferrer"
                href="https://github.com/chan-kevin"
                className="dropdownOptions"
              >
                More App
              </a>
            </li>
            <li>
              <button onClick={logout} className="dropdownOptions">
                Sign Out
              </button>
            </li>
          </ul>
        )}
      </div>
    </>
  );
}

export default ProfileButton;
