import React from 'react';
import { Provider } from 'react-redux';
import { applyMiddleware, createStore } from 'redux';
import thunk from "redux-thunk";
import rootReducer from '../reducers/index.js'
import { logPageView, googleAnalyticsMiddleware } from "../services/analytics.js";
import logging from "../services/logger.js";

import { Route, browserHistory, IndexRoute, IndexRedirect } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';
import HaxRouter from './hax-router.jsx';

import Themer from './templates/themer/themer.jsx'


let middlewareList = [];
middlewareList.push(thunk);
if (window.CONFIG.debug) {
  middlewareList.push(logging);
}
if (window.CONFIG.googleAnalytics.enabled) {
  middlewareList.push(googleAnalyticsMiddleware);
}

const middleware = applyMiddleware(...middlewareList);
const store = createStore(rootReducer, middleware);

// Create an enhanced history that syncs navigation events with the store
const history = syncHistoryWithStore(browserHistory, store);

import '../styles/base.scss'
require('font-awesome-webpack2');


class App extends React.Component {
  render() {
    return (
      <Provider store={ store }>
        <Themer>
          <HaxRouter onUpdate={ logPageView() } history={ history }>
            { this.props.routes }
          </HaxRouter>
        </Themer>
      </Provider>
      );
  }
}

export default App;
