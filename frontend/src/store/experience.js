import { SET_USER_PROFILE } from "./profile";

export const experienceReducer = (state = {}, action) => {
    switch (action.type) {
        case SET_USER_PROFILE:
            debugger
            return { ...state, ...action.payload.experience };
        default:
            return state;
    }
};