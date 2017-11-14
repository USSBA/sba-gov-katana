import React from 'react'
import styles from './simple-select.scss'
import ValidationIcon from '../validation-icon/validation-icon.jsx'
import _ from 'lodash'

class SimpleSelect extends React.Component {
  getValidationIcon() {
    return this.props.validationState == 'success' ? (
      <i
        className={'fa fa-check-circle ' + styles.textInputIconValid}
        aria-hidden="true"
      />
    ) : null
  }

  getValidationStyle() {
    return this.props.validationState == 'error'
      ? styles.textInputInvalid
      : styles.textInput
  }

  getErrorMessage() {
    return this.props.validationState == 'error' ? (
      <p id={this.props.id + '-error'} className={styles.errorText}>
        {this.props.errorText}
      </p>
    ) : null
  }

  getLabel() {
    let labelTag = this.props.label ? (
      <label htmlFor={id} className={styles.controlLabel}>
        {this.props.label}
      </label>
    ) : (
      ''
    )
    return labelTag
  }

  handleChange(e) {
    let value = e.target.value
    this.props.onChange(value)
  }

  render() {
    let validationIcon = this.getValidationIcon()
    let errorMessage = this.getErrorMessage()
    let labelTag = this.getLabel()

    return (
      <div
        id={this.props.id + '-container'}
        className={styles.selectContainer}
        hidden={this.props.hidden}
      >
        {labelTag}
        <div className={styles.innerContainer}>
          <select
            id={this.props.id}
            className={styles.myselect}
            onChange={this.handleChange.bind(this)}
            defaultValue={''}
          >
            <option key={this.props.options.length + 1} value="" disabled>
              {this.props.defaultValue}
            </option>
            {this.props.options.map(function(item, index) {
              return (
                <option
                  key={index}
                  value={item.value}
                  className={styles.myoption}
                >
                  {item.name}
                </option>
              )
            })}
          </select>
          <ValidationIcon
            validationState={this.props.validationState}
            showSuccessIcon={this.props.showSuccessIcon}
            showErrorIcon={this.props.showErrorIcon}
            extraClassName={styles.validationIcon}
          />
        </div>
        {errorMessage}
      </div>
    )
  }
}

SimpleSelect.defaultProps = {
  options: [],
  defaultValue: 'Select a state',
  showSuccessIcon: true,
  showErrorIcon: false
}

export default SimpleSelect
