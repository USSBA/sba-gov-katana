import React from 'react'
import PropTypes from 'prop-types'

import styles from './social-media-link.scss'
import { Link } from 'atoms'

class SocialMediaLink extends React.Component {
  constructor() {
    super()
    this.state = {
      modalIsOpen: false
    }
  }

  render() {
    return (
      <span>
        <Link to={this.props.url} target="_blank">
          <img className={styles.socialMediaIcons} src={this.props.image} alt={this.props.altText} />
        </Link>
      </span>
    )
  }
}

SocialMediaLink.propTypes = {
  image: PropTypes.string.isRequired,
  altText: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired
}

export default SocialMediaLink
