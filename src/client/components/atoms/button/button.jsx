import React from 'react'
import PropTypes from 'prop-types'

import classNames from 'classnames'
import styles from './button.scss'
import { Link } from 'atoms'

const Button = props => {
  const {
    alternate,
    children,
    fullWidth,
    icon,
    loading,
    naked,
    small,
    spacing,
    primary,
    responsive,
    secondary,
    url,
    ...nativeProps
  } = props

  console.log('nativeProps', nativeProps)

  const className = classNames({
    button: true,
    [styles.alternate]: alternate,
    [styles.fullWidth]: fullWidth,
    [styles.large]: !small,
    [styles.link]: url,
    [styles.loading]: loading,
    [styles.naked]: naked,
    [styles.primary]: primary,
    [styles.responsive]: responsive,
    [styles.secondary]: secondary,
    [styles.small]: small,
    [styles.spacing]: spacing,
    [nativeProps.className]: nativeProps?.className
  })

  // TODO: order is fragile
  const mergedProps = {
    'data-testid': 'button',
    ...nativeProps,
    className,
    disabled: nativeProps.disabled || loading,
    ...(url && { to: url })
  }

  const content = loading ? <i className="fa fa-circle-o-notch fa-spin fa-fw" /> : children

  // TODO: check native props map correctly to anchor or button
  return url ? <Link {...mergedProps}>{content}</Link> : <button {...mergedProps}>{content}</button>
}

Button.defaultProps = {
  spacing: true,
  responsive: true
}

Button.propTypes = {
  // If not disabled, a button must be either "primary" or "secondary".
  // Primary buttons are filled; secondary buttons are outlined.
  typeCheck: (props, propName, componentName) => {
    const { disabled, primary, secondary } = props

    if (!disabled && !(primary ^ secondary)) {
      return Error(`${componentName} was not specified as "primary" or "secondary"`)
    }
  },

  // Only a primary button has an "alternate" styling.
  alternateCheck: (props, propName, componentName) => {
    const { alternate, primary } = props

    if (alternate && !primary) {
      return Error(
        `${componentName} was specified with "alternate" but only a "primary" ${componentName} can have "alternate"`
      )
    }
  },

  // Style button in its alternate coloring
  alternate: PropTypes.bool,

  // The content inside the button
  children: PropTypes.oneOfType([PropTypes.array, PropTypes.element, PropTypes.string]).isRequired,

  // Span button to the full width of its parent
  fullWidth: PropTypes.bool,

  // Replace button text with a spinner. Button is disabled while loading
  loading: PropTypes.bool,

  // Add spacing to sibling buttons depending on context. Set to true by default.
  spacing: PropTypes.bool,

  // Decrease the font size and padding of the button.
  small: PropTypes.bool,

  // Render as full-width at small screen sizes.
  responsive: PropTypes.bool,

  // The location to navigate to when the button is activated. Setting this
  // prop will render the button as an anchor internally.
  url: PropTypes.string
}

export default Button
