import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect, useParams } from 'react-router-dom';
import { fetchUserProfile } from '../../store/profile';
import './ExperiencePage.css';
import DropDown from '../ProfilePage/DropDown';


const ExperiencePage = () => {
    const { userId } = useParams();
    const dispatch = useDispatch();
    const sessionUser = useSelector(state => state.session.user);
    const user = useSelector(state => state.users[userId]);
    const experiences = useSelector(state => Object.values(state.experiences))

    useEffect(() => {
        dispatch(fetchUserProfile(userId));
    }, [dispatch, userId]);

    if (!sessionUser) return <Redirect to="/" />;

    return (
        <div className='fontFamily' id='profileContent'>
            <div className='profileBoard'>
                <div className='headline'>
                    <h1>Experience</h1>
                    <DropDown />
                </div>

                {experiences && experiences.map(experience => (
                <div className='profileDetailList' key={experience.id}>
                    <div className='profileLogo'>
                        <img src={experience.logo} alt='companyLogo' />
                    </div>
                    <ul className='experienceDetail'>
                        <li className='detailHeading'>{experience.title}</li>
                        <li className='detailSubHeading'>{experience.company}</li>
                        <li className='period'>{experience.startMonth + ' ' + experience.startYear + ' - ' + experience.endMonth + ' ' + experience.endYear}</li>
                        <li className='detailLocation'>{experience.location}</li>
                        <li className='detailDescription'>{'- ' + experience.description}</li>
                        <li className='skills'><p>Skills: </p>{experience.skills}</li>
                    </ul>
                </div>
                ))}
            </div>
        </div>
    );
};

export default ExperiencePage;