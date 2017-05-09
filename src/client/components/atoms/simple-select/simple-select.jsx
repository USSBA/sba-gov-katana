import React from 'react';
import styles from "./simple-select.scss"
class SimpleSelect extends React.Component {

  getValidationIcon() {
    return this.props.validationState == 'success'
      ? <i className={"fa fa-check-circle " + styles.textInputIconValid} aria-hidden="true"></i>
      : null
  }

  getValidationStyle() {
    return this.props.validationState == 'error'
      ? styles.textInputInvalid
      : styles.textInput
  }

  getErrorMessage() {
    return this.props.validationState == 'error'
      ? <p id={this.props.id + "-error"} className={styles.errorText}>
          {this.props.errorText}
        </p>
      : null
  }

  getLabel() {
    let labelTag = this.props.label
      ? (
        <label htmlFor={id} className={styles.controlLabel}>
          {this.props.label}
        </label>
      )
      : "";
    return labelTag;
  }

  render() {
    let validationIcon = this.getValidationIcon();
    let errorMessage = this.getErrorMessage();
    let labelTag = this.getLabel();

    return (
      <div id={this.props.id + "-container"} className={styles.selectContainer} hidden={this.props.hidden}>
        {labelTag}
        <div>
          <select id={this.props.id} className={styles.myselect}>
            <option key={this.props.options.length + 1} value="" disabled selected>{this.props.defaultValue}</option>
            {this.props.options.map(function(item, index) {
              return (
                <option key={index} value={item.value} className={styles.myoption}>{item.name}</option>
              );
            })}
          </select>
          <i class="fa fa-chevron-down" aria-hidden="true"></i>
          {validationIcon}
        </div>
        {errorMessage}
      </div>
    );
  }
}

SimpleSelect.defaultProps = {
  options: [],
  defaultValue: "Select a state"
}

export default SimpleSelect;
