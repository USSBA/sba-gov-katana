import { siteContent } from "../actions/content.js";

const contentReducer = (state = {}, action) => {
  if (action.type === siteContent) {
    const newState = {};
    newState[action.contentType] = action.data;
    return Object.assign({}, state, newState);
  }
  return state;
};


export default contentReducer;
