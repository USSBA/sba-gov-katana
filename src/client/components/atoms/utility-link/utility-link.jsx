import React from 'react'

import styles from './utility-link.scss'
import { BasicLink } from 'atoms'

class UtilityLink extends React.Component {
  render() {
    let anchorClass =
      styles.link + ' ' + (this.props.visible ? '' : styles.hidden)

    const picked = (({
      id,
      text,
      url,
      onClick,
      onBlur,
      onFocus,
      onKeyDown
    }) => ({ id, text, url, onClick, onBlur, onFocus, onKeyDown }))(this.props)
    return (
      <li className={styles.UtilityLink}>
        <BasicLink {...picked} myClassName={anchorClass} />
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
