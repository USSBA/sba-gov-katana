import "react-hot-loader/patch";
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { applyMiddleware, createStore } from 'redux';
import thunk from "redux-thunk";
import rootReducer from '../reducers/index.js'
import routes from './routes.jsx';
import { AppContainer } from 'react-hot-loader';

import { Route, browserHistory, IndexRoute, IndexRedirect } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';
import HaxRouter from './hax-router.jsx';

const middleware = applyMiddleware(thunk);
const store = createStore(rootReducer, middleware);

// Create an enhanced history that syncs navigation events with the store
const history = syncHistoryWithStore(browserHistory, store);

var ReactGA = require('react-ga');
ReactGA.initialize('UA-19362636-5');

function logPageView() {
  ReactGA.set({
    page: window.location.pathname
  });
  ReactGA.pageview(window.location.pathname);
}

import '../styles/common.css';
import '../styles/common.scss';
require('font-awesome-webpack2');


ReactDOM.render(
  (<AppContainer>
     <Provider store={ store }>
       <HaxRouter onUpdate={ logPageView() } history={ history }>
           { routes }
       </HaxRouter>
     </Provider>
   </AppContainer>),
  document.getElementById('root')
);


if (module.hot) {
  module.hot.accept('./routes.jsx', () => {
    // reload the routes file
    let nextRoutes = require('./routes.jsx')
    render((
      <AppContainer>
        <Provider store={ store }>
          <HaxRouter onUpdate={ logPageView() } history={ history }>
              { routes }
          </HaxRouter>
        </Provider>)
      </AppContainer>
      ), root)
  })
}
