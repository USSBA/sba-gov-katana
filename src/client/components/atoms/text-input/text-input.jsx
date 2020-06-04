import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import { kebabCase } from 'lodash'

import styles from './text-input.scss'
import { FormErrorMessage, SearchIcon, ValidationIcon } from 'atoms'

class TextInput extends React.Component {
  constructor() {
    super()
    this.state = {
      isFocused: false,
      isValid: true,
      value: ''
    }
  }

  componentDidMount() {
    this.isValid(this.props.value)
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
    const { onChange, onChangeCallback } = this.props
    const { isValid } = this.state
    const {
      target: { value }
    } = event

    if (onChange) {
      onChange(event)
      onChangeCallback && onChangeCallback(value)
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
      isVisible,
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
      inputType,
      inputMode,
      ...rest
    } = this.props
    const { isFocused, isValid, value } = this.state

    const errorMessage = this.errorMessage(validationState)

    const optionalPlaceholderProp = {}
    if (optional && !isFocused && !value) {
      optionalPlaceholderProp.placeholder = 'Optional'
    }

    return (
      isVisible && (
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
          <label
            htmlFor={id}
            className={labelStyle ? labelStyle : null}
            data-testid={kebabCase(`${id} label`)}
          >
            {label}
          </label>
          <div className={styles.container}>
            <input
              id={id}
              {...rest}
              {...optionalPlaceholderProp}
              aria-labelledby={id}
              className={classNames({
                [styles.input]: true,
                [styles.invalid]: validationState === 'error' || !isValid,
                [styles.searchIconPadding]: showSearchIcon
              })}
              data-testid={id}
              type={inputType || 'text'}
              inputMode={inputMode || 'text'}
              onChange={this.handleChange.bind(this)}
              onBlur={this.handleBlur.bind(this)}
              onFocus={this.handleFocus.bind(this)}
              onKeyUp={this.handleKeyUp.bind(this)}
              required={!this.props.optional}
              // for DatalistDropdown
              list={this.props.listName ? this.props.listName : ''}
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
    )
  }
}

TextInput.defaultProps = {
  showSuccessIcon: true,
  showErrorIcon: false,
  isVisible: true,
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

  inputType: PropTypes.string,
  inputMode: PropTypes.string,

  // Passed to iconValidation() and returns SuccessIcon or FailureIcon
  validationState: PropTypes.oneOf(['success', 'error', '']),
  isVisible: PropTypes.bool
}

export default TextInput
