import React, { Component } from 'react';

import styles from './App.scss';

class Welcome extends React.Component {
  render() {
    return(
      <div className={styles.app}>
        <h1>Hello, {this.props.name}</h1>
      </div>
    );
  }
}

export default Welcome;


