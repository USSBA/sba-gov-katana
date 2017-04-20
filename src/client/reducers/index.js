import { combineReducers } from "redux";
import { routerReducer } from "react-router-redux";

// our customer reducers
import lenderMatchReducer from "../reducers/lender-match.js";
import reviewSubmitInfoReducer from "./review-submit-info.js";
import modalReducer from "./modal.js";
import contentReducer from "./content.js";
import restContentReducer from "./rest-content.js";
import confirmationEmailReducer from "./confirmation-email.js";

// combine the custom reducers with the routing reducer
const rootReducer = combineReducers({
  lenderMatch: lenderMatchReducer,
  reviewSubmitInfoReducer: reviewSubmitInfoReducer,
  routing: routerReducer,
  modalReducer: modalReducer,
  contentReducer: contentReducer,
  confirmationEmailReducer: confirmationEmailReducer,
  restContent: restContentReducer
});

export default rootReducer;
