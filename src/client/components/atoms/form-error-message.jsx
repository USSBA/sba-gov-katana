import React from 'react';
import formHelperStyles from '../helpers/form-helpers.scss';

class FormErrorMessage extends React.Component {
  render() {
    return (
      <p className={formHelperStyles.errorText}>
          {this.props.errorText}
      </p>
    );
  }
}
export default FormErrorMessage;
