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
        window.scrollTo(0,0);
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

                        <li className='detailDescription'>
                            {experience.description.split('\n').map((line, index) => (
                                <span key={index} className='descriptiontext'>
                                    {line}
                                    <br />
                                </span>
                            ))}    
                        </li>
                        {/* <li className='skills'><p>Skills: </p>{experience.skills}</li> */}
                    </ul>
                </div>
                ))}
            </div>
            <footer className='footer'>
                <div className='footer-grid'>
                    <div className='skill-grid'>
                        <p>Ruby</p>
                        <p>Rails</p>
                        <p>JavaScript</p>
                        <p>React.js</p>
                        <p>Redux.js</p>
                        <p>PostgreSQL</p>
                        <p>HTML5</p>
                        <p>CSS3</p>
                        <p>AWS</p>
                    </div>
                    <div className='contact'>
                        <div className='contact-block'>
                            <i className="fa-solid fa-circle-question question-mark" />
                            <div className='contact-detail'>
                                <p><a href="mailto:chankevin13@gmail.com?">Questions?</a></p>
                                <p>Email our developer.</p>
                            </div>
                        </div>
                    </div>
                </div>
                <p className='corporation'>LinkedUp Corporation © 2023</p>
            </footer>
        </div>
    );
};

export default ExperiencePage;