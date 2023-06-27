import { Modal } from "../../context/Modal";
import { useDispatch, useSelector } from "react-redux";
import { editUserAbout, fetchUserProfile } from "../../store/profile";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import { useEffect, useState } from "react";

function About ({onClose}) {
    const {userId} = useParams();
    const user = useSelector(state => state.users[userId]);
    const dispatch = useDispatch();
    const [about, setAbout] = useState(user?.about?? '');

    const handleSubmit = async (e) => {
        e.preventDefault();
        const profile = {
            id: userId,
            about: about,
            firstName: user.firstName,
            headline: user.headline,
            lastName: user.lastName,
            location: user.location,
            photoUrl: user.photoUrl
        };
        dispatch(editUserAbout(profile));
        onClose();
    }

    return (
        <div className="fontFamily">
            <form className='modalForm'>

                <button onClick={onClose} className='closeButton'><i className="fa-solid fa-xmark"></i></button>
                <div className="formHeadline">
                    <p>Edit about</p>
                </div>

                <div className="formDetail">
                    <div className="formInput">
                        <label htmlFor="title">You can write about your years of experience, industry, or skills. People also talk about their achievements or previous job experiences.</label>
                        <textarea
                        id="description"
                        type="text"
                        value={about}
                        onChange={(e) => setAbout(e.target.value)}
                        />
                    </div>
                </div>

                <div className="submitRow">
                    <button type="submit" className='submit' onClick={handleSubmit}>Save</button>
                </div>
            </form>
        </div>
    );
};

export default About;