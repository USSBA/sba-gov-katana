import {combineReducers} from 'redux';
import {routerReducer} from 'react-router-redux';

// our customer reducers
import loanReducer from '../reducers/loan-form.js';


// combine the custom reducers with the routing reducer
const rootReducer = combineReducers({
  loanReducer: loanReducer,
  routing: routerReducer
});

export default rootReducer;
