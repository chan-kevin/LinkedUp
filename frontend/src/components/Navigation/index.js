import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import "./Navigation.css";
import logo from "./assets/LinkedUp_Blue.png";
import smallLogo from "./assets/Up_Blue.png";
import { useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import ProfileButton from "./ProfileButton";
import SearchBar from "../SearchBar/SearchBar";
import { useHistory } from "react-router-dom";

function Navigation() {
  const location = useLocation();
  const sessionUser = useSelector((state) => state.session.user);
  const history = useHistory();
  const [smallScreen, setSmallScreen] = useState(window.innerWidth <= 853);
  const isLoading = useSelector((state) => state.status.isLoading);

  const handleResize = () => {
    setSmallScreen(window.innerWidth <= 853);
  };

  useEffect(() => {
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <nav className="fontFamily">
      {sessionUser && !smallScreen ? (
        <header className="fontFamily" id="loginHeader">
          <div className="nav" id="withUserHome">
            <div className="left-nav">
              <label className="navButtons" id="homeLogo">
                <img
                  src={smallLogo}
                  alt="home"
                  className="withUserHomeLogo"
                  onClick={() => history.push(history.push("/"))}
                />
              </label>
              <SearchBar />
            </div>

            <div className="choices">
              <ul className="diffButtons">
                <li>
                  <a href="/" className="navButtons network">
                    <i className="fa-solid fa-house-chimney navlogo"></i>
                    <span className="navTitle navlink">Home</span>
                  </a>
                </li>

                {/* <li>
                  <a
                    target="_blank"
                    rel="noreferrer"
                    href=""
                    className="navButtons network"
                  >
                    <i className="fa-brands fa-linkedin navlogo"></i>
                    <span className="navTitle navlink">My LinkedIn</span>
                  </a>
                </li> */}

                <li>
                  <a
                    target="_blank"
                    rel="noreferrer"
                    href="https://github.com/chan-kevin"
                    className="navButtons network"
                  >
                    <i className="fa-brands fa-github navlogo"></i>
                    <span className="navTitle navlink">My GitHub</span>
                  </a>
                </li>

                <li>
                  <ProfileButton user={sessionUser} />
                </li>
              </ul>
            </div>
          </div>
        </header>
      ) : null}

      {sessionUser && smallScreen ? (
        <header className="fontFamily" id="loginHeader">
          <div className="nav">
            <div>
              <ul className="small-screen-buttons">
                <li className="navButtons" id="homeLogo">
                  <img
                    src={smallLogo}
                    alt="home"
                    className="withUserHomeLogo"
                    onClick={() => history.push(history.push("/"))}
                  />
                </li>

                <SearchBar />

                <li>
                  <a href="/" className="navButtons network">
                    <i className="fa-solid fa-house-chimney navlogo"></i>
                    <span className="navTitle navlink">Home</span>
                  </a>
                </li>

                {/* <li>
                  <a
                    target="_blank"
                    rel="noreferrer"
                    href=""
                    className="navButtons network"
                  >
                    <i className="fa-brands fa-linkedin navlogo"></i>
                    <span className="navTitle navlink">My LinkedIn</span>
                  </a>
                </li> */}

                <li>
                  <a
                    target="_blank"
                    rel="noreferrer"
                    href="https://github.com/chan-kevin"
                    className="navButtons network"
                  >
                    <i className="fa-brands fa-github navlogo"></i>
                    <span className="navTitle navlink">My GitHub</span>
                  </a>
                </li>

                <li>
                  <ProfileButton user={sessionUser} />
                </li>
              </ul>
            </div>
          </div>
        </header>
      ) : null}

      {!sessionUser && !isLoading ? (
        <header className="fontFamily" id="headBackground">
          <div className="nav" id="withoutUserHome">
            <NavLink exact to="/">
              <img src={logo} alt="home" className="logo" />
            </NavLink>
            {location.pathname === "/" ? (
              <ul>
                <li>
                  <NavLink to="/signup" className="homenav" id="signUpButton">
                    Join now
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/login" className="homenav" id="signInButton">
                    Sign in
                  </NavLink>
                </li>
              </ul>
            ) : null}
          </div>
        </header>
      ) : null}
    </nav>
  );
}

export default Navigation;
