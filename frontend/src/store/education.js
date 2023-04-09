import { SET_USER_PROFILE } from "./profile";

export const educationReducer = (state = {}, action) => {
    switch (action.type) {
        case SET_USER_PROFILE:
            return { ...action.payload.education };
        default:
            return state;
    }
};