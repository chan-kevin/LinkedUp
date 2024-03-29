import React, { useEffect, useRef, useState } from "react";
import { createExperience, editExperience, removeExperience } from '../../store/experience';
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import './ExperienceForm.css';

function ExperienceForm ({ onClose, experience }) {
    const { userId } = useParams();
    const dispatch = useDispatch();
    const [title, setTitle] = useState(experience?.title ?? '');
    const [suggestCompany, setSuggestCompany] = useState([]);
    const [company, setCompany] = useState(experience?.company ?? '');
    const [location, setLocation] = useState(experience?.location ?? '');
    const [startMonth, setStartMonth] = useState(experience?.startMonth ?? '');
    const [startYear, setStartYear] = useState(experience?.startYear ?? '');
    const [endMonth, setEndMonth] = useState(experience?.endMonth ?? '');
    const [endYear, setEndYear] = useState(experience?.endYear ?? '');
    const [description, setDescription] =useState(experience?.description ?? '');
    const [showMenu, setShowMenu] = useState(false);
    const [companyLogo, setCompanyLogo] = useState('');
    const [current, setCurrent] = useState(false);

    const suggestListRef = useRef(null);

    useEffect(() => {
        if (!showMenu) return;
        const fetchCompanyName = async() => {
            if (company) {
                const response = await fetch(`https://autocomplete.clearbit.com/v1/companies/suggest?query=${company}`)
                const data = await response.json();
                setSuggestCompany(data);
            }
        }
        fetchCompanyName()
        setCompanyLogo('')

        const closeMenu = () => {
            setShowMenu(false);
        };
      
        suggestListRef.current.addEventListener('mousedown', (e) => {
            e.preventDefault();
            e.stopPropagation();
          });
          document.addEventListener('mousedown', closeMenu);

        return () => document.removeEventListener('mousedown', closeMenu);
    }, [company, showMenu])

    const handleSubmit =  async (e) => {
        e.preventDefault();
        if (current) {
            setEndMonth('');
            setEndYear('');
        }

        const newExperience = {
            id: experience? experience.id : '',
            current,
            title,
            company,
            logo: companyLogo,
            location,
            startMonth,
            startYear,
            userId,
            endMonth,
            endYear,
            description
        };
        if (experience) {
            await dispatch(editExperience(newExperience))
        } else {
            await dispatch(createExperience(newExperience));
        }
        onClose();
    };

    const handleDelete = async (e) => {
        e.preventDefault();
        await dispatch(removeExperience(experience.id));
        onClose();
    }

    const companyInput = (e) => {
        e.preventDefault();
        setCompany(e.target.value);
    }

    const openMenu = (e) => {
        if (showMenu) return;
        setShowMenu(true);
    };

    const autoCompanyInput = (input) => {
        return () => {
            setCompany(input.name);
            setCompanyLogo(input.logo)
            setShowMenu(false);
          };
    }
    
    return (
        <div className="fontFamily">
        <form onSubmit={handleSubmit} className='modalForm'>

            <button onClick={onClose} className='closeButton'><i className="fa-solid fa-xmark"></i></button>
            <div className="formHeadline">
                { experience ? <p>Edit experience</p> : <p>Add experience</p>}
            </div>

            <div className="formDetail">
                <p><sup>*</sup> Indicates required</p>

                <div className="formInput">
                    <label htmlFor="title">Title<sup>*</sup></label>
                    <input
                    id="title"
                    type="text"
                    value={title}
                    placeholder="Ex: Full Ftack Developer"
                    onChange={(e) => setTitle(e.target.value)}
                    required
                    />
                </div>
                
                    
                <div className="formInput" id="company-name">
                    <label htmlFor="company">Company name<sup>*</sup></label>
                    {companyLogo ? <img src={companyLogo} alt='logo' id="companyLogo" /> : null}
                    <input
                    id="company"
                    type="text"
                    value={company}
                    placeholder="Google"
                    onChange={companyInput}
                    onClick={openMenu}
                    required
                    />
                    <ul className="companySearch" ref={suggestListRef}>
                        {showMenu && suggestCompany.map((suggest, index) => (
                            <li className="companyResult" onClick={autoCompanyInput(suggest)} key={index}>
                                <img src={suggest.logo} alt='logo' id="searchLogo"/>
                                <div>{suggest.name}</div>
                            </li>
                        ))}
                    </ul>
                </div>

                <div className="formInput">
                    <label htmlFor="location">Location</label>
                    <input
                    id="location"
                    type="text"
                    value={location}
                    placeholder="Ex: London, United Kingdom"
                    onChange={(e) => setLocation(e.target.value)}
                    />
                </div>

                <div className="formInput">
                    <label htmlFor="start date">Start date<sup>*</sup></label>
                    <div className="monthYear">
                        <select
                            id="startMonth"
                            value={startMonth}
                            onChange={(e) => setStartMonth(e.target.value)}
                        >
                            <option value="Month" defaultChecked>Month</option>
                            <option value="January">January</option>
                            <option value="February">February</option>
                            <option value="March">March</option>
                            <option value="April">April</option>
                            <option value="May">May</option>
                            <option value="June">June</option>
                            <option value="July">July</option>
                            <option value="August">August</option>
                            <option value="September">September</option>
                            <option value="October">October</option>
                            <option value="November">November</option>
                            <option value="December">December</option>
                            required
                        </select>

                        <select
                            id="startYear"
                            value={startYear}
                            onChange={(e) => setStartYear(e.target.value)}
                        >
                            <option value="Year" defaultChecked>Year</option>

                            {Array.from({length: 100}, (_, i) => (
                            <option value={2023 - i}>{2023 - i}</option>
                            ))}
                            required
                        </select>
                    </div>
                </div>

                <div className="formInput">
                    <label htmlFor="description">Description</label>
                    <textarea
                    id="description"
                    type="text"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    />
                </div>

                <div className="formInput">
                    <label id="currentCheck"> 
                        <input type="checkbox" defaultChecked={current} onClick={() => setCurrent(!current)}/>
                        I am currently working in this role
                    </label>
                </div>

                <div className="formInput">
                    <label htmlFor="end date">End date<sup>*</sup></label>
                    <div className="monthYear">
                        <select
                            id="endMonth"
                            value={endMonth}
                            onChange={(e) => setEndMonth(e.target.value)}
                            disabled={current}
                        >
                            <option value="Month" defaultChecked>Month</option>
                            <option value="January">January</option>
                            <option value="February">February</option>
                            <option value="March">March</option>
                            <option value="April">April</option>
                            <option value="May">May</option>
                            <option value="June">June</option>
                            <option value="July">July</option>
                            <option value="August">August</option>
                            <option value="September">September</option>
                            <option value="October">October</option>
                            <option value="November">November</option>
                            <option value="December">December</option>
                        </select>

                        <select
                            id="endYear"
                            value={endYear}
                            onChange={(e) => setEndYear(e.target.value)}
                            disabled={current}
                        >
                            <option value="Year" defaultChecked>Year</option>

                            {Array.from({length: 100}, (_, i) => (
                            <option value={2023 - i}>{2023 - i}</option>
                            ))}
                        </select>
                    </div>
                </div>
            </div>

            <div className="submitRow">
                <button type="submit" className='submit' onClick={handleSubmit}>Save</button>
                { experience && 
                (<button type="submit" className='delete' onClick={handleDelete}>Delete experience</button>)}
            </div>
        </form>
        </div>
    );
    };

export default ExperienceForm;