import React from 'react'

import styles from './utility-link.scss'
import { Link } from 'atoms'

class UtilityLink extends React.Component {
  render() {
    const { text, url, visible, ...linkProps } = this.props
    let anchorClass = styles.link + ' ' + (visible ? '' : styles.hidden)

    return (
      <li className={styles.UtilityLink}>
        <Link {...linkProps} className={anchorClass} to={url}>
          {text}
        </Link>
      </li>
    )
  }
}

UtilityLink.defaultProps = {
  url: '#',
  visible: true
}

// either url or onClick should be set
UtilityLink.propTypes = {
  text: React.PropTypes.string.isRequired,
  id: React.PropTypes.string,
  url: React.PropTypes.string,
  onClick: React.PropTypes.func,
  visible: React.PropTypes.bool,
  onKeyDown: React.PropTypes.func,
  onFocus: React.PropTypes.func,
  onBlur: React.PropTypes.func
}

export default UtilityLink
