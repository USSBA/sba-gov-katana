import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import * as ModalActions from '../../../actions/show-modal.js'
import styles from './social-media-link.scss'
import { Link } from 'atoms'

class SocialMediaLink extends React.Component {
  handleSocialMediaClick(e) {
    e.preventDefault()
    this.props.actions.leaveSba(this.props.url)
  }

  render() {
    // TODO: should this even be a Link?
    return (
      <Link onClick={this.handleSocialMediaClick.bind(this)}>
        <img className={styles.socialMediaIcons} src={this.props.image} alt={this.props.altText} />
      </Link>
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
