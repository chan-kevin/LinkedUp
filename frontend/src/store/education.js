import { SET_USER_PROFILE } from "./profile";
import csrfFetch from "./csrf";

const ADD_EDUCATION = 'education/ADD_EDUCATION';
const UPDATE_EDUCATION = 'education/UPDATE_EDUCATION';
const DELETE_EDUCATION = 'education/DELETE_EDUCATION';

const addEducation = (education) => {
    return {
        type: ADD_EDUCATION,
        payload: education
    };
};

const updateEducation = (education) => {
    return {
        type: UPDATE_EDUCATION,
        payload: education
    };
};

const deleteEducation = (educationId) => {
    return {
        type: DELETE_EDUCATION,
        payload: educationId
    };
};

export const createEeducation = (education) => async dispatch => {

    const {school, degree, location, logo, current, startMonth, startYear, userId, endMonth, endYear, description} = education
    const response = await csrfFetch("/api/educations", {
    method: "POST",
    body: JSON.stringify({
        education:{
            school,
            degree,
            startMonth,
            startYear,
            userId,
            endMonth,
            endYear
        }
    })
});
    const data = await response.json();
    dispatch(addEducation(data.education));
    return response;
};

export const editEducation = (education) => async dispatch => {
    const {id, school, degree, startMonth, startYear, userId, endMonth, endYear} = education
    const response = await csrfFetch(`/api/educations/${education.id}`, {
    method: "PUT",
    body: JSON.stringify({
        education:{
            id,
            school,
            degree,
            startMonth,
            startYear,
            userId,
            endMonth,
            endYear
        }
    })
});
    const data = await response.json();
    dispatch(updateEducation(data.education));
    return response;
};

export const removeEducation = (educationId) => async dispatch => {
    const response = await csrfFetch(`/api/educations/${educationId}`, {
        method: "DELETE"
    });
    dispatch(deleteEducation(educationId));
    return response;
};

export const educationReducer = (state = {}, action) => {
    switch (action.type) {
        case SET_USER_PROFILE:
            return { ...action.payload.education };
        case ADD_EDUCATION:
            return { ...state, [action.payload.id]: action.payload };
        case UPDATE_EDUCATION:
            return { ...state, [action.payload.id]: action.payload };
        case DELETE_EDUCATION:
            const newState = { ...state };
            delete newState[action.payload];
            return newState;
        default:
            return state;
    }
};