import csrfFetch from "./csrf";
import { FETCH_ALL_POSTS } from "./post";
import { GET_POST } from "./post";

const GET_COMMENTS = 'comments/getComments'
const ADD_COMMENT = 'comments/addComment'

const getComments = (comment) => {
    return {
        type: GET_COMMENTS,
        payload: comment
    }
}

const addComment = (comment) => {
    return {
        type: ADD_COMMENT,
        payload: comment
    }
}

// export const getAllComments = (commentId) => async dispatch => {
//     const response = await csrfFetch(`/api/comments/${commentId}`)
//     const data = await response.json();
//     dispatch(getComments(data));
//     return response;
// }

export const createComment = (comment) => async dispatch => {
    const {postId, body} = comment
    const response = await csrfFetch("api/comments", {
    method: "POST",
    body: JSON.stringify({
        comment: {
            postId,
            body
        }
    })
});
    const data = await response.json();
    dispatch(addComment(data.comment));
    return response;
};

export const commentReducer = (state = {}, action) => {
    switch (action.type) {
        // case FETCH_ALL_POSTS:
        //     return { ...action.payload.comments };
        // case GET_COMMENTS:
        //     return { ...state, ...action.payload};
        case GET_POST:
            return { ...action.payload.comments}
        case ADD_COMMENT:
            return { ...state, [action.payload.id]: action.payload}
        default:
            return state;
    }
};