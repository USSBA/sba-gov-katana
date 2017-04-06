import React from 'react';
import ReactSelect from 'react-select';
import 'react-select/dist/react-select.css';
import './react-select-helpers.css';
import formHelperStyles from './form-helpers.scss';
import FormErrorMessage from "./form-error-message.jsx";
import styles from './multiselect.scss';
import _ from "lodash";

class MultiSelectBox extends React.Component {
  handleChange(newValue) {
    if (newValue.length <= this.props.maxValues) {
      this.props.onChange(_.map(newValue, 'value').join(","));
    }
  }
  handleBlur(){
      this.props.onBlur({target:{name: this.props.name}});
  }
  handleFocus(){
      this.props.onFocus({target:{name: this.props.name}});
  }
  render() {
    let arrayValue = this.props.value
      ? this.props.value.split(",")
      : [];
    let errorMessage = this.props.validationState == 'error'
      ? <FormErrorMessage errorText={this.props.errorText} />
      : undefined;
    let errorClass = this.props.validationState == 'error'
      ? styles.redBorder
      : undefined;
    return (
      <div>
        <label className={formHelperStyles.controlLabel}>
          {this.props.label}
        </label>
        <div className={styles.errorClass}>
          <ReactSelect className={errorClass} menuBuffer={10} tabSelectsValue={false} multi={true} autoBlur={true} onChange={this.handleChange.bind(this)} name={this.props.name} require={this.props.required} autofocus={this.props.autoFocus} value={arrayValue} options={this.props.options} onBlur={this.handleBlur.bind(this)} onFocus={this.handleFocus.bind(this)}/>
        </div>
        {errorMessage}
      </div>
    );
  }
}

export default MultiSelectBox;
