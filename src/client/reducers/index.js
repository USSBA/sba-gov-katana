import {combineReducers} from 'redux';
import {routerReducer} from 'react-router-redux';

// our customer reducers
import loanReducer from '../reducers/loan-form.js';
import additionalInfoReducer from '../reducers/additional-info.js';
import contactInfoReducer from '../reducers/contact-info.js';
import businessInfoReducer from '../reducers/business-info.js';
import reviewInfoReducer from '../reducers/review-info.js';

// combine the custom reducers with the routing reducer
const rootReducer = combineReducers({
  loanReducer: loanReducer,
  additionalInfoReducer: additionalInfoReducer,
  contactInfoReducer: contactInfoReducer,
  businessInfoReducer: businessInfoReducer,
  reviewInfoReducer: reviewInfoReducer,
  routing: routerReducer
});

export default rootReducer;
