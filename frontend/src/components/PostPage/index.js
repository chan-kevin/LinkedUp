import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, useHistory } from "react-router-dom";
import { Modal } from "../../context/Modal";
import { createComment } from "../../store/comment";
import {
  createPost,
  getAllPosts,
  getOnePost,
  removePost,
} from "../../store/post";
import EditPage from "./edit";
import "./PostPage.css";
import CommentPage from "../CommentPage";
import { createLike, removeLike } from "../../store/like";

import TimeDisplay from "./time";
import Footer from "./Footer";
import UserInfo from "./UserInfo";
import StartPost from "./StartPost";

const PostPage = () => {
  const dispatch = useDispatch();
  const posts = useSelector((state) => state.posts);
  const comments = useSelector((state) => Object.values(state.comments));
  const sessionUser = useSelector((state) => state.session.user);
  const [showModal, setShowModal] = useState(false);
  const [postBody, setPostBody] = useState("");
  const [showMenu, setShowMenu] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [body, setBody] = useState("");
  const [openCreateComment, setOpenCreateComment] = useState(false);
  const [photoUrl, setPhotoUrl] = useState(null);
  const history = useHistory();
  const menuRef = useRef();
  const [photoFile, setPhotoFile] = useState(null);
  const isLoading = useSelector((state) => state.status.isLoading);

  useEffect(() => {
    dispatch(getAllPosts());
  }, []);

  useEffect(() => {
    const closeMenu = () => {
      if (!editModal) {
        setShowMenu(false);
      }
    };

    document.addEventListener("click", closeMenu);

    return () => document.removeEventListener("click", closeMenu);
  }, [showMenu, editModal, showModal, body]);

  const toProfile = (userId) => {
    history.push(`/users/${userId}`);
    window.scrollTo(0, 0);
  };

  const listComments = (postId, index) => {
    dispatch(getOnePost(postId));
    setOpenCreateComment(index);
  };

  const handleDelete = (id) => {
    dispatch(removePost(id));
    closeDeleteModal();
  };

  const openMenu = (e, index) => {
    e.stopPropagation();
    if (showMenu === false || showMenu !== index) {
      setShowMenu(index);
    } else {
      setShowMenu(false);
    }
    setEditModal(false);
  };

  const onClose = () => {
    setShowModal(false);
    setShowMenu(false);
    setPhotoUrl(null);
  };

  const closeEditModal = (e) => {
    e.stopPropagation();
    setEditModal(false);
    setShowMenu(false);
  };

  const closeDeleteModal = () => {
    setDeleteModal(false);
    setShowMenu(false);
  };

  const commentOnChange = (e) => {
    setBody(e.target.value);
  };

  const handleComment = (postId) => {
    setBody("");
    const commentNew = {
      body,
      postId,
    };
    dispatch(createComment(commentNew));
  };

  const handleLike = (userId, postId) => {
    const isliked = {
      likeableId: postId,
      likerId: userId,
    };
    const likebutton = document.getElementById(`likeButton-${postId}`);
    const liketext = document.getElementById(`liketext-${postId}`);
    if (posts[postId].liked) {
      dispatch(removeLike(postId));
      likebutton.style.color = "rgba(0,0,0,0.6)";
      liketext.style.color = "rgba(0,0,0,0.6)";
    } else {
      dispatch(createLike(isliked));
      likebutton.style.color = "#0a66c2";
      liketext.style.color = "#0a66c2";
    }
  };

  const changePostPic = ({ currentTarget }) => {
    const file = currentTarget.files[0];
    if (file) {
      setPhotoFile(file);
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);
      fileReader.onload = () => setPhotoUrl(fileReader.result);
    } else setPhotoUrl(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("post[body]", postBody);
    if (photoFile) {
      formData.append("post[photo]", photoFile);
    }
    await dispatch(createPost(formData));
    setShowModal(false);
    setPhotoUrl(null);
    dispatch(getAllPosts());
  };

  let preview = null;
  if (photoUrl) preview = <img src={photoUrl} alt="" className="previewPic" />;

  let orderedPosts;
  if (Object.values(posts).length > 0) {
    orderedPosts = posts?.postIds.map((postId) => {
      return posts[postId];
    });
  }

  if (!sessionUser) return <Redirect to="/" />;
  return (
    <>
      {isLoading ? (
        <div className="loader-container">
          <div className="spinner"></div>
        </div>
      ) : (
        <div className="fontFamily" id="homeFeed">
          <div className="feed-grid">
            <UserInfo toProfile={toProfile} sessionUser={sessionUser} />

            <div className="feedBody">
              <StartPost
                sessionUser={sessionUser}
                toProfile={toProfile}
                setShowModal={setShowModal}
                onClose={onClose}
                setPostBody={setPostBody}
                changePostPic={changePostPic}
                handleSubmit={handleSubmit}
                showModal={showModal}
                preview={preview}
              />

              <div className="postList">
                {orderedPosts &&
                  orderedPosts.map((post, index) => (
                    <div className="profileBoard" id="feedPost" key={index}>
                      <div
                        className="authorInfo"
                        onClick={() => toProfile(post.authorId)}
                      >
                        <div className="authorPic">
                          <img src={post.authorPhoto} alt="defaultProfile" />
                        </div>
                        <div className="authorDetail">
                          <div className="authorName">
                            {post.authorFirstName} {post.authorLastName}
                          </div>
                          <div className="authorHeadline">
                            {post.authorHeadline}
                          </div>

                          <div className="timeAgo">
                            <TimeDisplay timestamp={post.createdAt} />
                          </div>
                        </div>
                        {post.authorId === sessionUser.id && (
                          <div
                            className="optionsContainer"
                            onClick={(e) => {
                              openMenu(e, index);
                            }}
                          >
                            <i
                              className="fa-solid fa-ellipsis"
                              id="postOptionsIcon"
                            ></i>
                          </div>
                        )}

                        {showMenu === index && (
                          <div className="editOptions" ref={menuRef}>
                            <div
                              className="editChoices"
                              onClick={(e) => {
                                e.stopPropagation();
                                setEditModal(true);
                              }}
                            >
                              <div className="positionButton" id="editPost">
                                <i
                                  className="fa-solid fa-pencil"
                                  id="editPostIcon"
                                ></i>
                                Edit Post
                              </div>
                            </div>

                            {editModal ? (
                              <Modal onClose={closeEditModal}>
                                <EditPage
                                  onClose={closeEditModal}
                                  post={post}
                                />
                              </Modal>
                            ) : null}

                            <div
                              className="editChoices"
                              onClick={(e) => {
                                e.stopPropagation();
                                setDeleteModal(true);
                              }}
                            >
                              <div className="positionButton" id="deletePost">
                                <i
                                  className="fa-solid fa-trash-can"
                                  id="deleteIcon"
                                ></i>
                                Delete Post
                              </div>
                            </div>

                            {deleteModal ? (
                              <div
                                className="modal"
                                id="deleteOutside"
                                onClick={(e) => e.stopPropagation()}
                              >
                                <div
                                  className="modal-background"
                                  onClick={closeDeleteModal}
                                />
                                <div className="deleteModal">
                                  <div className="deleteModalContent">
                                    <p>Delete post?</p>
                                    <p>
                                      Are you sure you want to permanently
                                      remove this post from LinkedUp?
                                    </p>
                                  </div>
                                  <div className="deleteConfirm">
                                    <button
                                      className="submit"
                                      onClick={closeDeleteModal}
                                    >
                                      Cancel
                                    </button>
                                    <button
                                      className="submit"
                                      onClick={() => handleDelete(post.id)}
                                    >
                                      Delete
                                    </button>
                                  </div>
                                </div>
                              </div>
                            ) : null}
                          </div>
                        )}
                      </div>

                      <div className="postBody">
                        <p style={{ whiteSpace: "pre-line" }}>{post.body}</p>
                        {post.photoUrl ? (
                          <img src={post.photoUrl} alt="postPhoto"></img>
                        ) : null}
                      </div>

                      <div className="postLikesComments">
                        {post.likesCount ? (
                          <div className="likesCount">
                            <i
                              className="fa-regular fa-thumbs-up"
                              id="likesCountIcon"
                            ></i>
                            {post.likesCount}
                          </div>
                        ) : (
                          <div className="likesCount">
                            <i
                              className="fa-regular fa-thumbs-up"
                              id="likesCountIcon"
                            ></i>
                            0
                          </div>
                        )}

                        {post.comments ? (
                          <div
                            className="commentsCount"
                            onClick={() => listComments(post.id, index)}
                          >
                            {post.comments.length} comments
                          </div>
                        ) : null}
                      </div>

                      <div className="postInteract">
                        <button
                          className="postButtons"
                          onClick={() =>
                            handleLike(sessionUser.id, post.id, index)
                          }
                        >
                          {post.liked ? (
                            <>
                              <i
                                className="fa-solid fa-thumbs-up likeButton liked"
                                id={`likeButton-${post.id}`}
                              ></i>
                              <span
                                className="liketext liked"
                                id={`liketext-${post.id}`}
                              >
                                Like
                              </span>
                            </>
                          ) : (
                            <>
                              <i
                                className="fa-solid fa-thumbs-up likeButton unliked"
                                id={`likeButton-${post.id}`}
                              ></i>
                              <span
                                className="liketext unliked"
                                id={`liketext-${post.id}`}
                              >
                                Like
                              </span>
                            </>
                          )}
                        </button>
                        <button
                          className="postButtons"
                          onClick={() => listComments(post.id, index)}
                        >
                          <i
                            className="fa-regular fa-comment-dots"
                            id="commentButton"
                          ></i>
                          Comment
                        </button>
                      </div>

                      {openCreateComment === index ? (
                        <div className="createComment">
                          <form>
                            <div className="addComment">
                              <div className="authorPic">
                                <img
                                  src={sessionUser.photoUrl}
                                  alt="defaultProfile"
                                />
                              </div>

                              <input
                                className="startPost"
                                value={body}
                                placeholder="Add a comment..."
                                id="startComment"
                                onChange={commentOnChange}
                              />
                            </div>
                            {body && (
                              <button
                                className="submit"
                                id="postComment"
                                onClick={() => handleComment(post.id)}
                              >
                                Post
                              </button>
                            )}
                          </form>
                        </div>
                      ) : null}

                      {comments && <CommentPage postId={post.id} />}
                    </div>
                  ))}
              </div>
            </div>

            <Footer />
          </div>
        </div>
      )}
    </>
  );
};

export default PostPage;
