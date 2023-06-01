import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect, useHistory, useParams } from 'react-router-dom';
import { fetchUserProfile } from '../../store/profile';
import './ExperiencePage.css';
import DropDown from '../ProfilePage/DropDown';
import EditFormModal from './EditFormModal';
import CompanyLogo from '../ProfilePage/Companylogo';


const ExperiencePage = () => {
    const { userId } = useParams();
    const dispatch = useDispatch();
    const sessionUser = useSelector(state => state.session.user);
    const experiences = useSelector(state => Object.values(state.experiences))
    const history = useHistory();

    const goBackButton = (e) => {
        e.preventDefault();
        history.push(`/users/${userId}`);
    }

    useEffect(() => {
        dispatch(fetchUserProfile(userId));

    }, [dispatch, userId]);

    if (!sessionUser) return <Redirect to="/" />;

    return (
        <div className='fontFamily' id='profileContent'>
            <div className='profileBoard'>
                <div className='headline'>
                    <button onClick={goBackButton} className='addPosition'>
                        <i className="fa-solid fa-arrow-left" id='goBackButton'></i>
                    </button>
                    <div className='headlineWithAdd'>
                        <h1>Experience</h1>
                        <DropDown />
                    </div>
                </div>

                {experiences && experiences.map(experience => (
                <div className='profileDetailList' key={experience.id}>
                    <div className='profileLogo'>
                        <CompanyLogo company={experience.company} />
                    </div>
                    <ul className='experienceDetail'>

                        <div className='firstHalf'>
                            <div className='infoInFirstHalf'>
                                <li className='detailHeading'>{experience.title} </li>
                                <li className='detailSubHeading'>{experience.company}</li>
                                <li className='period'>{experience.startMonth + ' ' + experience.startYear + ' - ' + experience.endMonth + ' ' + experience.endYear}</li>
                                <li className='detailLocation'>{experience.location}</li>
                            </div>

                            <EditFormModal experience={experience}/>
                        </div>

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