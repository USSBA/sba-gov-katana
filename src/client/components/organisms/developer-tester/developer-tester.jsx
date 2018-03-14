import React from 'react'
import { reduce } from 'lodash'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

// import naics from "./naics";
import styles from './developer-tester.scss'

export class DeveloperTester extends React.Component {
  render() {
    return (
      <div>
        <h1>Hello</h1>
        <h2>Hello</h2>
        <h3>Hello</h3>
        <h4>Hello</h4>
        <h5>Hello</h5>
        <h6>Hello</h6>
        <hr />
        <hr id="alt" />
        <p>This is some example text. This is some example text.</p>
        <p>This is some example text. This is some exmaple text.</p>
      </div>
    )
  }
}

function mapReduxStateToProps(reduxState) {
  return {}
}

function mapDispatchToProps(dispatch) {
  return {}
}

export default connect(mapReduxStateToProps, mapDispatchToProps)(DeveloperTester)
