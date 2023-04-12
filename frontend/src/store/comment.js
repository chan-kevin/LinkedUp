import csrfFetch from "./csrf";
import { FETCH_ALL_POSTS } from "./post";
import { GET_POST } from "./post";

const GET_COMMENTS = 'comments/getComments'

const getComments = (comment) => {
    return {
        type: GET_COMMENTS,
        payload: comment
    }
}

export const getAllComments = (commentId) => async dispatch => {
    const response = await csrfFetch(`/api/comments/${commentId}`)
    const data = await response.json();
    dispatch(getComments(data));
    return response;
}

export const commentReducer = (state = {}, action) => {
    switch (action.type) {
        // case FETCH_ALL_POSTS:
        //     return { ...action.payload.comments };
        // case GET_COMMENTS:
        //     return { ...state, ...action.payload};
        case GET_POST:
            return { ...state, ...action.payload.comments}
        default:
            return state;
    }
};