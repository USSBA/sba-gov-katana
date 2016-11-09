import React, { Component } from 'react';

// import styles from './App.css';

class Welcome extends React.Component {
  render() {
    return(
        <h1>Hello, {this.props.name}</h1>
    );
  }
}

export default Welcome;


