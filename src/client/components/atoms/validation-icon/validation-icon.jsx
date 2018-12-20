import React from 'react'
import styles from './validation-icon.scss'

class ValidationIcon extends React.Component {
  render() {
    const { extraClassName, showErrorIcon, showSuccessIcon, validationState } = this.props

    if (showSuccessIcon && validationState === 'success') {
      return (
        <i className={'fa fa-check-circle ' + styles.success + ' ' + extraClassName} aria-hidden="true" />
      )
    } else if (showErrorIcon && validationState === 'error') {
      return (
        <i
          className={'fa fa-exclamation-circle ' + styles.error + ' ' + extraClassName}
          aria-hidden="true"
        />
      )
    } else {
      return null
    }
  }
}

export default ValidationIcon
