import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect, useHistory, useParams } from 'react-router-dom';
import { fetchUserProfile } from '../../store/profile';
import '../ExperiencePage/ExperiencePage.css';
import EditFormModal from './EditFormModal';
import { Modal } from '../../context/Modal';
import EducationForm from '../ProfilePage/education';
import defaultLogo from '../ProfilePage/assets/nologo.jpeg'



const EducationPage = () => {
    const { userId } = useParams();
    const dispatch = useDispatch();
    const sessionUser = useSelector(state => state.session.user);
    const educations = useSelector(state => Object.values(state.educations))
    const history = useHistory();
    const [showEducationModal, setShowEducationModal] = useState(false);

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
                        <h1>Education</h1>
                        { sessionUser.id === parseInt(userId) ? 
                            <div className="button">
                                <button onClick={() => setShowEducationModal(true)} className='addPosition'>
                                    <i className="fa-solid fa-plus" id='plusIcon'></i>
                                </button>
                            </div> : null}

                            {showEducationModal && (
                            <Modal onClose={() => setShowEducationModal(false)}>
                                <EducationForm onClose={() => setShowEducationModal(false)} />
                            </Modal>
                        )}
                    </div>
                </div>

                {educations && educations.map(education => (
                <div className='profileDetailList' key={education.id}>
                    <div className='profileLogo'>
                        <img src={defaultLogo} alt='default'/>
                    </div>
                    <ul className='educationDetail'>

                        <div className='firstHalf'>
                            <div className='infoInFirstHalf'>
                                <li className='detailHeading'>{education.school} </li>
                                <li className='detailSubHeading'>{education.degree}</li>
                                <li className='period'>{education.startMonth + ' ' + education.startYear + ' - ' + education.endMonth + ' ' + education.endYear}</li>
                            </div>

                            <EditFormModal education={education}/>
                        </div>
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