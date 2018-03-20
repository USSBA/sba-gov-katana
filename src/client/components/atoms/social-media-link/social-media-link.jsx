import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import * as ModalActions from '../../../actions/show-modal.js'
import { BasicLink } from 'atoms'
import styles from './social-media-link.scss'

class SocialMediaLink extends React.Component {
  handleSocialMediaClick(e) {
    e.preventDefault()
    this.props.actions.leaveSba(this.props.url)
  }

  render() {
    return (
      <BasicLink onClick={this.handleSocialMediaClick.bind(this)}>
        <img className={styles.socialMediaIcons} src={this.props.image} alt={this.props.altText} />
      </BasicLink>
    )
  }
}

SocialMediaLink.propTypes = {
  image: React.PropTypes.string.isRequired,
  altText: React.PropTypes.string.isRequired,
  url: React.PropTypes.string.isRequired
}

function mapReduxStateToProps(reduxState) {
  return {}
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(ModalActions, dispatch)
  }
}
export default connect(mapReduxStateToProps, mapDispatchToProps)(SocialMediaLink)
