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
import formReducer from '../reducers/form.js'
import LincMain from './linc-main.jsx';

const store = createStore(formReducer);

ReactDOM.render(
  (<Provider store={store}>
      <LincMain />
    </Provider>),
  document.getElementById('root')
);
