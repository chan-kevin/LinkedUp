import csrfFetch from "./csrf";
import { FETCH_ALL_POSTS } from "./post";
import { GET_POST } from "./post";
import { getPost } from "./post";

const GET_COMMENTS = 'comments/getComments'
const ADD_COMMENT = 'comments/addComment'
const EDIT_COMMENT = 'comments/editComment'
const DELETE_COMMENT = 'posts/deleteComment'

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

const editComment = (comment) => {
    return {
        type: EDIT_COMMENT,
        payload: comment
    }
}

const deleteComment = (commentId) => {
    return {
        type: DELETE_COMMENT,
        payload: commentId
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
    dispatch(getPost(data));
    return response;
};

export const updateComment = (id, body) => async dispatch => {
    // const {id, body} = comment
    const response = await csrfFetch(`/api/comments/${id}`, {
    method: "PUT",
    body: JSON.stringify({
        id, body
    })
});
    const data = await response.json();
    // dispatch(editComment(data));
    dispatch(getPost(data));
    return response;
};

export const removeComment = (commentId) => async dispatch => {
    const response = await csrfFetch(`/api/comments/${commentId}`, {
        method: "DELETE"
    });
    dispatch(deleteComment(commentId));
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
        case EDIT_COMMENT:
            return { ...state, [action.payload.id]: action.payload };
        case DELETE_COMMENT:
            const newState = { ...state };
            delete newState[action.payload];
            return newState;
        default:
            return state;
    }
};