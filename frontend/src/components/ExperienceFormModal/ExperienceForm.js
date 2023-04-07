import React, { useState } from "react";
import { createExperience } from '../../store/experience';
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import './ExperienceForm.css';

function ExperienceForm ({ onClose }) {
    const { userId } = useParams();
    const dispatch = useDispatch();
    const [title, setTitle] = useState('');
    const [company, setCompany] = useState('');
    const [location, setLocation] = useState('');
    const [startMonth, setStartMonth] = useState('');
    const [startYear, setStartYear] = useState('');
    const [endMonth, setEndMonth] = useState('');
    const [endYear, setEndYear] = useState('');
    const [description, setDescription] =useState('');
    
    const handleSubmit =  async (e) => {
        e.preventDefault();
        const experience = {
            title,
            company,
            location,
            startMonth,
            startYear,
            userId,
            endMonth,
            endYear,
            description
        };
        await dispatch(createExperience(experience));
        onClose();
    };
    
    return (
        <div className="fontFamily">
        <form onSubmit={handleSubmit} className='modalForm'>

            <button onClick={onClose} className='closeButton'><i class="fa-solid fa-xmark"></i></button>
            <div className="formHeadline">
                <p>Add experience</p>
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

                    />
                </div>

                <div className="formInput">
                    <label htmlFor="company">Company name<sup>*</sup></label>
                    <input
                    id="company"
                    type="text"
                    value={company}
                    placeholder="Google"
                    onChange={(e) => setCompany(e.target.value)}
                    />
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
                    <label htmlFor="end date">End date</label>
                    <div className="monthYear">
                        <select
                            id="endMonth"
                            value={endMonth}
                            onChange={(e) => setEndMonth(e.target.value)}
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
                <button type="submit" className='submit'>Save</button>
            </div>
        </form>
        </div>
    );
    };

export default ExperienceForm;