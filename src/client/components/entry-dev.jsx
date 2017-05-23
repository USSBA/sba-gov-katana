import "react-hot-loader/patch";
import React from 'react';
import ReactDOM from 'react-dom';
import routes from './routes.jsx';
import { AppContainer } from 'react-hot-loader';
import App from "./app.jsx";
let root = document.getElementById('root');

ReactDOM.render((
  <AppContainer>
    <App routes={ routes } />
  </AppContainer>
  ), root);

if (module.hot) {
  require("react-hot-loader/patch");
  module.hot.accept('./routes.jsx', () => {
    // reload the routes file
    let nextRoutes = require('./routes.jsx');
    console.log("nextRoutes",nextRoutes);
    ReactDOM.render(
      <AppContainer>
        <App routes={ routes } />
      </AppContainer>, root);
  })
}
