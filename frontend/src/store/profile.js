import { csrfFetch } from './csrf';

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
    switch (action.type) {
        case SET_USER_PROFILE:
            debugger
            return { ...state, ...action.payload.user };
        default:
            return state;
    }
};

export default userReducer;