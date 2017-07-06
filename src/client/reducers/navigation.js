import types from "../actions/types.js";

const navigationReducer = (state, action) => {
  if (action.type === "LOCATION_CHANGE") {
    return Object.assign({}, state);
  } else if (action.type === "MOVE_TO_FIND_LENDERS") {
    return {
      currentPage: "loanForm"
    };
  } else if (action.type === "MOVE_TO_SEE_MATCHES") {
    return {
      currentPage: "successPage"
    };
  } else if (action.type === types.navigation.callToAction) {
    return Object.assign({}, state);
  }
  return state || {
      currentPage: "landingPage"
    };
};
export default navigationReducer;
