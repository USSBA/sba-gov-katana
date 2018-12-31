import React from 'react'
import PropTypes from 'prop-types'

import styles from './page-link.scss'
import { Link } from 'atoms'

class PageLink extends React.Component {
  render() {
    const { indent, text, url, visible, ...linkProps } = this.props
    const anchorClass = styles.link + ' ' + (visible ? '' : styles.hidden)

    return (
      <li className={styles.pageLink + ' ' + (indent ? styles.indent : '')}>
        <Link {...linkProps} className={anchorClass} to={url}>
          {text}
        </Link>
      </li>
    )
  }
}

PageLink.defaultProps = {
  url: '#',
  visible: true
}

// either url or onClick should be set
PageLink.propTypes = {
  text: PropTypes.string.isRequired,
  id: PropTypes.string,
  url: PropTypes.string,
  onClick: PropTypes.func,
  visible: PropTypes.bool,
  onBlur: PropTypes.func,
  indent: PropTypes.bool
}

export default PageLink
