import React from "react";
import profileBackground from "../ProfilePage/assets/profileBackground.jpeg";

const UserInfo = ({ toProfile, sessionUser }) => {
  return (
    <div className="feedProfile">
      <div className="profileBoard" id="homeProfile">
        <div className="profileBackground" id="feedBackground">
          <img src={profileBackground} alt="background" />
        </div>

        <div className="authorPic" id="sessionUserPic">
          <img
            src={sessionUser?.photoUrl}
            alt="defaultProfile"
            onClick={() => toProfile(sessionUser.id)}
          />
        </div>

        <div className="sessionUserInfo">
          <div
            className="sessionUserName"
            onClick={() => toProfile(sessionUser.id)}
          >
            {sessionUser.firstName} {sessionUser.lastName}
          </div>

          <div className="sessionUserHeadline">{sessionUser.headline}</div>

          <div className="sessionUserAbout">{sessionUser.about}</div>
        </div>
      </div>
    </div>
  );
};

export default UserInfo;
