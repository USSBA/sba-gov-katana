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

if (module.hot) {
  /* eslint-disable-next-line global-require */
  require('react-hot-loader/patch')
  module.hot.accept('./routes.jsx', () => {
    // reload the routes file
    /* eslint-disable-next-line global-require */
    const nextRoutes = require('./routes.jsx')
    ReactDOM.render(
      <AppContainer>
        <App routes={routes} />
      </AppContainer>,
      root
    )
  })
}
