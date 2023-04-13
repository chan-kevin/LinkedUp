import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Modal } from "../../context/Modal";
import { updateComment } from "../../store/comment";
import { updatePost } from "../../store/post";

const EditCommentPage = ({onClose, comment}) => {
    const [body, setBody] = useState(comment.body ?? '');
    const dispatch = useDispatch();
    const sessionUser = useSelector(state => state.session.user);

    const saveEdited = () => {
        dispatch(updateComment(comment.id, body))
        onClose();
    }

    return (
        <div className='profileModal' id='secondModal'>
            <button onClick={onClose} className='closeButton' id='changeProfileCloseButton2'>
                <i className="fa-solid fa-xmark" id='changeProfileClose2'></i>
            </button>

            <div className='changeProfileTitle' id='changeProfileTitle2'>Edit Comment</div>

            <div className="createPostBody">
                <div className="createPostUserDetail">
                    <div className='authorPic'>
                        <img src={sessionUser.photoUrl} alt='defaultProfile' />
                    </div>
                    <div className="createPostUserName">
                        {sessionUser.firstName} {sessionUser.lastName}
                    </div>
                </div>
                <textarea type='text' value={body} placeholder="What do you want to talk about?" onChange={(e) => setBody(e.target.value)} className="createPostInput"/>
            </div>

            <footer className="createPostFoot">
                <div className="uploadPhoto">
                    <label className="uploadPhotoIcon"><i className="fa-regular fa-image"></i></label>
                </div>
                <div className="submitPost">
                    <button className='submit' onClick={saveEdited}>Save</button>
                </div>
            </footer>
        </div>
    )
}

export default EditCommentPage;