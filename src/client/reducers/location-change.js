const locationChangeReducer = (state = {}, action) => {
  if (action.type === "LOCATION_CHANGE") {
    return Object.assign({}, state);
  }
  return state;
};


export default locationChangeReducer;
