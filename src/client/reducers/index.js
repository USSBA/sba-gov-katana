import {combineReducers} from 'redux';
import {routerReducer} from 'react-router-redux';

// our customer reducers
import loanReducer from '../reducers/loan-form.js';
import contactInfoReducer from '../reducers/contact-info.js';
import businessInfoReducer from '../reducers/business-info.js';


// combine the custom reducers with the routing reducer
const rootReducer = combineReducers({
  loanReducer: loanReducer,
  contactInfoReducer:contactInfoReducer,
  businessInfoReducer:businessInfoReducer,
  routing: routerReducer
});

export default rootReducer;
