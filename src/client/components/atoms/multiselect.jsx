import React from 'react';
import ReactSelect from 'react-select';
import 'react-select/dist/react-select.css';
import './react-select-helpers.css';
import { FormGroup, ControlLabel } from 'react-bootstrap';
import styles from '../helpers/form-helpers.scss';


class MultiSelectBox extends React.Component {
  render() {
    return (
      <FormGroup validationState={ this.props.getValidationState }>
        <ControlLabel className={ styles.controlLabel }>
          { this.props.label }
        </ControlLabel>
        <ReactSelect tabSelectsValue={ false } multi={ true } simpleValue={ true } joinValues={ true } delimiter={ "," }
          {...this.props}/>
      </FormGroup>
      );
  }
}

export default MultiSelectBox;
