import csrfFetch from "./csrf";

const SEARCH_USER = 'search/SEARCH_USER';
const CLEAR_SEARCH = 'search/CLEAR_SEARCH';
const FETCH_USERS = 'search/FETCH_USERS';

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

const fetchUsers = (users) => {
    return {
        type: FETCH_USERS,
        payload: users
    }
}

export const fetchAllUser = () => async dispatch => {
    const response = await csrfFetch("/api/users")
    const data = await response.json();
    dispatch(fetchUsers(data));
    return response;
}

export const searchUser = (query) => async dispatch => {
    const response = await csrfFetch(`/api/users/search?q=${query}`)
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
            return { ...state, ...action.payload }
        case CLEAR_SEARCH:
            return {}
        case FETCH_USERS:
            return { ...state, ...action.payload }
        default:
            return state;
    }
};

export default searchReducer;
