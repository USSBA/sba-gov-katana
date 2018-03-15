import React, { PropTypes } from 'react'

import classNames from 'classnames'
import styles from './button.scss'
import { BasicLink } from 'atoms'

const Button = props => {
  const { alternate, children, icon, id, ...nativeProps } = props

  return <button className={styles.button}>{children}</button>
}

Button.propTypes = {
  // TODO: implement props: children, loading, size,

  // A button must be either "primary" or "secondary".
  // Primary buttons are filled; secondary buttons are outlined.
  type: (props, propName, componentName) => {
    const { primary, secondary } = props
    if (!primary && !secondary) {
      return new Error(`${componentName} was not specified as "primary" or "secondary"`)
    }
  },

  // Style button in its alternate form, i.e. primary-alt with a different coloring.
  alternate: PropTypes.bool

  // icon: Prop,

  // id:
  // id, css id
  // handle extra class names
  // url
  //
  // -- basic link
  // onclick
  // url
  // text
  // autofocus
  //
  // --native
  // disabled
  // onclick
  //
}

export default Button
