import React from 'react';
import styles from '../helpers/form-helpers.scss';

class TextInput extends React.Component {

  iconValidation() {
    return this.props.getValidationState == 'success'
      ? <i className={"fa fa-check-circle " + styles.textInputIconValid} aria-hidden="true"></i>
      : null
  }

  inputValidation() {
    return this.props.getValidationState == 'error'
      ? styles.textInputInvalid
      : styles.textInput
  }

  errorMessage() {
    return this.props.getValidationState == 'error'
      ? <p id={this.props.id + "-error"} className={styles.errorText}>
          {this.props.errorText}
        </p>
      : null
  }
  render() {
    let validationIcon = this.iconValidation();
    let errorMessage = this.errorMessage();
    return (
      <div id={this.props.id + "-container"} className={styles.inputContainer} hidden={this.props.hidden}>
        <label className={styles.controlLabel}>
          {this.props.label}
        </label>
        <div className={styles.textInputContainer}>
          <input {...this.props} className={this.inputValidation()} onChange={this.props.handleChange}/> {validationIcon}
        </div>
        {errorMessage}
      </div>
    );
  }
}

export default TextInput;
