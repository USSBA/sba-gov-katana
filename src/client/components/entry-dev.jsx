import 'react-hot-loader/patch'
import React from 'react'
import ReactDOM from 'react-dom'
import routes from './routes.jsx'
import { AppContainer } from 'react-hot-loader'
import App from './app.jsx'
const root = document.getElementById('root')

import injectTapEventPlugin from 'react-tap-event-plugin'
injectTapEventPlugin()

ReactDOM.render(
  <AppContainer>
    <App routes={routes} />
  </AppContainer>,
  root
)

/* eslint-disable global-require */
if (module.hot) {
  require('react-hot-loader/patch')
  module.hot.accept('./routes.jsx', () => {
    // reload the routes file
    const nextRoutes = require('./routes.jsx')
    ReactDOM.render(
      <AppContainer>
        <App routes={routes} />
      </AppContainer>,
      root
    )
  })
}
