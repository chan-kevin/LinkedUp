import React, { useEffect, useRef, useState } from "react";
import { createEducation, editEducation, removeEducation } from '../../store/education';
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import '../ExperienceFormModal/ExperienceForm.css'

function EducationForm ({ onClose, education }) {
    const { userId } = useParams();
    const dispatch = useDispatch();
    const [school, setSchool] = useState(education?.school ?? '');
    const [degree, setDegree] = useState(education?.degree ?? '');
    const [startMonth, setStartMonth] = useState(education?.startMonth ?? '');
    const [startYear, setStartYear] = useState(education?.startYear ?? '');
    const [endMonth, setEndMonth] = useState(education?.endMonth ?? '');
    const [endYear, setEndYear] = useState(education?.endYear ?? '');
    const [current, setCurrent] = useState(false);

    const handleSubmit =  async (e) => {
        e.preventDefault();
        if (current) {
            setEndMonth('');
            setEndYear('');
        }

        const newEducation = {
            id: education? education.id : '',
            current,
            school,
            degree,
            startMonth,
            startYear,
            userId,
            endMonth,
            endYear
        };
        if (education) {
            await dispatch(editEducation(newEducation))
        } else {
            await dispatch(createEducation(newEducation));
        }
        onClose();
    };

    const handleDelete = async (e) => {
        e.preventDefault();
        await dispatch(removeEducation(education.id));
        onClose();
    }
    
    return (
        <div className="fontFamily">
        <form onSubmit={handleSubmit} className='modalForm'>

            <button onClick={onClose} className='closeButton'><i className="fa-solid fa-xmark"></i></button>
            <div className="formHeadline">
                { education ? <p>Edit education</p> : <p>Add education</p>}
            </div>

            <div className="formDetail">
                <p><sup>*</sup> Indicates required</p>

                <div className="formInput">
                    <label htmlFor="title">School<sup>*</sup></label>
                    <input
                    id="title"
                    type="text"
                    value={school}
                    placeholder="Ex: Boston University"
                    onChange={(e) => setSchool(e.target.value)}
                    required
                    />
                </div>
                
                    
                <div className="formInput" id="company-name">
                    <label htmlFor="company">Degree<sup>*</sup></label>
                    <input
                    id="company"
                    type="text"
                    value={degree}
                    placeholder="Ex: Bachelor's"
                    onChange={(e) => setDegree(e.target.value)}
                    required
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
                    <label htmlFor="end date">End date (or expected) <sup>*</sup></label>
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
                { education && 
                (<button type="submit" className='delete' onClick={handleDelete}>Delete education</button>)}
            </div>
        </form>
        </div>
    );
    };

export default EducationForm;