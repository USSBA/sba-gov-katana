import types from "../actions/types.js";

const restContentReducer = (state = {}, action) => {
  if (action.type === types.restContent) {
    const newState = {};
    if (!newState[action.contentType]) {
      newState[action.contentType] = [];
    }
    if (action.id) {
      newState[action.contentType][action.id] = action.data;
    } else {
      newState[action.contentType] = action.data;
    }
    return Object.assign({}, state, newState);
  }
  return state;
};


export default restContentReducer;
