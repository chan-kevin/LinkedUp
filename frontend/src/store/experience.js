import { SET_USER_PROFILE } from "./profile";
import csrfFetch from "./csrf";

const ADD_EXPERIENCE = 'experience/ADD_EXPERIENCE';
const UPDATE_EXPERIENCE = 'experience/UPDATE_EXPERIENCE';
const DELETE_EXPERIENCE = 'experience/DELETE_EXPERIENCE';

const addExperience = (experience) => {
    return {
        type: ADD_EXPERIENCE,
        payload: experience
    };
};

const updateExperience = (experience) => {
    return {
        type: UPDATE_EXPERIENCE,
        payload: experience
    };
};

const deleteExperience = (experienceId) => {
    return {
        type: DELETE_EXPERIENCE,
        payload: experienceId
    };
};

export const createExperience = (experience) => async dispatch => {

    const {title, company, location, logo, current, startMonth, startYear, userId, endMonth, endYear} = experience
    const response = await csrfFetch("/api/experiences", {
    method: "POST",
    body: JSON.stringify({
        experience:{
            title,
            company,
            location,
            logo,
            current,
            startMonth,
            startYear,
            userId,
            endMonth,
            endYear
        }
    })
});
    const data = await response.json();
    dispatch(addExperience(data.experience));
    return response;
};

export const editExperience = (experience) => async dispatch => {
    const {id, title, company, location, current, startMonth, startYear, userId, endMonth, endYear} = experience
    const response = await csrfFetch(`/api/experiences/${experience.id}`, {
    method: "PUT",
    body: JSON.stringify({
        experience:{
            id,
            title,
            company,
            location,
            current,
            startMonth,
            startYear,
            userId,
            endMonth,
            endYear
        }
    })
});
    const data = await response.json();
    dispatch(updateExperience(data.experience));
    return response;
};

export const removeExperience = (experienceId) => async dispatch => {
    const response = await csrfFetch(`/api/experiences/${experienceId}`, {
        method: "DELETE"
    });
    dispatch(deleteExperience(experienceId));
    return response;
};


export const experienceReducer = (state = {}, action) => {
    switch (action.type) {
        case SET_USER_PROFILE:
            return { ...action.payload.experience };
        case ADD_EXPERIENCE:
            return { ...state, [action.payload.id]: action.payload };
        case UPDATE_EXPERIENCE:
            return { ...state, [action.payload.id]: action.payload };
        case DELETE_EXPERIENCE:
            const newState = { ...state };
            delete newState[action.payload];
            return newState;
        default:
            return state;
    }
};