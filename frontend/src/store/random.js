import csrfFetch from "./csrf";

const SET_RANDOM_USERS = 'search/FETCH_USERS';

const setRandomUsers = (users) => {
    return {
        type: SET_RANDOM_USERS,
        payload: users
    }
}


export const fetchRandomUsers = () => async dispatch => {
    const response = await csrfFetch("/api/users/random")
    const data = await response.json();
    dispatch(setRandomUsers(data));
    return response;
}


const randomUsersReducer = (state = {}, action) => {
    switch (action.type) {
        case SET_RANDOM_USERS:
            return action.payload
        default:
            return state;
    }
};

export default randomUsersReducer;