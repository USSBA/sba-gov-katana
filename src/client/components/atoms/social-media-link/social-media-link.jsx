import React from 'react'

import styles from './social-media-link.scss'
import { Link } from 'atoms'
import { LeaveSbaModal } from 'organisms'

class SocialMediaLink extends React.Component {
  constructor() {
    super()
    this.state = {
      modalIsOpen: false
    }
  }

  handleSocialMediaClick(e) {
    e.preventDefault()
    this.setModelState(true)
  }

  setModelState(isOpen) {
    this.setState({ modalIsOpen: isOpen })
  }

  handleClose() {
    this.setModelState(false)
  }

  render() {
    // TODO: should this even be a Link?
    return (
      <span>
        <Link onClick={this.handleSocialMediaClick.bind(this)}>
          <img className={styles.socialMediaIcons} src={this.props.image} alt={this.props.altText} />
        </Link>
        <LeaveSbaModal
          url={this.props.url}
          closeLeaveSba={this.handleClose.bind(this)}
          isOpen={this.state.modalIsOpen}
        />
      </span>
    )
  }
}

SocialMediaLink.propTypes = {
  image: React.PropTypes.string.isRequired,
  altText: React.PropTypes.string.isRequired,
  url: React.PropTypes.string.isRequired
}

export default SocialMediaLink
