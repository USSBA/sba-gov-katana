import React from 'react';
import ReactDOM from 'react-dom';
import routes from './routes.jsx';
import App from "./app.jsx";
ReactDOM.render((<App routes={ routes } />), document.getElementById('root'));
