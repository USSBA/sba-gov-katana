import {combineReducers} from 'redux';
import {routerReducer} from 'react-router-redux';

// our customer reducers
import loanReducer from '../reducers/loan-form.js';
import additionalInfoReducer from '../reducers/additional-info.js'

// combine the custom reducers with the routing reducer
const rootReducer = combineReducers({
  loanReducer: loanReducer,
  additionalInfoReducer: additionalInfoReducer,
  routing: routerReducer
});

export default rootReducer;
