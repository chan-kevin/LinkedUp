import csrfFetch from "./csrf";

const FETCH_ALL_POSTS = 'posts/fetchAllPosts'

const fetchAllPosts = (posts) => {
    return {
      type: FETCH_ALL_POSTS,
      payload: posts
    };
};

export const getAllPosts = () => async dispatch => {
    const response = await csrfFetch("/api/posts")
    const data = await response.json();
    dispatch(fetchAllPosts(data.posts));
    return response;
}

const postsReducer = (state = {}, action) => {
    switch (action.type) {
        case FETCH_ALL_POSTS:
            return { ...action.payload}
        default:
            return state;
    }
}

export default postsReducer;