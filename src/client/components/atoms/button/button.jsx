import React, { PropTypes } from 'react'

import classNames from 'classnames'
import styles from './button.scss'
import { BasicLink } from 'atoms'

const Button = props => {
  const { alternate, children, fullWidth, icon, id, primary, secondary, ...nativeProps } = props

  const className = classNames({
    [styles.alternate]: alternate,
    [styles.button]: true,
    [styles.fullWidth]: fullWidth,
    [styles.primary]: primary,
    [styles.secondary]: secondary,
    [styles.spacing]: true
  })

  // return (
  //   <button type="button" {...nativeProps} className={className}>{children}</button>
  // )

  return (
    <a href="javascript:;" {...nativeProps} className={className}>
      {children}
    </a>
  )
}

Button.propTypes = {
  // TODO: implement props: children, loading, size,

  disableCheck: (props, propname, componentName) => {
    const { children, disabled, ...rest } = props

    // if "disabled" is given along with additional props
    if (disabled && Object.keys(rest).length > 0) {
      return new Error(`props length is ${props.length}`)
    }
  },

  // A button must be either "primary" or "secondary".
  // Primary buttons are filled; secondary buttons are outlined.
  typeCheck: (props, propName, componentName) => {
    const { primary, secondary } = props

    if (!(primary ^ secondary)) {
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

  // Style button in its alternate form, i.e. primary-alt with a different coloring.
  alternate: PropTypes.bool,
  id: PropTypes.string
}

export default Button
