import csrfFetch from "./csrf";

const SEARCH_USER = 'search/SEARCH_USER';
const CLEAR_SEARCH = 'search/CLEAR_SEARCH';

const findUser = (query) => {
    return {
        type: SEARCH_USER,
        payload: query
    };
};

const clearSearch = () => {
    return {
        type: CLEAR_SEARCH
    }
}

export const searchAllUser = (query) => async dispatch => {
    const response = await csrfFetch(`/api/users/search?users=${query}`)
    const data = await response.json();
    dispatch(findUser(data));
    return response;
}

export const clearResult = () => async dispatch => {
    dispatch(clearSearch());
}

const searchReducer = (state = {}, action) => {
    switch (action.type) {
        case SEARCH_USER:
            return action.payload
        case CLEAR_SEARCH:
            return {}
        default:
            return state;
    }
};

export default searchReducer;
