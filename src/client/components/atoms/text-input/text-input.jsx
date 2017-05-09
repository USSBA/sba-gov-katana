import React from 'react';
import styles from './text-input.scss';
import FormErrorMessage from "../form-error-message/form-error-message.jsx";

class TextInput extends React.Component {

  iconValidation(validationState) {
    return validationState == 'success' && this.props.showValidationIcon
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
      ? <FormErrorMessage errorFor={this.props.id} errorText={this.props.errorText}/>
      : null
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
      ...rest
    } = this.props;
    let validationIcon = this.iconValidation(validationState);
    let errorMessage = this.errorMessage(validationState);
    return (
      <div id={id + "-container"} className={styles.inputContainer} hidden={hidden}>
        <label htmlFor={this.props.id} className={styles.controlLabel}>
          {label}
        </label>
        <div className={styles.textInputContainer}>
          <input id={this.props.id} {...rest} className={this.inputValidation(validationState)} onChange={onChange}/> {validationIcon}
        </div>
        {errorMessage}
      </div>
    );
  }
}

TextInput.defaultProps = {
  showValidationIcon: true
}

export default TextInput;
