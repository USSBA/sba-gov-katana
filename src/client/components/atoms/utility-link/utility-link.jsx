import React from 'react'
import PropTypes from 'prop-types'

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
  text: PropTypes.string.isRequired,
  id: PropTypes.string,
  url: PropTypes.string,
  onClick: PropTypes.func,
  visible: PropTypes.bool,
  onKeyDown: PropTypes.func,
  onFocus: PropTypes.func,
  onBlur: PropTypes.func
}

export default UtilityLink
