import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import styles from './small-inverse-cta.scss'
import * as NavigationActions from '../../../actions/navigation.js'
import { SmallPrimaryButton } from 'atoms'
import { createCtaNavigation } from '../../../services/navigation'

class SmallInverseCta extends React.Component {
  handleClick() {
    this.props.actions.callToAction(this.props.url, this.props.eventCategory, this.props.eventLabel, 1)
  }
  render() {
    return (
      <div id="small-inverse-cta" className={styles.smallInverseCta}>
        <p>{this.props.actionText}</p>
        <SmallPrimaryButton
          onClick={createCtaNavigation(this.props.url, this.props.eventCategory, this.props.eventLabel, 1)}
          text={this.props.buttonText}
        />
      </div>
    )
  }
}

SmallInverseCta.defaultProps = {
  url: '/',
  buttonText: 'Go Home',
  actionText: 'My Action Text',
  eventCategory: 'Generic CTA',
  eventLabel: 'Unknown'
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(NavigationActions, dispatch)
  }
}
export default connect(null, mapDispatchToProps)(SmallInverseCta)
