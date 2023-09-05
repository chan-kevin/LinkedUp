import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updatePost } from "../../store/post";

const EditPage = ({onClose, post}) => {
    const [body, setBody] = useState(post.body ?? '');
    const [photoUrl, setPhotoUrl] = useState(null);
    const [photoFile, setPhotoFile] = useState(null);
    const dispatch = useDispatch();
    const sessionUser = useSelector(state => state.session.user);

    const saveEdited = () => {
        const formData = new FormData();
        formData.append('id', post.id);
        formData.append('post[body]', body);
        if (photoFile) {
            formData.append('post[photo]', photoFile);
        }
        dispatch(updatePost(post.id, formData));
        setPhotoUrl(null);
        onClose();
    }

    const changePostPic = ({ currentTarget}) => {
        const file = currentTarget.files[0];
        if (file) {
            setPhotoFile(file);
            const fileReader = new FileReader();
            fileReader.readAsDataURL(file);
            fileReader.onload = () => setPhotoUrl(fileReader.result);
        } 
        else setPhotoUrl(null);
    }

    return (
        <div className='profileModal' id='secondModal' onClick={(e) => {e.stopPropagation()}}>
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
                {post.photoUrl? <img src={photoUrl? photoUrl: post.photoUrl} alt='post' className='previewPic' /> : null}
            </div>

            <footer className="createPostFoot">
                <div className="uploadPhoto">
                    <label htmlFor='uploadPostPic' className="uploadPhotoIcon"><i className="fa-regular fa-image"></i>
                    <input type='file' id='uploadPostPic' onChange={changePostPic}></input></label>
                </div>
                <div className="submitPost">
                    <button className='submit' onClick={saveEdited}>Save</button>
                </div>
            </footer>
        </div>
    )
}

export default EditPage;