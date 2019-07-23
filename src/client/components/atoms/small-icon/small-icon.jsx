import React from 'react'
import PropTypes from 'prop-types'
import { isEmpty } from 'lodash'

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

    if (!isEmpty(this.props['aria-label'])) {
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
  id: PropTypes.string,
  altText: PropTypes.string,
  fontAwesomeIconClassName: PropTypes.string.isRequired,
  onClick: PropTypes.func,
  onKeyDown: PropTypes.func,
  tabbable: PropTypes.bool
}

SmallIcon.defaultProps = {
  tabbable: true,
  /* eslint-disable-next-line no-script-url */
  href: 'javascript:void(0);',
  'aria-label': ''
}

export default SmallIcon
