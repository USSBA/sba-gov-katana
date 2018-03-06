import React from 'react'

import styles from './text-input.scss'
import { FailureIcon, FormErrorMessage, SuccessIcon, SearchIcon, ValidationIcon } from 'atoms'

class TextInput extends React.Component {
  onChange(event) {
    if (this.props.onChange) {
      this.props.onChange(event.target.value)
    }
  }
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
    return validationState == 'error' ? styles.textInputInvalid : styles.textInput
  }

  errorMessage(validationState) {
    return validationState == 'error' ? (
      <FormErrorMessage errorFor={this.props.id} errorText={this.props.errorText} />
    ) : null
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
      className,
      queryParamName,
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
        <label htmlFor={this.props.id} className={labelStyle ? labelStyle : styles.controlLabel}>
          {label}
        </label>
        <div className={styles.textInputContainer}>
          <input
            id={this.props.id}
            {...rest}
            className={`${this.inputValidation(validationState)} ${
              showSearchIcon ? styles.searchIconPadding : ''
            }`}
            onChange={this.onChange.bind(this)}
          />
          {showSearchIcon ? (
            <div className={styles.searchIcon}>
              <SearchIcon aria-hidden="true" />
            </div>
          ) : null}
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
  showErrorIcon: false,
  id: null
}

export default TextInput
