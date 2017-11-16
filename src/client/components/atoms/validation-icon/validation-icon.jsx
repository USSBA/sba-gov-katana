import React from 'react'
import styles from './validation-icon.scss'

class ValidationIcon extends React.Component {
  render() {
    if (this.props.showSuccessIcon && this.props.validationState == 'success') {
      return (
        <i
          className={'fa fa-check-circle ' + styles.success + ' ' + this.props.extraClassName}
          aria-hidden="true"
        />
      )
    } else if (this.props.showErrorIcon && this.props.validationState == 'error') {
      return (
        <i
          className={'fa fa-exclamation-circle ' + styles.error + ' ' + this.props.extraClassName}
          aria-hidden="true"
        />
      )
    } else {
      return null
    }
  }
}

export default ValidationIcon
