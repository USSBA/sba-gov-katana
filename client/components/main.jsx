import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux'
import nameReducer from '../reducers/name.js'
import LincMain from './linc-main.jsx';

const store = createStore(nameReducer);


ReactDOM.render(
  ( <Provider store={store}>
      <LincMain />
    </Provider>),
  document.getElementById('root')
);