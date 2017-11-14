import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { SmallSecondaryButton } from 'atoms'
import * as NavigationActions from '../../../actions/navigation.js'
import cornerLines from '../../../../../public/assets/images/corner-diagonal-lines-light.png'
import styles from './simple-cta.scss'
import { createCtaNavigation } from '../../../services/navigation'

class SimpleCta extends React.Component {
  handleClick() {
    this.props.actions.callToAction(
      this.props.url,
      this.props.eventCategory,
      this.props.eventLabel,
      1
    )
  }
  render() {
    return (
      <div id={this.props.id} className={styles.container}>
        <p>{this.props.actionText}</p>
        <SmallSecondaryButton
          onClick={createCtaNavigation(
            this.props.url,
            this.props.eventCategory,
            this.props.eventLabel,
            1
          )}
          text={this.props.buttonText}
        />
        <img alt="" className={styles.cornerLines} src={cornerLines} />
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
