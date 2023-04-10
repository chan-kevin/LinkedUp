import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect, useParams } from 'react-router-dom';
import { fetchUserProfile } from '../../store/profile';
import './Profile.css';
import profileBackground from './assets/profileBackground.jpeg';
import defaultProfile from './assets/pikachu.png';
import companyLogo from './assets/logo.jpg';
import DropDown from './DropDown';
import ExperienceFormModal from '../ExperienceFormModal';
import SearchBar from '../SearchBar/SearchBar';
import { createConnection, removeConnection } from '../../store/connection';

const ProfilePage = () => {
    const { userId } = useParams();
    const dispatch = useDispatch();
    const sessionUser = useSelector(state => state.session.user);
    const user = useSelector(state => state.users[userId]);
    const experiences = useSelector(state => Object.values(state.experiences))
    const educations = useSelector(state => Object.values(state.educations))
    const [logoUrl, setLogoUrl] = useState('');
    const apiKey = process.env.CLEARBIT_API_KEY;
    

    // const [isLoading, setIsLoading] = useState(true);

    // useEffect(() => { const fetchDate = () => {
    //     dispatch(fetchUserProfile(id));
    //     setIsLoading(false);
    // }
    //     fetchDate();
    // }, [dispatch, id]);
    

    useEffect(() => {
        dispatch(fetchUserProfile(userId));
        
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
    }, [dispatch, userId]);


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

    return (
        <div className='fontFamily' id='profileContent'>
            <div className='profileBoard'>

                <div className='profileBackground'>
                    <img src={profileBackground} alt='background'/>
                </div>

                <div className='profile'>
                    <img src={defaultProfile} alt='defaultProfile' />
                </div>
                <div className='userInfo'>
                    {user && 
                    <div>
                        <div className='userInfoSchool'>
                            <h1>{user.firstName + ' ' + user.lastName}</h1>
                            <img src={experiences[2].logo} alt='companyLogo' />
                            <p>{educations[0].school}</p>
                        </div>
                        <h2>{experiences[0].title + ' at ' + experiences[0].company}</h2>
                        <h3>{user.location}</h3>
                    </div>
                    }
                
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
                    </div>
                </div>
            </div>

            <div className='profileBoard'>
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

            <div className='profileBoard'>
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