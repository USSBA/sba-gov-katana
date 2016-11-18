import React, { Component } from 'react';

import styles from './App.css';

import NameInput from './name.jsx'

class Welcome extends React.Component {
  render() {
    return(
      <div>
        <h1 className={styles.app}>Hello, {this.props.name}</h1>
        <NameInput />´
      </div>
    );
  }
}

export default Welcome;


