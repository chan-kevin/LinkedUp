import React, { useEffect, useRef, useState } from "react";
import * as sessionActions from "../../store/session";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, Redirect } from "react-router-dom";
import "./HomePage.css";
import background from "./HomePage.svg";
import { setLoading } from "../../store/status";
import Loading from "../LoadingPage/Loading";

function HomePage() {
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  const [credential, setCredential] = useState("");
  const [password, setPassword] = useState("");
  const [empty, setEmpty] = useState({});
  const emailEmptyInputRef = useRef(null);
  const passwordEmptyInputRef = useRef(null);
  const emailEmptyLabelRef = useRef(null);
  const passwordEmptyLabelRef = useRef(null);
  const [passwordType, setPasswordType] = useState("password");
  const isLoading = useSelector((state) => state.status.isLoading);

  useEffect(() => {
    if (emailEmptyInputRef.current) {
      emailEmptyInputRef.current.style.borderColor = empty.email
        ? "rgb(201, 20, 20)"
        : "";
    }
    if (passwordEmptyInputRef.current) {
      passwordEmptyInputRef.current.style.borderColor = empty.password
        ? "rgb(201, 20, 20)"
        : "";
    }
    if (emailEmptyLabelRef.current) {
      emailEmptyLabelRef.current.style.color = empty.email
        ? "rgb(201, 20, 20)"
        : "";
    }
    if (passwordEmptyLabelRef.current) {
      passwordEmptyLabelRef.current.style.color = empty.password
        ? "rgb(201, 20, 20)"
        : "";
    }
  }, [empty]);

  if (sessionUser) return <Redirect to="/home" />;

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!credential) {
      setEmpty({
        email: "Please enter an email address or phone number",
      });
      return;
    }

    if (!password) {
      setEmpty({
        password: "Please enter a password",
      });
      return;
    }

    if (
      !isNaN(credential) &&
      !credential.includes("@") &&
      credential.length < 3
    ) {
      setEmpty({
        email: "Please enter a valid username",
      });
      return;
    }

    if (
      (isNaN(credential) && !credential.includes("@")) ||
      credential[credential.length - 1] === "@"
    ) {
      setEmpty({
        email: "Please enter a valid username",
      });
      return;
    }

    if (password.length < 6) {
      setEmpty({
        password: "The password you provided must have at least 6 characters",
      });
      return;
    }

    return dispatch(sessionActions.login({ credential, password })).catch(
      async (res) => {
        let data;
        try {
          data = await res.json();
        } catch {
          data = await res.text();
        }
        if (data?.errors) setEmpty({ email: data.errors });
      }
    );
  };

  const demoLogin = async (e) => {
    e.preventDefault();
    dispatch(setLoading(true));
    dispatch(
      sessionActions.login({ credential: "demo@user.io", password: "password" })
    );
  };

  const changeCredential = (e) => {
    setCredential(e.target.value);
  };

  const changePassword = (e) => {
    setPassword(e.target.value);
  };

  const changePasswordType = (e) => {
    e.preventDefault();
    if (passwordType === "password") {
      setPasswordType("text");
    } else {
      setPasswordType("password");
    }
  };

  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <div id="homeColor">
          <div className="fontFamily" id="homePage">
            <form onSubmit={handleSubmit} className="homeLogin">
              <h1 id="homeHeading">Welcome to your professional community</h1>

              <div className="email-input home-email">
                <label
                  className="homeLabel"
                  id="emailEmptyLabel"
                  ref={emailEmptyLabelRef}
                >
                  Email or phone
                </label>
                <input
                  id="emailEmptyInput"
                  ref={emailEmptyInputRef}
                  type="text"
                  value={credential}
                  onChange={changeCredential}
                />
              </div>
              {empty.email && <div className="empty">{empty.email}</div>}

              <div className="password-input home-password">
                <label
                  className="homeLabel"
                  id="passwordEmptyLabel"
                  ref={passwordEmptyLabelRef}
                >
                  Password
                </label>
                <input
                  id="passwordEmptyInput"
                  ref={passwordEmptyInputRef}
                  type={passwordType}
                  value={password}
                  onChange={changePassword}
                />
                {passwordType === "password" ? (
                  <button type="button" onClick={changePasswordType}>
                    Show
                  </button>
                ) : (
                  <button type="button" onClick={changePasswordType}>
                    Hide
                  </button>
                )}
              </div>
              {empty.password && <div className="empty">{empty.password}</div>}

              <div id="homeBorder">
                <button
                  type="submit"
                  className="signInSubmit"
                  id="homeSign"
                  onClick={handleSubmit}
                >
                  Sign in
                </button>
              </div>

              <div className="divider-container" id="home-divider">
                <div className="divider-item"></div>
                <div className="divider-text">or</div>
                <div className="divider-item"></div>
              </div>

              <button
                type="submit"
                className="signInSubmit"
                id="homeGoogle"
                onClick={demoLogin}
              >
                Sign in as Demo
              </button>
              <NavLink to="/signup" className="signInSubmit" id="homeNew">
                New to LinkedUp? Join now
              </NavLink>
            </form>
            <img src={background} alt="background" id="homeImg"></img>
          </div>
        </div>
      )}
    </>
  );
}

export default HomePage;
