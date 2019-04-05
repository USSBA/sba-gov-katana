import React, { PropTypes } from 'react'
import classNames from 'classnames'

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
    const { isValid } = this.state

    const validationIcon = this.iconValidation(validationState)
    const errorMessage = this.errorMessage(validationState)

    // TODO: use aria-labelledby in the input instead of htmlFor in the label
    return (
      <div
        id={id + '-container'}
        className={`${styles.inputContainer} ${className ? className : ''}`}
        hidden={hidden}
      >
        <label htmlFor={id} className={labelStyle && labelStyle}>
          {label}
        </label>
        <div className={styles.container}>
          <input
            id={id}
            {...rest}
            onChange={this.handleChange.bind(this)}
            onBlur={this.handleBlur.bind(this)}
            className={classNames({
              [styles.input]: true,
              [styles.invalid]: validationState === 'error' || !isValid,
              [styles.searchIconPadding]: showSearchIcon
            })}
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

TextInput.propTypes = {
  className: PropTypes.string,

  // Passed to FormErrorMessage and displayed as a paragraph
  errorText: PropTypes.string,

  hidden: PropTypes.bool,
  label: PropTypes.string,
  labelStyle: PropTypes.string,
  onChange: PropTypes.func,
  queryParamName: PropTypes.string,

  // Props that control icon display
  showSearchIcon: PropTypes.bool,
  showValidationIcon: PropTypes.bool,
  showSuccessIcon: PropTypes.bool,
  showErrorIcon: PropTypes.bool,

  validationFunction: PropTypes.func,

  // Passed to iconValidation() and returns SuccessIcon or FailureIcon
  validationState: PropTypes.oneOf(['success', 'error', ''])
}

export default TextInput
