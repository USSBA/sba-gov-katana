import React from 'react';
import ReactDOM from 'react-dom';
import { Provider }
from 'react-redux';
import { createStore, combineReducers }
from 'redux'
import navigationReducer from '../reducers/navigation.js'
import formReducer from '../reducers/form.js'
import LincMain from './linc-main.jsx';

const rootReducer = combineReducers({
   navigationReducer,
   formReducer
});
const store = createStore(rootReducer);

ReactDOM.render(
  (<Provider store={store}>
      <LincMain />
    </Provider>),
  document.getElementById('root')
);

