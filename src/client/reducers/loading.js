const loadingReducer = (state = {}, action) => {
  if (action.type === "REMOVE_LOADER") {
    return {
      displayLoader: false
    };
  }
  return state;
};

export default loadingReducer;