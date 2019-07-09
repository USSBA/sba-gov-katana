import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import { kebabCase } from 'lodash'

import styles from './text-input.scss'
import { FailureIcon, FormErrorMessage, SuccessIcon, SearchIcon, ValidationIcon } from 'atoms'

class TextInput extends React.Component {
  constructor() {
    super()
    this.state = {
      isFocused: false,
      isValid: true,
      value: ''
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

  handleBlur(event) {
    const { isValid } = this.state
    const isNewValueValid = this.isValid(event.target.value)

    // only invalidate input on a blur
    if (isNewValueValid !== isValid) {
      this.setState({ isValid: isNewValueValid })
    }

    this.setState({ isFocused: false })
  }

  handleChange(event) {
    const { onChange } = this.props
    const { isValid } = this.state
    const {
      target: { value }
    } = event

    if (onChange) {
      onChange(event)
    }

    // if input becomes valid as you type, set that it is valid
    if (this.isValid(value) && !isValid) {
      this.setState({ isValid: true })
    }

    this.setState({ value })
  }

  handleFocus(event) {
    const { onFocus } = this.props

    if (onFocus) {
      onFocus(event)
    }

    this.setState({ isFocused: true })
  }

  handleKeyUp(event) {
    const { isValid } = this.state
    const isNewValueValid = this.isValid(event.target.value)

    if (isNewValueValid !== isValid) {
      this.setState({ isValid: isNewValueValid })
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
      optional,
      className,
      queryParamName,
      validationFunction,
      ...rest
    } = this.props
    const { isFocused, isValid, value } = this.state

    const validationIcon = this.iconValidation(validationState)
    const errorMessage = this.errorMessage(validationState)

    return (
      <div
        id={kebabCase(`${id} container`)}
        className={classNames({
          'text-input': true,
          [styles.textInput]: true,
          [className]: className
        })}
        hidden={hidden}
        data-testid={kebabCase(`${id} container`)}
      >
        <label htmlFor={id} className={labelStyle ? labelStyle : undefined} data-testid={kebabCase(`${id} label`)}>
          {label}
        </label>
        <div className={styles.container}>
          <input
            id={id}
            {...rest}
            aria-labelledby={id}
            className={classNames({
              [styles.input]: true,
              [styles.invalid]: validationState === 'error' || !isValid,
              [styles.searchIconPadding]: showSearchIcon
            })}
            data-testid={id}
            onChange={this.handleChange.bind(this)}
            onBlur={this.handleBlur.bind(this)}
            onFocus={this.handleFocus.bind(this)}
            onKeyUp={this.handleKeyUp.bind(this)}
          />
          {optional && !isFocused && !value && <span className={styles.optional}>Optional</span>}
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
  optional: PropTypes.bool,
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
