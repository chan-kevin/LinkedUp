import React from "react";
import { Modal } from "../../context/Modal";

const StartPost = ({
  sessionUser,
  toProfile,
  setShowModal,
  onClose,
  setPostBody,
  changePostPic,
  handleSubmit,
  showModal,
  preview,
}) => {
  return (
    <div className="profileBoard" id="createPost">
      <div className="authorPic">
        <img
          src={sessionUser.photoUrl}
          alt="defaultProfile"
          onClick={() => toProfile(sessionUser.id)}
        />
      </div>

      <button className="startPost" onClick={() => setShowModal(true)}>
        <p>Start a post</p>
      </button>

      {showModal && (
        <Modal onClose={onClose}>
          <div className="profileModal" id="secondModal">
            <button
              onClick={onClose}
              className="closeButton"
              id="changeProfileCloseButton2"
            >
              <i className="fa-solid fa-xmark" id="changeProfileClose2"></i>
            </button>

            <div className="changeProfileTitle" id="changeProfileTitle2">
              Create a post
            </div>

            <div className="createPostBody">
              <div className="createPostUserDetail">
                <div className="authorPic">
                  <img src={sessionUser.photoUrl} alt="defaultProfile" />
                </div>
                <div className="createPostUserName">
                  {sessionUser.firstName} {sessionUser.lastName}
                </div>
              </div>
              <textarea
                type="text"
                placeholder="What do you want to talk about?"
                onChange={(e) => setPostBody(e.target.value)}
                className="createPostInput"
              />
              {preview}
            </div>

            <footer className="createPostFoot">
              <div className="uploadPhoto">
                <label htmlFor="uploadPostPic" className="uploadPhotoIcon">
                  <i className="fa-regular fa-image"></i>
                  <input
                    type="file"
                    id="uploadPostPic"
                    onChange={changePostPic}
                  ></input>
                </label>
              </div>
              <div className="submitPost">
                <button className="submit" onClick={handleSubmit}>
                  Post
                </button>
              </div>
            </footer>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default StartPost;
