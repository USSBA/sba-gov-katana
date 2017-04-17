import types from "../actions/types.js";

const restContentReducer = (state = {}, action) => {
  if (action.type === types.restContent) {
    const newState = {};
    newState[action.contentType] = action.data;
    return Object.assign({}, state, newState);
  }
  return state;
};


export default restContentReducer;
