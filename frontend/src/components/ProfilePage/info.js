import { useDispatch, useSelector } from "react-redux";
import { editUserAbout } from "../../store/profile";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import { useState } from "react";

function Info ({onClose}) {
    const {userId} = useParams();
    const user = useSelector(state => state.users[userId]);
    const dispatch = useDispatch();
    const [firstName, setFistName] = useState(user?.firstName?? '');
    const [lastName, setLastName] = useState(user?.lastName?? '');
    const [headline, setHeadline] = useState(user?.headline?? '');
    const [location, setLocation] = useState(user?.location?? '');

    const handleSubmit = async (e) => {
        e.preventDefault();
        const profile = {
            id: userId,
            about: user.about,
            firstName: firstName,
            headline: headline,
            lastName: lastName,
            location: location,
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
                <p>Edit intro</p>
            </div>

            <div className="formDetail">
                <p><sup>*</sup> Indicates required</p>

                <div className="formInput">
                    <label htmlFor="title">First name<sup>*</sup></label>
                    <input
                    id="title"
                    type="text"
                    value={firstName}
                    onChange={(e) => setFistName(e.target.value)}
                    required
                    />
                </div>
                
                    
                <div className="formInput" id="company-name">
                    <label htmlFor="company">Last name<sup>*</sup></label>
                    <input
                    id="company"
                    type="text"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    required
                    />
                </div>

                <div className="formInput" id="company-name">
                    <label htmlFor="headline">Headline<sup>*</sup></label>
                    <input
                    id="headline"
                    type="text"
                    value={headline}
                    onChange={(e) => setHeadline(e.target.value)}
                    required
                    />
                </div>

                <h1 className="location-title">Location</h1>

                <div className="formInput">
                    <label htmlFor="location">Country/Region<sup>*</sup></label>
                    <input
                    id="location"
                    type="text"
                    value={location}
                    placeholder="Ex: United States"
                    onChange={(e) => setLocation(e.target.value)}
                    required
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

export default Info;