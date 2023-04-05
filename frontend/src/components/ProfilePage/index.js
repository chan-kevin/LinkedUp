import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { fetchUserProfile } from '../../store/profile';


const ProfilePage = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    // const userProfile = useSelector(state => state.session.userProfile);

    useEffect(() => {
        dispatch(fetchUserProfile(id));
    }, [dispatch, id]);

    console.log("Rendering ProfilePage component");

    const handleButtonClick = () => {
        console.log('Button clicked!');
        // do something when the button is clicked
    };

    return (
        <div>
            <p>This is the profile page for user {id}.</p>
            <button type='submit' onClick={handleButtonClick}>Click me!</button>
        </div>
    );
};

export default ProfilePage;