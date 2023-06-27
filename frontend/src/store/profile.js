import csrfFetch from "./csrf";
import { ADD_CONNECTION, DELETE_CONNECTION } from "./connection";


export const SET_USER_PROFILE = 'users/setUserProfile';
const UPDATE_USER_PROFILE = 'users/updateUserProfile'

const setUserProfile = (profile) => {
    return {
        type: SET_USER_PROFILE,
        payload: profile
    };
};

const updateUserProfile = (profile) => {
    return {
        type: UPDATE_USER_PROFILE,
        payload: profile
    };
};

export const fetchUserProfile = (userId) => async dispatch => {
    const response = await csrfFetch(`/api/users/${userId}`);
    const data = await response.json();
    dispatch(setUserProfile(data));
    return response;
}

export const editUserProfile = (profile, userId) => async dispatch => {
    const response = await csrfFetch(`/api/users/${userId}`, {
        method: "PUT",
        body: profile
    });
    const data = await response.json();
    dispatch(updateUserProfile(data));
    return response;
}

export const editUserAbout = (user) => async dispatch => {
    const { id, about, firstName, headline, lastName, location, photoUrl } = user
    const response = await csrfFetch(`/api/users/${id}`, {
        method: "Put",
        body: JSON.stringify({
            user: { 
                about ,
                firstName,
                headline,
                lastName,
                location,
                photoUrl
            }})
    });
    const data = await response.json();
    dispatch(updateUserProfile(data));
    return response;
}

const userReducer = (state = {}, action) => {
    let nextState = { ...state }
    switch (action.type) {
        case SET_USER_PROFILE:
            return { ...action.payload.user };
        case ADD_CONNECTION:
            return { ...nextState, ...action.payload};
        case DELETE_CONNECTION:
            return { ...nextState, ...action.payload};
        case UPDATE_USER_PROFILE:
            return { ...nextState, ...action.payload}
        default:
            return state;
    }
};

export default userReducer;