import React from 'react';
import styles from '../helpers/form-helpers.scss';

class TextInput extends React.Component {

  iconValidation(validationState) {
    return validationState == 'success'
      ? <i className={"fa fa-check-circle " + styles.textInputIconValid} aria-hidden="true"></i>
      : null
  }

  inputValidation(validationState) {
    return validationState == 'error'
      ? styles.textInputInvalid
      : styles.textInput
  }

  errorMessage(validationState) {
    return validationState == 'error'
      ? <p id={this.props.id + "-error"} className={styles.errorText}>
          {this.props.errorText}
        </p>
      : null
  }
  render() {
    let {label, hidden, handleChange, id, getValidationState, errorText, ...rest} = this.props;
    let validationIcon = this.iconValidation(getValidationState);
    let errorMessage = this.errorMessage(getValidationState);
    return (
      <div id={id + "-container"} className={styles.inputContainer} hidden={hidden}>
        <label className={styles.controlLabel}>
          {label}
        </label>
        <div className={styles.textInputContainer}>
          <input {...rest} className={this.inputValidation(getValidationState)} onChange={handleChange}/> {validationIcon}
        </div>
        {errorMessage}
      </div>
    );
  }
}

export default TextInput;
