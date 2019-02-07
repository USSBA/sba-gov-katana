import React from 'react'

import styles from './utility-link.scss'
import { Link } from 'atoms'

class UtilityLink extends React.Component {
  render() {
    const { text, url, visible, gray, ...linkProps } = this.props
    const anchorClass = styles.link + ' ' + (visible ? '' : styles.hidden)

    return (
      <li className={gray ? styles.gray : styles.white}>
        <Link {...linkProps} className={anchorClass} to={url}>
          {text}
        </Link>
      </li>
    )
  }
}

UtilityLink.defaultProps = {
  /* eslint-disable-next-line no-script-url */
  url: 'javascript:void(0);',
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
