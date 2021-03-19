import React from 'react'
import styles from './textarea.scss'
import { FormErrorMessage } from 'atoms'
import { ValidationIcon } from 'atoms'

class TextArea extends React.Component {
  inputValidation(validationState) {
    return validationState === 'error' ? styles.textAreaInvalid : styles.textArea
  }

  errorMessage(validationState, errorText) {
    return validationState === 'error' ? (
      <FormErrorMessage errorFor={this.props.id} errorText={this.props.errorText} />
    ) : null
  }

  render() {
    const {
      id,
      label,
      value,
      hidden,
      validationState,
      onChange,
      errorText,
      showCounter,
      showValidationIcon,
      showSuccessIcon,
      showErrorIcon,
      labelStyle,
      helperText,
      className,
      ...rest
    } = this.props

    return (
      <div id={id + '-container'} className={styles.inputContainer} hidden={hidden}>
        <label
          htmlFor={this.props.id}
          className={labelStyle ? labelStyle : styles.controlLabel}
          tabIndex="0"
          aria-label={label}
        >
          {label}
        </label>
        <div className={styles.textAreaContainer}>
          <textarea
            {...rest}
            id={id}
            className={this.inputValidation(validationState) + ' ' + className}
            onChange={onChange}
            maxLength="250"
            value={value}
            aria-label={helperText}
          />
          <ValidationIcon
            validationState={this.props.validationState}
            showSuccessIcon={this.props.showSuccessIcon}
            showErrorIcon={this.props.showErrorIcon}
            extraClassName={styles.validationIcon}
          />
        </div>
        {helperText && <span className={styles.helperText}>{helperText}</span>}
        {!helperText && showCounter ? (
          <span className={styles.textAreaCounter}>
            {value.length}
            /250
          </span>
        ) : (
          <div />
        )}
        {this.errorMessage(validationState, errorText)}
      </div>
    )
  }
}

TextArea.defaultProps = {
  showCounter: true,
  showSuccessIcon: true,
  showErrorIcon: false,
  value: ''
}

export default TextArea
