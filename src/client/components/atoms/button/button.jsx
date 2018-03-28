import React, { PropTypes } from 'react'
import { Link } from 'react-router'

import classNames from 'classnames'
import styles from './button.scss'

const Button = props => {
  const { alternate, children, fullWidth, icon, url, primary, secondary, ...nativeProps } = props

  // TODO: make full width based on media query based on prop
  const className = classNames({
    [styles.alternate]: alternate,
    [styles.fullWidth]: fullWidth,
    [styles.primary]: primary,
    [styles.link]: url,
    [styles.secondary]: secondary,
    [styles.spacing]: true
  })

  // TODO: check native props map correctly to anchor or button
  return url ? (
    <Link {...nativeProps} to={url} className={className}>
      {children}
    </Link>
  ) : (
    <button {...nativeProps} className={className}>
      {children}
    </button>
  )
}

Button.propTypes = {
  // If not disabled, a button must be either "primary" or "secondary".
  // Primary buttons are filled; secondary buttons are outlined.
  typeCheck: (props, propName, componentName) => {
    const { disabled, primary, secondary } = props

    if (!disabled && !(primary ^ secondary)) {
      return new Error(`${componentName} was not specified as "primary" xor "secondary"`)
    }
  },

  // Only a primary button has an "alternate" styling.
  alternateCheck: (props, propName, componentName) => {
    const { alternate, primary } = props

    if (alternate && !primary) {
      return new Error(
        `${componentName} was specified with "alternate" but only a "primary" ${
          componentName
        } can have "alternate"`
      )
    }
  },

  // Style button in its alternate coloring
  alternate: PropTypes.bool,

  // The content inside the button
  children: PropTypes.oneOfType([PropTypes.array, PropTypes.element, PropTypes.string]).isRequired,

  // Span button to the full width of its parent
  fullWidth: PropTypes.bool,

  // The location to navigate to when the button is activated. Setting this
  // prop will render the button as an anchor internally.
  url: PropTypes.string
}

export default Button
