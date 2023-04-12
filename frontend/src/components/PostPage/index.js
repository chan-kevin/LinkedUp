import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import { Modal } from "../../context/Modal";
import { getAllComments } from "../../store/comment";
import { createPost, getAllPosts, getOnePost } from "../../store/post";
import './PostPage.css';

const PostPage = () => {
    const dispatch = useDispatch();
    const posts = useSelector(state => Object.values(state.posts));
    const comments = useSelector(state => Object.values(state.comments));
    const sessionUser = useSelector(state => state.session.user);
    // const [hasComments, setHasComments] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [postBody, setPostBody] = useState('');

    useEffect(() => {
        dispatch(getAllPosts());
    }, [dispatch, posts.length], sessionUser)

    const listComments = (postId) => {
        dispatch(getOnePost(postId));
        // setHasComments(true)
    }

    const handlePost = async () => {
        const newPost = {
            body: postBody
        }
        await dispatch(createPost(newPost));
        setShowModal(false);
        await dispatch(getAllPosts());
    }

    const onClose = () => {
        setShowModal(false);
    }

    if (!sessionUser) return <Redirect to="/" />;

    return (
        <div className='fontFamily' id='homeFeed'>
            <div className="feedProfile">
                <div className='profileBoard' id="homeProfile">
                    User Profile
                </div>
            </div>

            <div className="feedBody">
                <div className='profileBoard' id="createPost">
                    <div className='authorPic'>
                        <img src={sessionUser.photoUrl} alt='defaultProfile' />
                    </div>

                    <button className='startPost' onClick={() => setShowModal(true)}>
                        <p>Start a post</p>
                    </button>

                    {showModal && (
                        <Modal onClose={onClose}>
                        <div className='profileModal' id='secondModal'>
                            <button onClick={onClose} className='closeButton' id='changeProfileCloseButton2'>
                                <i className="fa-solid fa-xmark" id='changeProfileClose2'></i>
                            </button>

                            <div className='changeProfileTitle' id='changeProfileTitle2'>Create a post</div>

                            <div className="createPostBody">
                                <div className="createPostUserDetail">
                                    <div className='authorPic'>
                                        <img src={sessionUser.photoUrl} alt='defaultProfile' />
                                    </div>
                                    <div className="createPostUserName">
                                        {sessionUser.firstName} {sessionUser.lastName}
                                    </div>
                                </div>
                                <textarea type='text' placeholder="What do you want to talk about?" onChange={(e) => setPostBody(e.target.value)} className="createPostInput"/>
                            </div>

                            <footer className="createPostFoot">
                                <div className="uploadPhoto">
                                    {/* <input type='file' id='uploadInput' ></input> */}
                                    <label className="uploadPhotoIcon"><i className="fa-regular fa-image"></i></label>
                                </div>
                                <div className="submitPost">
                                    <button className='submit' onClick={handlePost}>Post</button>
                                </div>
                            </footer>
                        </div>
                        </Modal>
                    )}
                </div>

                <div className="postList">
                    {posts && posts.map((post, index) => (
                    <div className='profileBoard' id='feedPost' key={index}>

                        <div className="authorInfo">
                            <div className='authorPic'>
                                <img src={post.authorPhoto} alt='defaultProfile' />
                            </div>
                            <div className="authorDetail">
                                <div className="authorName">
                                    {post.authorFirstName} {post.authorLastName}
                                </div>
                                <div className="authorHeadline">
                                    {post.authorHeadline}
                                </div>
                            </div>
                        </div>

                        <div className="postBody">
                            {post.body}
                        </div>

                        <div className="postLikesComments">
                            <div className="likesCount">
                                <i className="fa-regular fa-thumbs-up" id="likesCountIcon"></i>
                                {post.likesCount}
                            </div>
                            <div className="commentsCount" onClick={() => listComments(post.id)}>
                                {post.comments.length} comments
                            </div>
                        </div>

                        <div className="postInteract">
                            <button className='postButtons'>
                                <i className="fa-regular fa-thumbs-up" id="likeButton"></i>
                                <span>Like</span>
                            </button>
                            <button className='postButtons'>
                                <i className="fa-regular fa-comment-dots" id="commentButton"></i>Comment
                            </button>
                        </div>
                        { comments && comments.filter(comment => comment.postId === post.id).map((comment, index) => {
                        return (
                            <div className="comments" key={index}>
                                <div className='authorPic'>
                                    <img src={comment.commenterPhoto} alt='defaultProfile' />
                                </div>

                                <div className="commentsDetail" key={comment.id}>
                                    <div className="authorName">
                                        {comment.commenterFirstName} {comment.commenterLastName}
                                    </div>

                                    <div className="authorHeadline">
                                        {comment.commenterHeadline}
                                    </div>

                                    <div className="commentBody">
                                        {comment.body}
                                    </div>

                                </div>
                            </div>
                        );
                        })}
                    </div>
                    ))}
                </div>
            </div>

            {/* <div className="homeFoot">
                <div className='profileBoard' id="homeProfile">
                        test
                </div>
            </div> */}
        </div>
    )
}

export default PostPage;