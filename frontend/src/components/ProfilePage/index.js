import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect, useParams } from 'react-router-dom';
import { editUserProfile, fetchUserProfile } from '../../store/profile';
import './Profile.css';
import profileBackground from './assets/profileBackground.jpeg';
import defaultProfile from './assets/pikachu.png';
import companyLogo from './assets/logo.jpg';
import DropDown from './DropDown';
import ExperienceFormModal from '../ExperienceFormModal';
import SearchBar from '../SearchBar/SearchBar';
import { createConnection, removeConnection } from '../../store/connection';
import { Modal } from '../../context/Modal';
import PostPage from '../PostPage';
import defaultLogo from './assets/nologo.jpeg'

const ProfilePage = () => {
    const { userId } = useParams();
    const dispatch = useDispatch();
    const sessionUser = useSelector(state => state.session.user);
    const user = useSelector(state => state.users[userId]);
    const experiences = useSelector(state => Object.values(state.experiences))
    const educations = useSelector(state => Object.values(state.educations))
    const [logoUrl, setLogoUrl] = useState('');
    const apiKey = process.env.CLEARBIT_API_KEY;
    const [photoFile, setPhotoFile] = useState (null);
    const [photoUrl, setPhotoUrl] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [secondModal, setSecondModal] = useState(false);
    const [saveProfile, setSaveProfile] = useState(false);
    

    // const [isLoading, setIsLoading] = useState(true);

    // useEffect(() => { const fetchDate = () => {
    //     dispatch(fetchUserProfile(id));
    //     setIsLoading(false);
    // }
    //     fetchDate();
    // }, [dispatch, id]);
    

    useEffect(() => {
        // user.photoUrl ||= defaultProfile;
        dispatch(fetchUserProfile(userId));
        // user.photoUrl ||= defaultProfile;
        
        // const fetchCompanyLogo = async() => {
        //     const response = await fetch(`https://company.clearbit.com/v1/domains/find?name=google`, {
        //         headers: {
        //           Authorization: `Bearer ${apiKey}`,
        //         }
        //       });        
        //   const data = await response.json();
        //   setLogoUrl(data.logo);
        // }
        // fetchCompanyLogo();
        // setIsLoading(false);
    }, [dispatch, userId, saveProfile]);


    const handleConnect = () => {
        const connection = {
            connecterId: sessionUser.id,
            connecteeId: parseInt(userId)
        };

        dispatch(createConnection(connection))
    }

    const unconnect = () => {
        dispatch(removeConnection(userId))
    }
    // useEffect(() => {
    //     const fetchCompanyLogo = async() => {
    //         const response = await fetch(`https://company.clearbit.com/v1/domains/find?name=google`, {
    //             headers: {
    //               Authorization: `Bearer ${apiKey}`,
    //             }
    //           });        
    //       const data = await response.json();
    //       setLogoUrl(data.logo);
    //     }
    //     fetchCompanyLogo();
    //   }, []);

    if (!sessionUser) return <Redirect to="/" />;

    // if (isLoading) {
    //     return <p>Loading...</p>
    // }

    const changeProfilePic = ({ currentTarget}) => {
        const file = currentTarget.files[0];
        if (file) {
            setPhotoFile(file);
            const fileReader = new FileReader();
            fileReader.readAsDataURL(file);
            fileReader.onload = () => setPhotoUrl(fileReader.result);
        } 
        else setPhotoUrl(defaultProfile);
        setSaveProfile(true);
    }

    const handleSubmit = async e => {
        e.preventDefault();
        const formData = new FormData()
        formData.append('user[id]', userId);
        if (photoFile){
            formData.append('user[photo]' ,photoFile);
            dispatch(editUserProfile(formData, userId));
            setSaveProfile(false);
        }
        setShowModal(false);
    }

    const deleteProfilePic = async e => {
        e.preventDefault();
        const formData = new FormData()
        formData.append('user[id', userId);
        if (defaultProfile) {
            formData.append('user[photo]', defaultProfile);
            dispatch(editUserProfile(formData, userId));
            setSaveProfile(false);
        }
        setShowModal(false);
    }

    const onClose = () => {
        setShowModal(false);
        setSecondModal(false);
    }

    const openProfileModal = () => {
        setShowModal(true);
    }

    const openSecondModal = () => {
        setSecondModal(true);
    }

    let preview = null;
    if (photoUrl) preview = <img src={photoUrl} alt="" />;

    return (
        <div className='fontFamily' id='profileContent'>
            <div className='profileBoard2'>
                {user && 
                <>
                    <div className='profileBackground'>
                        <img src={profileBackground} alt='background'/>
                    </div>

                    <div className='profile' onClick={openProfileModal}>
                        <img src={user.photoUrl} alt='defaultProfile' />
                    </div>
                </>
                }

                {showModal && (
                    <Modal onClose={onClose}>
                        {!secondModal ?
                        <div className='profileModal'>
                            <button onClick={onClose} className='closeButton' id='changeProfileCloseButton'>
                                <i className="fa-solid fa-xmark" id='changeProfileClose'></i>
                            </button>

                            <div className='changeProfileTitle'>Profile Picture</div>

                            <div className='changeProfileBody'>
                                <img src={user.photoUrl} alt='defaultProfile' id='changeDefaultPic'/>
                            </div>

                            <footer className='changeProfileFoot'>

                                <button className='changeProfileButtons' onClick={deleteProfilePic}>
                                    <i className="fa-solid fa-trash-can"></i>
                                    <span className='navTitle'>Delete</span>
                                </button>

                                <button onClick={openSecondModal} className='changeProfileButtons'>
                                    <i className="fa-solid fa-camera"></i>
                                    <span className='navTitle'>Add Photos</span>
                                </button>
                            </footer>
                        </div> :
                        <div className='profileModal' id='secondModal'>
                            <button onClick={onClose} className='closeButton' id='changeProfileCloseButton2'>
                                <i className="fa-solid fa-xmark" id='changeProfileClose2'></i>
                            </button>

                            <div className='changeProfileTitle' id='changeProfileTitle2'>Change photo</div>

                            <div className='changeProfileBody'>
                                <p id='recognize'>{sessionUser.firstName}, help others recognize you!</p>
                                {preview ? preview :
                                 <img src={user.photoUrl} alt='defaultProfile' id='changeDefaultPic'/>
                                 }
                                <p id='require'>On LinkedUp, we require members to use their real identities, so take or upload a photo of yourself. </p>
                            </div>

                            <footer className='changeProfileFoot' id='changeProfileFoot2'>
                                {!saveProfile ?
                                <div className="uploadWrapper">
                                    <input type='file' id='uploadInput' onChange={changeProfilePic}></input>
                                    <label className='submit' id='uploadPhoto'>Upload photo</label>
                                </div>
                                :
                                <div className="uploadWrapper">
                                    <button className='submit' id='uploadPhoto' onClick={handleSubmit}>Save</button>
                                </div>
                                }
                            </footer>
                        </div>}
                    </Modal>
                )}

                {/* <input type="file" onChange={changeProfilePic} />
                <button onClick={handleSubmit}>submitTest</button>
                {photoUrl ? <img src={photoUrl} alt="test" /> : null} */}

                <div className='userInfo'>
                    {user && 
                    <div>
                        <div className='userInfoSchool'>
                            <h1>{user.firstName + ' ' + user.lastName}</h1>

                            <div className='userInfoCompanyTotal'>
                                { experiences &&
                                <div className='userInfoCompany'>
                                    <img src={experiences[experiences.length - 1]?.logo} alt='companyLogo' />
                                    <p>{experiences[experiences.length - 1]?.company}</p>
                                </div> }
                            </div>

                        </div>
                        <h2>{user.headline}</h2>
                        <h3>{user.location}</h3>
                    </div>
                    }
                    {sessionUser.id !== user?.id ?
                    <div className='interactButtons'>
                    {user?.connected ?
                        <button onClick={unconnect} className='submit' id='connectButton'>
                            <i className="fa-solid fa-user-plus" id='connectIcon'></i>
                            <p>Unconnect</p>
                        </button> : 
                        <button onClick={handleConnect} className='submit' id='connectButton'>
                        <i className="fa-solid fa-user-plus" id='connectIcon'></i>
                        <p>Connect</p>
                    </button>
                    }
                    </div> : null}

                </div>
            </div>

            <div className='profileBoard2'>
                <div className='headline'>
                    <h1>About</h1>
                </div>
                {user && user.about ?
                <div className='profileDetailList'>
                    <p className='detailSubHeading'>{user.about}</p>
                </div> : null }
            </div>

            <div className='profileBoard2'>
                <div className='headline'>
                    <div className='headlineWithAdd'>
                        <h1>Experience</h1>
                        { sessionUser.id === parseInt(userId) ? <DropDown /> : null}
                    </div>
                    {/* <ExperienceFormModal /> */}
                </div>

                {experiences && experiences.map(experience => (
                <div className='profileDetailList' key={experience.id}>
                    <div className='profileLogo'>
                        {experience.logo ?
                        <img src={experience.logo} alt='companyLogo' /> :
                        <img src={defaultLogo} alt='companyLogo' />}
                    </div>
                    <ul className='experienceDetail'>
                        <li className='detailHeading'>{experience.title}</li>
                        <li className='detailSubHeading'>{experience.company}</li>
                        <li className='period'>
                            {experience.startMonth + ' ' + experience.startYear + ' - '} 
                            {experience.current ? 'Present' : (experience.endMonth + ' ' + experience.endYear)}
                        </li>
                        <li className='detailLocation'>{experience.location}</li>
                        <li className='detailDescription'>{'- ' + experience.description}</li>
                        {/* <li className='skills'><p>Skills: </p>{experience.skills}</li> */}
                    </ul>
                </div>
                ))}
            </div>

            <div className='profileBoard2'>
                <div className='headline'>
                    <h1>Education</h1>
                </div>

                {educations && educations.map(education => (
                <div className='profileDetailList' key={education.id}>
                    <div className='profileLogo'>
                        <img src={experiences[2].logo} alt='companyLogo' />
                    </div>
                    <ul className='experienceDetail'>
                        <li className='detailHeading'>{education.school}</li>
                        <li className='detailSubHeading'>{education.degree}</li>
                        <li className='period'>{education.startMonth + ' ' + education.startYear + ' - ' + education.endMonth + ' ' + education.endYear}</li>
                    </ul>
                </div>
                ))}
            </div>
        </div>
        
    );
};

export default ProfilePage;