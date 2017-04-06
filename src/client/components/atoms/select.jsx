import React from 'react';
import {FormGroup, FormControl, Checkbox, ControlLabel, Col} from 'react-bootstrap';
import styles from './form-helpers.scss';

class Select extends React.Component {
  render() {
    let {
      handleChange,
      label,
      getValidationState,
      ...props
    } = this.props;
    return (
      <Col xs={12} xsOffset={0}>
        <FormGroup validationState={getValidationState}>
          <ControlLabel className={styles.controlLabel}>
            {label}
          </ControlLabel>
          <FormControl {...props} onChange={handleChange} componentClass="select"/>
        </FormGroup>
      </Col>
    );
  }
}

export default Select;
