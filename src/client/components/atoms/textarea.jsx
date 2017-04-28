import React from 'react';
import styles from './form-helpers.scss';

class TextArea extends React.Component {

  iconValidation(validationState) {
    return validationState == 'success'
      ? <i className={"fa fa-check-circle " + styles.textAreaIconValid} aria-hidden="true"></i>
      : null
  }

  inputValidation(validationState) {
    return validationState == 'error'
      ? styles.textAreaInvalid
      : styles.textArea
  }

  errorMessage(validationState, errorText) {
    return validationState == 'error'
      ? <p className={styles.errorText}>
          {errorText}
        </p>
      : null
  }

  render() {
    let {
      label,
      value,
      hidden,
      getValidationState,
      handleChange,
      onChange,
      errorText,
      showCounter,
      ...rest
    } = this.props;
    return (
      <div className={styles.inputContainer} hidden={hidden}>
        <label className={styles.controlLabel}>
          {label}
        </label>
        <div className={styles.textAreaContainer}>
          <textarea {...rest} className={this.inputValidation(getValidationState)} onChange={handleChange || onChange} maxLength="250"/> {this.iconValidation(getValidationState)}
        </div>
        {showCounter?<span className={styles.textAreaCounter}>{value.length}/250</span>: <div/>}
        {this.errorMessage(getValidationState, errorText)}
      </div>
    );
  }
}

TextArea.defaultProps = {
    showCounter: true
}

export default TextArea;
