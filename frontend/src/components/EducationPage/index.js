import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect, useHistory, useParams } from 'react-router-dom';
import { fetchUserProfile } from '../../store/profile';
import '../ExperiencePage/ExperiencePage.css';
import DropDown from '../ProfilePage/DropDown';
// import EditFormModal from './EditFormModal';
import CompanyLogo from '../ProfilePage/Companylogo';
import EditFormModal from './EditFormModal';


const EducationPage = () => {
    const { userId } = useParams();
    const dispatch = useDispatch();
    const sessionUser = useSelector(state => state.session.user);
    const educations = useSelector(state => Object.values(state.educations))
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
                        <h1>Education</h1>
                        <DropDown />
                    </div>
                </div>

                {educations && educations.map(education => (
                <div className='profileDetailList' key={education.id}>
                    {/* <div className='profileLogo'>
                        <CompanyLogo company={education.company} />
                    </div> */}
                    <ul className='educationDetail'>

                        <div className='firstHalf'>
                            <div className='infoInFirstHalf'>
                                <li className='detailHeading'>{education.school} </li>
                                <li className='detailSubHeading'>{education.degree}</li>
                                <li className='period'>{education.startMonth + ' ' + education.startYear + ' - ' + education.endMonth + ' ' + education.endYear}</li>
                                {/* <li className='detailLocation'>{education.location}</li> */}
                            </div>

                            <EditFormModal education={education}/>
                        </div>

                        {/* <li className='detailDescription'>
                            {education.description.split('\n').map((line, index) => (
                                <span key={index} className='descriptiontext'>
                                    {line}
                                    <br />
                                </span>
                            ))}    
                        </li> */}
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

export default EducationPage;