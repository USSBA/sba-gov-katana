import React from 'react';
import { FormGroup, FormControl, Checkbox, ControlLabel, Col } from 'react-bootstrap';
import styles from './form-helpers.scss';
import MultiSelect from 'react-select';
import 'react-select/dist/react-select.css';
import './react-select-helpers.css';

//standard react form components to be used throughout application

export class CurrencyInput extends React.Component {
  constructor(props) {
    super(props)
  }
  render() {
    const {handleChange, handleFormat, value, getValidationState, ...rest} = this.props;
    return (<TextInput {...rest} getValidationState={ getValidationState } handleChange={ handleChange } onBlur={ handleFormat } value={ value } />);
  }
}

export const TextInput = ({handleChange, getValidationState, hidden, ...props}) => <FormGroup hidden={ hidden } validationState={ getValidationState }>
                                                                                     <ControlLabel className={ styles.controlLabel }>
                                                                                       { props.label }
                                                                                     </ControlLabel>
                                                                                     <FormControl {...props} className={ styles.textInput } onChange={ handleChange } />
                                                                                     <FormControl.Feedback className={ styles.validIcon } />
                                                                                   </FormGroup>;

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

export const MultiSelectBox = ({label, getValidationState, ...props}) => <FormGroup validationState={ getValidationState }>
                                                                           <ControlLabel className={ styles.controlLabel }>
                                                                             { label }
                                                                           </ControlLabel>
                                                                           <MultiSelect tabSelectsValue={ false } multi={ true } simpleValue={ true } joinValues={ true } delimiter={ "," }
                                                                             {...props}/>
                                                                         </FormGroup>;
