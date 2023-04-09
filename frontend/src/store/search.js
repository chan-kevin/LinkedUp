import csrfFetch from "./csrf";

const SEARCH_USER = 'search/SEARCH_USER';

const findUser = (query) => {
    return {
        type: SEARCH_USER,
        payload: query
    };
};

export const searchUser = (query) => async dispatch => {
    const response = await csrfFetch(`/api/users/search?q=${query}`)
    const data = await response.json();
    dispatch(findUser(data));
    return response;
}

const searchReducer = (state = {}, action) => {
    switch (action.type) {
        case SEARCH_USER:
            return { ...state, ...action.payload }
        default:
            return state;
    }
};

export default searchReducer;
