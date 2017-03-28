import React from 'react';
import ReactSelect from 'react-select';
import 'react-select/dist/react-select.css';
import './react-select-helpers.css';
import { FormGroup, ControlLabel } from 'react-bootstrap';
import styles from '../helpers/form-helpers.scss';
import _ from "lodash";


class MultiSelectBox extends React.Component {
  handleChange(newValue) {
    if (newValue.length <= this.props.maxValues) {
      this.props.onChange(_.map(newValue, 'value').join(","));
    }
  }
  render() {
    let arrayValue = this.props.value ? this.props.value.split(",") : [];
    return (
      <FormGroup validationState={ this.props.getValidationState }>
        <ControlLabel className={ styles.controlLabel }>
          { this.props.label }
        </ControlLabel>
        <ReactSelect tabSelectsValue={ false } multi={ true } onChange={ this.handleChange.bind(this) } name={ this.props.name } require={ this.props.required }
          autofocus value={ arrayValue } options={ this.props.options } />
      </FormGroup>
      );
  }
}

export default MultiSelectBox;
