import { csrfFetch } from './csrf';

export const SET_USER_PROFILE = 'users/setUserProfile';

const setUserProfile = (profile) => {
    return {
        type: SET_USER_PROFILE,
        payload: profile
    };
};

