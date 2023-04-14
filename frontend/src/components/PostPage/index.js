import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, useHistory } from "react-router-dom";
import { Modal } from "../../context/Modal";
import { createComment, getAllComments } from "../../store/comment";
import { createPost, getAllPosts, getOnePost, removePost } from "../../store/post";
import EditPage from "./edit";
import './PostPage.css';
import profileBackground from '../ProfilePage/assets/profileBackground.jpeg';
import CommentPage from "../CommentPage";
import { createLike, removeLike } from "../../store/like";
import GitHubUpdates from "../GitHub";
import logo from '../Navigation/assets/LinkedUp_Blue.png'

const PostPage = () => {
    const dispatch = useDispatch();
    const posts = useSelector(state => state.posts);
    const comments = useSelector(state => Object.values(state.comments));
    const sessionUser = useSelector(state => state.session.user);
    // const [hasComments, setHasComments] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [postBody, setPostBody] = useState('');
    const [showMenu, setShowMenu] = useState(false);
    const [editModal, setEditModal] = useState(false);
    const [editedBody, setEditBody] = useState('');
    const [deleteModal, setDeleteModal] = useState(false);
    const [body, setBody] = useState('');
    const [openCreateComment, setOpenCreateComment] = useState(false);
    const [photoUrl, setPhotoUrl] = useState(null);
    const [likedOrNot, setLikedOrNot] = useState(null);
    const [loading, setLoading] = useState(false);
    const likedUser = useSelector(state => state.posts.likesIds)
    const history = useHistory();
    const menuRef = useRef();


    useEffect(() => {
        setLoading(true);
        setTimeout(() => {
          setLoading(false);
        }, 2000);
      }, []);

    useEffect(() => {
        dispatch(getAllPosts());

        // if (!showMenu) return;

        const closeMenu = () => {
            if (!editModal) {
            setShowMenu(false);
            }
        };

        // document.addEventListener('click', (e) => {
        //     e.preventDefault();
        //     e.stopPropagation();
        // });
        document.addEventListener('click', closeMenu);

        return () => document.removeEventListener('click', closeMenu);

    }, [dispatch, posts.length, showMenu, editModal, showModal, body])

    const toProfile = (userId) => {
        history.push(`/users/${userId}`)
    }

    const listComments = (postId, index) => {
        // console.log(index)
        dispatch(getOnePost(postId));
        setOpenCreateComment(index);
        // setHasComments(true)
    }

    const handlePost = () => {
        const newPost = {
            body: postBody
        }
        dispatch(createPost(newPost));
        setShowModal(false);
        dispatch(getAllPosts());
    }

    const handleDelete = (id) => {
        dispatch(removePost(id));
        closeDeleteModal();
    }

    const openMenu = (e, index) => {
        e.stopPropagation();
        setShowMenu(index);
        setEditModal(false);
    }

    const onClose = () => {
        setShowModal(false);
        setShowMenu(false);
    }

    const closeEditModal = () => {
        setEditModal(false);
    }

    const closeDeleteModal = () => {
        setDeleteModal(false);
    }

    const commentOnChange = (e) => {
        setBody(e.target.value)
    }

    const handleComment = (postId) => {
        const commentNew = {
            body,
            postId
        }
        dispatch(createComment(commentNew))
        setBody('');
    }

    const handleOpenCreateComment = (postId, index) => {
        setOpenCreateComment(index);
        listComments(postId);
    }

    const handleLike = (userId, postId) => {
        const isliked = {
            likeableId: postId,
            likerId: userId
        }
        const likebutton = document.getElementById('likeButton');
        const liketext = document.getElementById('liketext');
        if (posts[postId].liked) {
            dispatch(removeLike(postId))
            likebutton.style.color = 'rgba(0,0,0,0.6)'
            liketext.style.color = 'rgba(0,0,0,0.6)'
        } else {
            dispatch(createLike(isliked))
            likebutton.style.color = '#0a66c2'
            liketext.style.color = '#0a66c2'
        }
        // if (likedUser.include(userId)) {
        //     dispatch(removeLike())
        // }
        
    }

    // const changeProfilePic = ({ currentTarget}) => {
    //     const file = currentTarget.files[0];
    //     if (file) {
    //         setPhotoFile(file);
    //         const fileReader = new FileReader();
    //         fileReader.readAsDataURL(file);
    //         fileReader.onload = () => setPhotoUrl(fileReader.result);
    //     } 
    //     else setPhotoUrl(null);
    // }

    // const handleSubmit = async e => {
    //     e.preventDefault();
    //     const formData = new FormData()
    //     formData.append('post[id]', postId);
    //     if (photoFile){
    //         formData.append('user[photo]' ,photoFile);
    //         dispatch(createPost(formData, postId));
    //     }
    // }
    let orderedPosts;
    if (Object.values(posts).length > 0){
    orderedPosts = (posts?.postIds.map((postId) => { return posts[postId]}))
    }

    if (!sessionUser) return <Redirect to="/" />;
    return (
    <>
        {loading ? (
            <div className="loader-container">
            <div className="spinner"></div>
            </div>
        ) : (
        <div className='fontFamily' id='homeFeed'>
            
            <div className="feedProfile">
                <div className='profileBoard' id="homeProfile">

                    <div className='profileBackground' id="feedBackground">
                        <img src={profileBackground} alt='background'/>
                    </div>

                    <div className='authorPic' id="sessionUserPic">
                        <img src={sessionUser?.photoUrl} alt='defaultProfile' onClick={() => toProfile(sessionUser.id)}/>
                    </div>

                    <div className="sessionUserInfo">
                        <div className="sessionUserName" onClick={() => toProfile(sessionUser.id)}>
                            {sessionUser.firstName} {sessionUser.lastName}
                        </div>

                        <div className="sessionUserHeadline">
                            {sessionUser.headline}
                        </div>

                        <div className="sessionUserAbout">
                            {sessionUser.about}
                        </div>
                    </div>
                </div>
            </div>

            <div className="feedBody">
                <div className='profileBoard' id="createPost">
                    <div className='authorPic'>
                        <img src={sessionUser.photoUrl} alt='defaultProfile' onClick={() => toProfile(sessionUser.id)}/>
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
                                <div className="createPostUserDetail" >
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
                                    <input type='file' id='uploadPostPic' ></input>
                                    <label htmlFor='uploadPostPic' className="uploadPhotoIcon"><i className="fa-regular fa-image"></i></label>
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
                    {orderedPosts && orderedPosts.map((post, index) => (
                    <div className='profileBoard' id='feedPost' key={index} >

                        <div className="authorInfo">
                            <div className='authorPic' onClick={() => toProfile(post.authorId)}>
                                <img src={post.authorPhoto} alt='defaultProfile' />
                            </div>
                            <div className="authorDetail">
                                <div className="authorName" onClick={() => toProfile(post.authorId)}>
                                    {post.authorFirstName} {post.authorLastName}
                                </div>
                                <div className="authorHeadline">
                                    {post.authorHeadline}
                                </div>
                            </div>
                            <div className="optionsContainer" onClick={(e) => {openMenu(e, index)}}>
                                <i className="fa-solid fa-ellipsis" id="postOptionsIcon"></i>
                            </div>

                            { showMenu === index && (
                                <div className="editOptions" ref={menuRef}>
                                    <div className="editChoices">
                                        <div className="positionButton" id='editPost' onClick={(e) => {
                                            e.stopPropagation();
                                            setEditModal(true)}}>
                                            <i className="fa-solid fa-pencil" id="editPostIcon"></i>Edit Post
                                        </div>
                                    </div>

                                    {editModal ?
                                    (<Modal onClose={closeEditModal}>
                                        <EditPage onClose={closeEditModal} post={post} />
                                    </Modal>) : null}


                                    <div className="editChoices">
                                        <div className="positionButton" id="deletePost" onClick={(e) => {
                                            e.stopPropagation();
                                            setDeleteModal(true);
                                        }}>
                                            <i className="fa-solid fa-trash-can" id="deleteIcon"></i>Delete Post
                                        </div>
                                    </div>
                                    
                                    {deleteModal ?
                                    (<div className="modal" id="deleteOutside">
                                        <div className="modal-background" onClick={closeDeleteModal} />
                                        <div className="deleteModal">
                                            <div className="deleteModalContent">
                                                <p>Delete post?</p>
                                                <p>Are you sure you want to permanently remove this post from LinkedUp?</p>
                                            </div>
                                            <div className="deleteConfirm">
                                                <button className='submit' onClick={closeDeleteModal}>Cancel</button>
                                                <button className='submit' onClick={() => handleDelete(post.id)}>Delete</button>
                                            </div>
                                        </div>
                                    </div>) : null}
                                </div>
                            )}
                        </div>

                        <div className="postBody">
                            <p>{post.body}</p>
                            {post.photoUrl ? <img src={post.photoUrl} alt='postPhoto'></img> : null}
                        </div>

                        <div className="postLikesComments">

                            {post.likesCount ? (
                            <div className="likesCount">
                                <i className="fa-regular fa-thumbs-up" id="likesCountIcon"></i>
                                {post.likesCount}
                            </div>) : 
                            <div className="likesCount">
                                <i className="fa-regular fa-thumbs-up" id="likesCountIcon"></i>
                                0
                            </div>}

                            {post.comments ?(
                            <div className="commentsCount" onClick={() => listComments(post.id, index)}>
                                {post.comments.length} comments
                            </div>) : null}
                            
                        </div>

                        <div className="postInteract">
                            <button className='postButtons' onClick={() => handleLike(sessionUser.id, post.id, index)}>
                                <i className="fa-solid fa-thumbs-up" id="likeButton"></i>
                                <span id="liketext">Like</span>
                            </button>
                            <button className='postButtons' onClick={() => handleOpenCreateComment(post.id, index)}>
                                <i className="fa-regular fa-comment-dots" id="commentButton"></i>Comment
                            </button>
                        </div>
                        
                        {openCreateComment === index ? (
                        <div className="createComment">
                            <div className="addComment">
                                <div className='authorPic'>
                                    <img src={sessionUser.photoUrl} alt='defaultProfile' />
                                </div>

                                <input className='startPost' placeholder="Add a comment..." id="startComment" onChange={commentOnChange}/>
                            </div>
                            <button className='submit' id='postComment' onClick={() => handleComment(post.id)}>Post</button>
                        </div>
                        ) : null}


                        { comments && <CommentPage postId = {post.id}/>}

                    </div>
                    ))}
                </div>
            </div>

            <div className="homeFoot">
                <div className='profileBoard' id="homeFoot">
                    <div className="news">LinkedUp News</div>
                        <ul className="newsList">
                            <li>&bull; <a target='_blank' rel='noreferrer' href='https://linkedup-ptj7.onrender.com/'>New LinkedUp</a></li>
                            <li>&bull; <a target='_blank' rel='noreferrer' href='https://kchannn13.github.io/The-Adventures-of-Gary-the-Snail/'>New Game</a></li>
                        </ul>
                </div>
                <div className="linkedUpbottom">
                    <div className="bottomDetails">
                        <p className="developed">developed by Kevin Chan</p>

                        <div className="logoAnd2023">
                            <img src={logo} alt='logo' id="bottomlogo"></img>
                            <p>LinkedUp Corporation © 2023</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        )}
    </>
    )
}

export default PostPage;