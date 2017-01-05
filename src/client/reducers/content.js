import { siteContent } from "../actions/content.js";

const contentReducer = (state = {}, action) => {
  if (action.type === siteContent) {
    return {
      data: action.data
    };
  }
  return state;
};


export default contentReducer;
