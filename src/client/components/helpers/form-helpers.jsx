import React from 'react';
import { FormGroup, FormControl, Checkbox, ControlLabel, Col } from 'react-bootstrap';
import styles from './form-helpers.scss';
import TextInput from "../atoms/text-input.jsx";


//standard react form components to be used throughout application

export class CurrencyInput extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    const {onChange, onBlur, value, validationState, ...rest} = this.props;
    return (<TextInput {...rest} getValidationState={ validationState } handleChange={ onChange } onBlur={ onBlur } value={ value } />);
  }
}



export const TextArea = ({handleChange, getValidationState, errorText, hidden, ...props}) => {

  function iconValidation() {
    return getValidationState == 'success' ? <i className={ "fa fa-check-circle " + styles.textAreaIconValid } aria-hidden="true"></i> : null
  }

  function inputValidation() {
    return getValidationState == 'error' ? styles.textAreaInvalid : styles.textArea
  }

  function errMsg() {
    return getValidationState == 'error' ? <p className={ styles.errorText }>
                                             { errorText }
                                           </p> : null
  }

  return (
    <div className={ styles.inputContainer } hidden={ hidden }>
      <label className={ styles.controlLabel }>
        { props.label }
      </label>
      <div className={ styles.textAreaContainer }>
        <textarea {...props} className={ inputValidation() } onChange={ handleChange } maxLength="250" />
        { iconValidation() }
      </div>
      <span className={ styles.textAreaCounter }>{ props.value.length }/250</span>
      { errMsg() }
    </div>);
};


export const SelectBox = ({handleChange, label, getValidationState, ...props}) => <Col xs={ 12 } xsOffset={ 0 }>
                                                                                  <FormGroup validationState={ getValidationState }>
                                                                                    <ControlLabel className={ styles.controlLabel }>
                                                                                      { label }
                                                                                    </ControlLabel>
                                                                                    <FormControl {...props} onChange={ handleChange } componentClass="select" />
                                                                                  </FormGroup>
                                                                                  </Col>;
