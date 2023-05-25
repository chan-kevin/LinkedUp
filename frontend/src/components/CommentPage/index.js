import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import './CommentPage.css'
// import { getAllPosts } from "../../store/post";
import { Modal } from "../../context/Modal";
import EditCommentPage from "./edit";
import { removeComment } from "../../store/comment";


const CommentPage = ({postId}) => {
    const comments = useSelector(state => state.comments)
    const history = useHistory();
    const [menu, setMenu] = useState(false);
    const [editModal, setEditModal] = useState(false);
    const [deleteModal, setDeleteModal] = useState(false);
    const dispatch = useDispatch();

    useEffect(() => {
        // if (!menu) return;

        const closeMenu = () => {
            if (!editModal){
                setMenu(null);
            }
        };

        // document.addEventListener('click', (e) => {
        //     e.preventDefault();
        //     e.stopPropagation();
        // });
        document.addEventListener('click', closeMenu);

        return () => document.removeEventListener('click', closeMenu);

    }, [menu, deleteModal, editModal])

    const toProfile = (userId) => {
        history.push(`/users/${userId}`)
    }

    const handleDelete = (id) => {
        dispatch(removeComment(id));
        closeDeleteModal();
    }
    
    const closeDeleteModal = () => {
        setDeleteModal(false);
    }

    let orderedComments;
    if (Object.values(comments).length > 0){
    orderedComments = (comments?.commentIds.map((commentId) => { return comments[commentId]})).filter(comment => comment?.postId === postId)
    }

    const openMenu = (e, index) => {
        e.stopPropagation();
        setMenu(index);
    }

    const closeEditModal = () => {
        setEditModal(false);
    }
    
    return (orderedComments?.map((comment, index) => {
        return (
            <div className="comments" key={index}>

                <div className='authorPic' onClick={() => toProfile(comment.commenterId)}>
                    <img src={comment?.commenterPhoto} alt='defaultProfile' />
                </div>

                <div className="commentsDetail" key={comment.id}>
                    <div className="commentsEditContainer" onClick={(e) => {openMenu(e, index)}}>
                        <i className="fa-solid fa-ellipsis"></i>
                    </div>
                        { menu === index ? (
                            <div className="editOptions" id="editCommentsOptions">
                                <div className="editChoices">
                                    <div className="positionButton" id='editPost' onClick={(e) => {
                                        e.stopPropagation();
                                        setEditModal(true);
                                        }}>
                                        <i className="fa-solid fa-pencil" id="editPostIcon"></i>Edit Comment
                                    </div>
                                </div>

                                {editModal ?
                                    (<Modal onClose={closeEditModal}>
                                        <EditCommentPage onClose={closeEditModal} comment={comment} />
                                    </Modal>) : null}

                                <div className="editChoices">
                                    <div className="positionButton" id="deletePost" onClick={(e) => {
                                        e.stopPropagation();
                                        setDeleteModal(true);
                                    }}>
                                        <i className="fa-solid fa-trash-can" id="deleteIcon"></i>Delete Comment
                                    </div>
                                </div>

                                {deleteModal ?
                                    (<div className="modal" id="deleteOutside">
                                        <div className="modal-background" onClick={closeDeleteModal} />
                                        <div className="deleteModal">
                                            <div className="deleteModalContent">
                                                <p>Delete comment?</p>
                                                <p>Are you sure you want to permanently remove this comment from LinkedUp?</p>
                                            </div>
                                            <div className="deleteConfirm">
                                                <button className='submit' onClick={closeDeleteModal}>Cancel</button>
                                                <button className='submit' onClick={() => handleDelete(comment.id)}>Delete</button>
                                            </div>
                                        </div>
                                    </div>) : null}

                            </div>
                        ): null }

                    <div className="authorName" id="commenter-name">
                        <p onClick={() => toProfile(comment.commenterId)}>{comment?.commenterFirstName} {comment?.commenterLastName}</p>
                    </div>

                    <div className="authorHeadline">
                        {comment?.commenterHeadline}
                    </div>

                    <div className="commentBody">
                        {comment?.body}
                    </div>

                </div>
            </div>)
            })
        )
    }


export default CommentPage;