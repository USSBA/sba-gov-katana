import {combineReducers} from 'redux';
import {routerReducer} from 'react-router-redux';

// our customer reducers
import formReducer from '../reducers/loan-form.js';


// combine the custom reducers with the routing reducer
const rootReducer = combineReducers({
  formReducer: formReducer,
  routing: routerReducer
});

export default rootReducer;