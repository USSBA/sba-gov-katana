import React from 'react'

import styles from './text-input.scss'
import { FailureIcon, FormErrorMessage, SuccessIcon, SearchIcon, ValidationIcon } from 'atoms'

class TextInput extends React.Component {
  constructor() {
    super()
    this.state = {
      isValid: true
    }
  }

  iconValidation(validationState) {
    if (this.props.showSuccessIcon && validationState === 'success') {
      return <SuccessIcon aria-hidden="true" />
    } else if (this.props.showErrorIcon && validationState === 'error') {
      return <FailureIcon aria-hidden="true" />
    } else {
      return null
    }
  }

  inputValidation(validationState) {
    const { isValid } = this.state
    return validationState === 'error' || !isValid ? styles.textInputInvalid : styles.textInput
  }

  errorMessage(validationState) {
    const { isValid } = this.state
    return validationState === 'error' || !isValid ? (
      <FormErrorMessage errorFor={this.props.id} errorText={this.props.errorText} />
    ) : null
  }

  handleChange(event) {
    const { onChange } = this.props
    const { isValid } = this.state
    if (onChange) {
      onChange(event)
    }
    //if input becomes valid as you type, set that it is valid
    if (this.isValid(event.target.value) && !isValid) {
      this.setState({ isValid: true })
    }
  }

  isValid(value) {
    const { validationFunction } = this.props
    if (validationFunction) {
      return validationFunction(value)
    } else {
      return true
    }
  }

  handleBlur(event) {
    const { isValid } = this.state
    const isNewValueValid = this.isValid(event.target.value)
    //only invalidate input on a blur
    if (isNewValueValid !== isValid) {
      this.setState({ isValid: isNewValueValid })
    }
  }

  render() {
    const {
      label,
      hidden,
      id,
      validationState,
      errorText,
      showSearchIcon,
      showValidationIcon,
      showSuccessIcon,
      showErrorIcon,
      labelStyle,
      onChange,
      className,
      queryParamName,
      validationFunction,
      ...rest
    } = this.props
    const validationIcon = this.iconValidation(validationState)
    const errorMessage = this.errorMessage(validationState)
    //todo: use aria-labelledby in the input instead of htmlFor in the label
    return (
      <div
        id={id + '-container'}
        className={`${styles.inputContainer} ${className ? className : ''}`}
        hidden={hidden}
      >
        <label htmlFor={id} className={labelStyle ? labelStyle : styles.controlLabel}>
          {label}
        </label>
        <div className={styles.textInputContainer}>
          <input
            id={id}
            {...rest}
            onChange={this.handleChange.bind(this)}
            onBlur={this.handleBlur.bind(this)}
            className={`${this.inputValidation(validationState)} ${
              showSearchIcon ? styles.searchIconPadding : ''
            }`}
          />
          {showSearchIcon ? (
            <div className={styles.searchIcon}>
              <SearchIcon aria-hidden="true" />
            </div>
          ) : null}
          <ValidationIcon
            validationState={validationState}
            showSuccessIcon={showSuccessIcon}
            showErrorIcon={showErrorIcon}
          />
        </div>
        {errorMessage}
      </div>
    )
  }
}

TextInput.defaultProps = {
  showSuccessIcon: true,
  showErrorIcon: false,
  id: null
}

export default TextInput
