import {combineReducers} from 'redux';
import contactInfoReducer from './contact-info';
import navigationReducer from './navigation';
import updateInputReducer from './update-input';
import businessInfoReducer from './business-info';
import reviewInfoReducer from './review-info';

const allReducers = combineReducers({
    navigationReducer: navigationReducer,
    contactInfo: contactInfoReducer,
    updateInfo:updateInputReducer,
    businessInfo:businessInfoReducer,
    reviewInfo:reviewInfoReducer
});

export default  allReducers;
