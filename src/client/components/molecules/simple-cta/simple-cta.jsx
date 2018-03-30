import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import styles from './simple-cta.scss'
import * as NavigationActions from '../../../actions/navigation.js'
import { Button } from 'atoms'
import { createCtaNavigation } from '../../../services/navigation'

class SimpleCta extends React.Component {
  handleClick() {
    this.props.actions.callToAction(this.props.url, this.props.eventCategory, this.props.eventLabel, 1)
  }
  render() {
    return (
      <div id={this.props.id} className={styles.container}>
        <h6>{this.props.actionText}</h6>
        <Button
          onClick={createCtaNavigation(this.props.url, this.props.eventCategory, this.props.eventLabel, 1)}
          primary
          alternate
        >
          {this.props.buttonText}
        </Button>
      </div>
    )
  }
}

SimpleCta.defaultProps = {
  url: '/',
  buttonText: 'Go To SBA',
  actionText: 'This is a Simple CTA',
  eventCategory: 'Generic CTA',
  eventLabel: 'Unknown'
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(NavigationActions, dispatch)
  }
}
export default connect(null, mapDispatchToProps)(SimpleCta)
