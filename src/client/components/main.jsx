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
import navigationReducer from '../reducers/navigation.js'
import LincMain from './linc-main.jsx';

const store = createStore(navigationReducer);


ReactDOM.render(
  (<Provider store={store}>
      <LincMain />
    </Provider>),
  document.getElementById('root')
);

