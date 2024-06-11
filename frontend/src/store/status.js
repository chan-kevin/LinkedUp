export const SET_LOADING = "session/setLoading";

export const setLoading = (isLoading) => {
  return {
    type: SET_LOADING,
    payload: isLoading,
  };
};

const statusReducer = (state = { isLoading: false }, action) => {
  switch (action.type) {
    case SET_LOADING:
      return { isLoading: action.payload };
    default:
      return state;
  }
};

export default statusReducer;
