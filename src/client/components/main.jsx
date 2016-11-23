import React from 'react';
import ReactDOM from 'react-dom';
import {
  Provider
}
from 'react-redux';
import {
  createStore
}
from 'redux'
//import navigationReducer from '../reducers/navigation.js'
import allReducers from '../reducers/all-reducers.js'
import LincMain from './linc-main.jsx';
//import ContactInfoForm from './contact-info/contact-info-form.jsx'
//import BusinessInfoForm from './business-info/business-info-form.jsx'
//import ReviewInfoForm from './review-info/review-info-form.jsx'

const store = createStore(allReducers);


ReactDOM.render(
  (<Provider store={store}>
      <LincMain/>
    </Provider>),
  document.getElementById('root')
);

