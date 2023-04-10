import csrfFetch from "./csrf";
import { ADD_CONNECTION, DELETE_CONNECTION } from "./connection";


export const SET_USER_PROFILE = 'users/setUserProfile';

const setUserProfile = (profile) => {
    return {
        type: SET_USER_PROFILE,
        payload: profile
    };
};

export const fetchUserProfile = (userId) => async dispatch => {
    const response = await csrfFetch(`/api/users/${userId}`);
    const data = await response.json();
    dispatch(setUserProfile(data));
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
        default:
            return state;
    }
};

export default userReducer;