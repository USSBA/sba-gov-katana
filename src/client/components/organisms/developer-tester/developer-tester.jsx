import React from 'react'
import { reduce } from 'lodash'
import { connect } from 'react-redux'
import { Link } from 'react-router'
import { bindActionCreators } from 'redux'

import styles from './developer-tester.scss'
import { Button } from 'atoms'

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
        <p>
          This is some example text. This is some example text with a <a href="https://google.com">link</a>.
        </p>
        <Button primary>Click me!</Button>
        <input style={{ margin: '1rem' }} type="text" placeholder="Insert text" />
        <input type="text" placeholder="Insert text" disabled />
        <input type="checkbox" />
        <input type="checkbox" />
        <input type="radio" />
        <input type="radio" />
        <input type="file" />
        <select>
          <option selected>apple</option>
          <option>banana</option>
        </select>
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
