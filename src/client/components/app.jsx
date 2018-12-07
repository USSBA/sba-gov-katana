import React from 'react'
import thunk from 'redux-thunk'
import { Provider } from 'react-redux'
import { Route, browserHistory, IndexRoute, IndexRedirect } from 'react-router'
import { syncHistoryWithStore } from 'react-router-redux'
import { applyMiddleware, createStore } from 'redux'

import HaxRouter from './hax-router.jsx'
import config from '../services/client-config.js'
import logging from '../services/logger.js'
import rootReducer from '../reducers/index.js'
import { logPageView, googleAnalyticsMiddleware } from '../services/analytics.js'

const middlewareList = []
middlewareList.push(thunk)
if (config.debug) {
  middlewareList.push(logging)
}
middlewareList.push(googleAnalyticsMiddleware)

const middleware = applyMiddleware(...middlewareList)
const store = createStore(rootReducer, middleware)

// Create an enhanced history that syncs navigation events with the store
const history = syncHistoryWithStore(browserHistory, store)

import '../styles/base.scss'
require('font-awesome-webpack-4')

class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <HaxRouter history={history}>{this.props.routes}</HaxRouter>
      </Provider>
    )
  }
}

export default App
