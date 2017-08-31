const loadingReducer = (state = {}, action) => {
  if (action.type === "LOADED") {
    return {
      loaded: true
    };
  }
  return state;
};

export default loadingReducer;