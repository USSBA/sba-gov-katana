import "react-hot-loader/patch";
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


let middlewareList = [];
middlewareList.push(thunk);
middlewareList.push(logging);
if (window.CONFIG.googleAnalytics.enabled) {
  middlewareList.push(googleAnalyticsMiddleware);
}

const middleware = applyMiddleware(thunk, logging);
const store = createStore(rootReducer, middleware);

// Create an enhanced history that syncs navigation events with the store
const history = syncHistoryWithStore(browserHistory, store);


import '../styles/common.css';
import '../styles/common.scss';
require('font-awesome-webpack2');


class App extends React.Component {
  render() {
    return (
      <Provider store={ store }>
        <HaxRouter onUpdate={ logPageView() } history={ history }>
          { this.props.routes }
        </HaxRouter>
      </Provider>
      );
  }
}

export default App;
