import React from 'react';
import { FormGroup, FormControl, Checkbox, ControlLabel, Col } from 'react-bootstrap';
import styles from './form-helpers.scss';
import TextInput from "../atoms/text-input.jsx";



export const SelectBox = ({handleChange, label, getValidationState, ...props}) => <Col xs={ 12 } xsOffset={ 0 }>
                                                                                  <FormGroup validationState={ getValidationState }>
                                                                                    <ControlLabel className={ styles.controlLabel }>
                                                                                      { label }
                                                                                    </ControlLabel>
                                                                                    <FormControl {...props} onChange={ handleChange } componentClass="select" />
                                                                                  </FormGroup>
                                                                                  </Col>;
