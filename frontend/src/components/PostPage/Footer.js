import React from "react";
import logo from "../Navigation/assets/LinkedUp_Blue.png";

const Footer = () => {
  return (
    <footer className="homeFoot">
      <div className="profileBoard" id="homeFoot">
        <div className="news">LinkedUp News</div>
        <ul className="newsList">
          <li>
            &bull;{" "}
            <a
              target="_blank"
              rel="noreferrer"
              href="https://linkedup-ptj7.onrender.com/"
            >
              LinkedUp is now live!
            </a>
          </li>
          <li>
            &bull;{" "}
            <a
              target="_blank"
              rel="noreferrer"
              href="https://chan-kevin.github.io/The-Adventures-of-Gary-the-Snail/"
            >
              New Game check it out
            </a>
          </li>
        </ul>
      </div>
      <div className="linkedUpbottom">
        <div className="bottomDetails">
          <p className="developed">developed by Kevin Chan</p>

          <div className="logoAnd2023">
            <img src={logo} alt="logo" id="bottomlogo"></img>
            <p>LinkedUp Corporation © 2023</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
