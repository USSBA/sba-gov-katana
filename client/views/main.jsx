import React from 'react';
import ReactDOM from 'react-dom';

let name = "SBA.gov Team";

ReactDOM.render(
  (<Welcome name={name} />),
  document.getElementById('root')
);