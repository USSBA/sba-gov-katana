import React from 'react'

import styles from './text-input.scss'
import {
  FailureIcon,
  FormErrorMessage,
  SuccessIcon,
  ValidationIcon
} from 'atoms'

class TextInput extends React.Component {
  iconValidation(validationState) {
    if (this.props.showSuccessIcon && validationState == 'success') {
      return <SuccessIcon aria-hidden="true" />
    } else if (this.props.showErrorIcon && validationState == 'error') {
      return <FailureIcon aria-hidden="true" />
    } else {
      return null
    }
  }

  inputValidation(validationState) {
    return validationState == 'error'
      ? styles.textInputInvalid
      : styles.textInput
  }

  errorMessage(validationState) {
    return validationState == 'error' ? (
      <FormErrorMessage
        errorFor={this.props.id}
        errorText={this.props.errorText}
      />
    ) : null
  }
  render() {
    let {
      label,
      hidden,
      onChange,
      id,
      validationState,
      errorText,
      showValidationIcon,
      showSuccessIcon,
      showErrorIcon,
      ...rest
    } = this.props
    let validationIcon = this.iconValidation(validationState)
    let errorMessage = this.errorMessage(validationState)
    return (
      <div
        id={id + '-container'}
        className={styles.inputContainer}
        hidden={hidden}
      >
        <label htmlFor={this.props.id} className={styles.controlLabel}>
          {label}
        </label>
        <div className={styles.textInputContainer}>
          <input
            id={this.props.id}
            {...rest}
            className={this.inputValidation(validationState)}
            onChange={onChange}
          />
          <ValidationIcon
            validationState={this.props.validationState}
            showSuccessIcon={this.props.showSuccessIcon}
            showErrorIcon={this.props.showErrorIcon}
          />
        </div>
        {errorMessage}
      </div>
    )
  }
}

TextInput.defaultProps = {
  showSuccessIcon: true,
  showErrorIcon: false
}

export default TextInput
