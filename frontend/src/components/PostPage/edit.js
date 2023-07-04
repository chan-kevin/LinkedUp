import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updatePost } from "../../store/post";

const EditPage = ({onClose, post}) => {
    const [body, setBody] = useState(post.body ?? '');
    const dispatch = useDispatch();
    const sessionUser = useSelector(state => state.session.user);

    const saveEdited = () => {
        const newPost = {
            id: post.id,
            body
        }
        dispatch(updatePost(newPost))
        onClose();
    }

    return (
        <div className='profileModal' id='secondModal'>
            <button onClick={onClose} className='closeButton' id='changeProfileCloseButton2'>
                <i className="fa-solid fa-xmark" id='changeProfileClose2'></i>
            </button>

            <div className='changeProfileTitle' id='changeProfileTitle2'>Edit Post</div>

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

export default EditPage;