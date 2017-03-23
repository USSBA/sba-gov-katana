import React from 'react';
import { FormGroup, FormControl, Checkbox, ControlLabel, Col } from 'react-bootstrap';
import styles from './form-helpers.scss';


//standard react form components to be used throughout application

export class CurrencyInput extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    const {handleChange, handleFormat, value, getValidationState, ...rest} = this.props;
    return (<TextInput {...rest} getValidationState={ getValidationState } handleChange={ handleChange } onBlur={ handleFormat } value={ value } />);
  }
}

export const TextInput = ({handleChange, getValidationState, hidden, ...props}) => {

  function iconValidation() {
    return getValidationState == 'success' ? <i className={ "fa fa-check-circle " + styles.iconValid } aria-hidden="true"></i> : null
  }

  function inputValidation() {
    return getValidationState == 'error' ? styles.inputInvalid : styles.textInput
  }

  function errText() {
    return getValidationState == 'error' ? <p className={ styles.errText }>
                                             { props.errText }
                                           </p> : null
  }

  return (
    <div className={ styles.textInputContainer } hidden={ hidden } validationState={ getValidationState }>
      <label className={ styles.controlLabel }>
        { props.label }
      </label>
      <div className={ styles.inputContainer }>
        <input {...props} className={ inputValidation() } onChange={ handleChange } />
        { iconValidation() }
      </div>
      { errText() }
    </div>);
}

export const TextArea = ({handleChange, label, getValidationState, ...props}) => <FormGroup validationState={ getValidationState }>
                                                                                   <ControlLabel className={ styles.controlLabel }>
                                                                                     { label }
                                                                                   </ControlLabel>
                                                                                   <FormControl {...props} className={ styles.textArea } onChange={ handleChange } componentClass="textArea" />
                                                                                 </FormGroup>;

export const SelectBox = ({handleChange, label, getValidationState, ...props}) => <Col xs={ 12 } xsOffset={ 0 }>
                                                                                  <FormGroup validationState={ getValidationState }>
                                                                                    <ControlLabel className={ styles.controlLabel }>
                                                                                      { label }
                                                                                    </ControlLabel>
                                                                                    <FormControl {...props} onChange={ handleChange } componentClass="select" />
                                                                                  </FormGroup>
                                                                                  </Col>;

export const CheckBox = ({handleClick, label, getValidationState, ...props}) => <FormGroup validationState={ getValidationState }>
                                                                                  <Checkbox {...props} onClick={ handleClick }>
                                                                                    { label }
                                                                                  </Checkbox>
                                                                                </FormGroup>;

