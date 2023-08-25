import csrfFetch from "./csrf";
import { addPost, fetchAllPosts } from "./post";

const ADD_LIKE = 'likes/addLike'
const DELETE_LIKE = 'likes/deleteLike'

export const createLike = (like) => async dispatch => {
    const {likeableId, likerId} = like
    const response = await csrfFetch("api/likes", {
    method: "POST",
    body: JSON.stringify({
        like: {
            likeableId,
            likerId
        }
    })
});
    const data = await response.json();
    dispatch(fetchAllPosts(data));
    return response;
};

export const removeLike = (postId) => async dispatch => {
    const response = await csrfFetch(`/api/likes/${postId}`, {
        method: "DELETE"
    });
    const data = await response.json();
    dispatch(addPost(Object.values(data.post)[0]))
    return response;
};

export const likeReducer = (state = {}, action) => {
    switch (action.type) {
        case ADD_LIKE:
            return { ...state, [action.payload.id]: action.payload}
        case DELETE_LIKE:
            const newState = { ...state };
            delete newState[action.payload];
            return newState;
        default:
            return state;
    }
};