import csrfFetch from "./csrf";

export const FETCH_ALL_POSTS = 'posts/fetchAllPosts'
export const GET_POST = 'posts/getPost'
const ADD_POST = 'posts/addPost'
const EDIT_POST = 'posts/editPost'
const DELETE_POST = 'posts/deletePost'

export const fetchAllPosts = (posts) => {
    return {
      type: FETCH_ALL_POSTS,
      payload: posts
    };
};

export const getPost = (post) => {
    return {
        type: GET_POST,
        payload: post
    }
}

export const addPost = (post) => {
    return {
        type: ADD_POST,
        payload: post
    }
}

const editPost = (post) => {
    return {
        type: EDIT_POST,
        payload: post
    }
}

export const createPost = (formData) => async dispatch => {
    const response = await csrfFetch("/api/posts", {
    method: "POST",
    body: formData
});
    dispatch(addPost(formData));
    return response;
};

export const updatePost = (id, formData) => async dispatch => {
    const response = await csrfFetch(`/api/posts/${id}`, {
    method: "PATCH",
    body: formData
});
    dispatch(editPost(formData));
    return response;
};

export const getOnePost = (postId) => async dispatch => {
    const response = await csrfFetch(`/api/posts/${postId}`)
    const data = await response.json();
    dispatch(getPost(data));
    return response;
}

export const getAllPosts = () => async dispatch => {
    const response = await csrfFetch("/api/posts")
    const data = await response.json();
    dispatch(fetchAllPosts(data));
    return response;
}

export const removePost = (postId) => async dispatch => {
    const response = await csrfFetch(`/api/posts/${postId}`, {
        method: "DELETE"
    });
    const data = await response.json();
    dispatch(fetchAllPosts(data));
    return response;
};

const postsReducer = (state = {}, action) => {
    switch (action.type) {
        case FETCH_ALL_POSTS:
            return {...action.payload.posts}
        case ADD_POST:
            return { ...state, [action.payload.id]: action.payload }
        case EDIT_POST:
            return { ...state, [action.payload.id]: action.payload };
        case DELETE_POST:
            const newState = { ...state };
            delete newState[action.payload];
            return newState;
        default:
            return state;
    }
}

export default postsReducer;