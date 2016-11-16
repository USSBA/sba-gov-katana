import React from 'react';
import ReactDOM from 'react-dom';
import Welcome from './welcome.jsx';

let name = "Scruminati";

ReactDOM.render(
  (<Welcome name={name} />),
  document.getElementById('root')
);