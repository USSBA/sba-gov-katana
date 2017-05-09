import React from 'react';
import styles from './textarea.scss';
import FormErrorMessage from "../form-error-message/form-error-message.jsx";
import ValidationIcon from '../validation-icon/validation-icon.jsx';

class TextArea extends React.Component {

  inputValidation(validationState) {
    return validationState == 'error'
      ? styles.textAreaInvalid
      : styles.textArea
  }

  errorMessage(validationState, errorText) {
    return validationState == 'error'
      ? <FormErrorMessage errorFor={this.props.id} errorText={this.props.errorText}/>
      : null
  }

  render() {
    let {
      label,
      value,
      hidden,
      validationState,
      onChange,
      errorText,
      showCounter,
      showValidationIcon,
      ...rest
    } = this.props;
    return (
      <div className={styles.inputContainer} hidden={hidden}>
        <label className={styles.controlLabel}>
          {label}
        </label>
        <div className={styles.textAreaContainer}>
          <textarea {...rest} className={this.inputValidation(validationState)} onChange={onChange} maxLength="250"/>
          <ValidationIcon validationState={this.props.validationState} showSuccessIcon={this.props.showSuccessIcon} showErrorIcon={this.props.showErrorIcon} extraClassName={styles.validationIcon}/>
        </div>
        {showCounter
          ? <span className={styles.textAreaCounter}>{value.length}/250</span>
          : <div/>}
        {this.errorMessage(validationState, errorText)}
      </div>
    );
  }
}

TextArea.defaultProps = {
  showCounter: true,
  showSuccessIcon: true,
  showErrorIcon: false
}

export default TextArea;
