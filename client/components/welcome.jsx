import React, { Component } from 'react';

import styles from './App.css';

class Welcome extends React.Component {
  render() {
    return(
        <h1 className={styles.app}>Hello, {this.props.name}</h1>
    );
  }
}

export default Welcome;


