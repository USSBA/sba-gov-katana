import { receiveHappeningNow } from "../actions/content.js";

const contentReducer = (state = {}, action) => {
  if (action.type === receiveHappeningNow) {
    return {
      happeningNow: action.data
    };
  }
  return state;
};


export default contentReducer;
