import React from 'react'

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
  text: React.PropTypes.string.isRequired,
  id: React.PropTypes.string,
  url: React.PropTypes.string,
  onClick: React.PropTypes.func,
  visible: React.PropTypes.bool,
  onBlur: React.PropTypes.func,
  indent: React.PropTypes.bool
}

export default PageLink
