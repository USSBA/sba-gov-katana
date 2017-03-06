import React from 'react';
import { FormGroup, FormControl, Checkbox, ControlLabel, Col } from 'react-bootstrap';
import styles from '../common/styles.scss';
import commonStyles from '../../styles/common.scss';
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

export const TextInput = ({handleChange, getValidationState, hidden, ...props}) => <Col xs={ 12 } xsOffset={ 0 } sm={ 6 } smOffset={ 3 } lgHidden={ hidden } mdHidden={ hidden }
                                                                                     smHidden={ hidden } xsHidden={ hidden }>
                                                                                   <FormGroup className="input1" validationState={ getValidationState }>
                                                                                     <ControlLabel className={ styles.controlLabel }>
                                                                                       { props.label }
                                                                                     </ControlLabel>
                                                                                     <FormControl {...props} onChange={ handleChange } />
                                                                                     <FormControl.Feedback/>
                                                                                   </FormGroup>
                                                                                   </Col>;

export const TextArea = ({handleChange, label, getValidationState, ...props}) => <Col xs={ 12 } xsOffset={ 0 } sm={ 6 } smOffset={ 3 }>
                                                                                 <FormGroup validationState={ getValidationState }>
                                                                                   <ControlLabel className={ styles.controlLabel }>
                                                                                     { label }
                                                                                   </ControlLabel>
                                                                                   <FormControl {...props} onChange={ handleChange } componentClass="textArea" />
                                                                                 </FormGroup>
                                                                                 </Col>;

export const SelectBox = ({handleChange, label, getValidationState, ...props}) => <Col xs={ 12 } xsOffset={ 0 } sm={ 6 } smOffset={ 3 }>
                                                                                  <FormGroup validationState={ getValidationState }>
                                                                                    <ControlLabel className={ styles.controlLabel }>
                                                                                      { label }
                                                                                    </ControlLabel>
                                                                                    <FormControl {...props} onChange={ handleChange } componentClass="select" />
                                                                                  </FormGroup>
                                                                                  </Col>;

export const CheckBox = ({handleClick, label, getValidationState, ...props}) => <Col xs={ 12 } xsOffset={ 0 } sm={ 6 } smOffset={ 3 }>
                                                                                <FormGroup validationState={ getValidationState }>
                                                                                  <Checkbox {...props} onClick={ handleClick }>
                                                                                    { label }
                                                                                  </Checkbox>
                                                                                </FormGroup>
                                                                                </Col>;

export const MultiSelectBox = ({label, getValidationState, ...props}) => <Col xs={ 12 } xsOffset={ 0 } sm={ 6 } smOffset={ 3 }>
                                                                         <FormGroup validationState={ getValidationState }>
                                                                           <ControlLabel className={ styles.controlLabel }>
                                                                             { label }
                                                                           </ControlLabel>
                                                                           <MultiSelect tabSelectsValue={ false } multi={ true } simpleValue={ true } joinValues={ true } delimiter={ "," }
                                                                             {...props}/>
                                                                         </FormGroup>
                                                                         </Col>;
