import React from 'react'
import _ from 'lodash'

import styles from './small-icon.scss'

class SmallIcon extends React.Component {
  render() {
    const aProps = {
      id: this.props.id,
      className: this.props.extraClassName,
      tabIndex: this.props.tabbable ? '0' : '-1',
      onClick: this.props.onClick,
      onKeyDown: this.props.onKeyDown,
      href: this.props.href
    }

    if (!_.isEmpty(this.props['aria-label'])) {
      aProps['aria-label'] = this.props['aria-label']
    }

    return (
      <a {...aProps}>
        <i
          alt={this.props.altText}
          className={' fa fa-' + this.props.fontAwesomeIconClassName}
          aria-hidden="true"
        />
      </a>
    )
  }
}

/* esfmt-ignore-end */
/* options is array of name/value/text triples */
SmallIcon.propTypes = {
  id: React.PropTypes.string,
  altText: React.PropTypes.string,
  fontAwesomeIconClassName: React.PropTypes.string.isRequired,
  onClick: React.PropTypes.func,
  onKeyDown: React.PropTypes.func,
  tabbable: React.PropTypes.bool
}

SmallIcon.defaultProps = {
  tabbable: true,
  href: undefined,
  'aria-label': ''
}

export default SmallIcon
