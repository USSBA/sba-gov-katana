import NumberInput from "react-number-input";
import React from "react";
import {
  ValidationIcon,
  FormErrorMessage,
  SuccessIcon,
  FailureIcon
} from "atoms";
import styles from "./formatted-number-input.scss";

class FormattedNumberInput extends React.Component {
  
  iconValidation(validationState) {

    let result = null;

    if (this.props.showSuccessIcon && validationState === "success") {
      
      result = <SuccessIcon aria-hidden="true" />;

    } else if (this.props.showErrorIcon && validationState === "error") {
      
      result = <FailureIcon aria-hidden="true" />;

    }

    return result;
    
  }

  inputValidation(validationState) {
  
    return validationState === "error" ? styles.textInputInvalid : styles.textInput;
  
  }

  errorMessage(validationState) {
  
    return validationState === "error" ? <FormErrorMessage errorFor={this.props.id} errorText={this.props.errorText}/> : null;
  
  }

  render() {
    
    const {
      label,
      hidden,
      onChange,
      id,
      validationState,
      errorText,
      showValidationIcon,
      showSuccessIcon,
      showErrorIcon,
      ...rest
    } = this.props;
    
    const validationIcon = this.iconValidation(validationState);
    const errorMessage = this.errorMessage(validationState);
    
    return (
    
      <div id={id + "-container"} className={styles.inputContainer} hidden={hidden}>
        
        <label htmlFor={this.props.id} className={styles.controlLabel}>
          {label}
        </label>

        <div className={styles.textInputContainer}>
        
          <NumberInput
            id={this.props.id}
            {...rest}
            className={this.inputValidation(validationState)}
            onChange={onChange}
          />

          <ValidationIcon validationState={this.props.validationState} showSuccessIcon={this.props.showSuccessIcon} showErrorIcon={this.props.showErrorIcon} />
        
        </div>

        {errorMessage}

      </div>

    );
  }
}

FormattedNumberInput.defaultProps = {
  showSuccessIcon: true,
  showErrorIcon: false
};

export default FormattedNumberInput;
