import React from 'react'
import PropTypes from 'prop-types'

import styles from './radio.scss'
import { FormErrorMessage } from 'atoms'

class RadioButtonGroup extends React.Component {
  fireChange(index) {
    this.props.onChange(this.props.options[index].value)
  }

  handleChange() {}

  handleClick(index) {
    this.fireChange(index)
  }

  handleKeyPress(event, index) {
    const code = event.keyCode ? event.keyCode : event.which
    if (code === 32) {
      this.fireChange(index)
      event.preventDefault()
    }
  }

  handleBlur(index) {
    const isLast = index === this.props.options.length - 1
    if (isLast) {
      this.props.onBlur()
    }
  }

  handleFocus() {
    this.props.onFocus({
      target: {
        name: this.props.name
      }
    })
  }

  /* eslint-disable no-invalid-this */
  render() {
    const radioButtons = this.props.options.map(function(item, index) {
      const id = this.props.id + '-radio' + index
      const isChecked = item.value === this.props.value
      const textStyle = this.props.textStyle || styles.defaultRadioText

      return (
        <div
          id={id + '-item'}
          className={
            styles.radioItem + ' ' + (isChecked ? styles.radioItemSelected : styles.radioItemNotSelected)
          }
          onClick={event => this.handleClick(index).bind(this)}
          key={index}
          tabIndex="0"
          onKeyPress={event => this.handleKeyPress(event, index).bind(this)}
          onFocus={this.handleFocus.bind(this)}
          onBlur={e => this.handleBlur(index).bind(this)}
          role="radio"
          aria-checked={isChecked}
        >
          <input
            className={styles.regularRadio}
            type="radio"
            name={this.props.name}
            checked={isChecked}
            tabIndex="0"
            onChange={this.handleChange}
            id={id}
            value={item.value}
          />
          <label className={styles.myLabel} htmlFor={id} />
          <span className={styles.radioText + ' ' + textStyle}>{item.text}</span>
        </div>
      )
    })

    const errorMessage =
      this.props.validationState === 'error' ? <FormErrorMessage errorText={this.props.errorText} /> : null

    return (
      <div id={this.props.id + '-container'}>
        <label>{this.props.label}</label>
        <div
          role="radiogroup"
          aria-label={this.props['aria-label']}
          aria-labelledby={this.props['aria-labelledby']}
        >
          {radioButtons}
        </div>
        {errorMessage}
      </div>
    )
  }
  /* eslint-enable no-invalid-this */
}
/* options is array of name/value/text triples */
RadioButtonGroup.propTypes = {
  value: PropTypes.string.isRequired,
  options: PropTypes.array.isRequired
}

export default RadioButtonGroup
