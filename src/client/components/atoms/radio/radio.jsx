import React from 'react'
import _ from 'lodash'

import styles from './radio.scss'
import { FormErrorMessage } from 'atoms'

class RadioButtonGroup extends React.Component {
  fireChange(index) {
    const { onChange, options } = this.props
    onChange(options[index].value)
  }

  // eslint-disable-next-line class-methods-use-this
  handleKeyPress(event, index, target) {
    const code = event.keyCode ? event.keyCode : event.which
    if (code === 32) {
      target.fireChange(index)
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

  render() {
    const { id: _id, name, onChange, options, textStyle: _textStyle, value } = this.props
    const radioButtons = options.map((item, index) => {
      const id = _id + '-radio' + index
      const isChecked = item.value === value
      const textStyle = _textStyle || styles.defaultRadioText

      return (
        <div
          id={id + '-item'}
          className={
            styles.radioItem + ' ' + (isChecked ? styles.radioItemSelected : styles.radioItemNotSelected)
          }
          onClick={event => this.fireChange(index)}
          key={index}
          tabIndex="0"
          onKeyPress={event => this.handleKeyPress(event, index, this)}
          onFocus={this.handleFocus.bind(this)}
          onBlur={e => this.handleBlur(index)}
          role="radio"
          aria-checked={isChecked}
        >
          <input
            className={styles.regularRadio}
            type="radio"
            name={name}
            checked={isChecked}
            tabIndex="0"
            onChange={() => {}}
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
}
/* options is array of name/value/text triples */
RadioButtonGroup.propTypes = {
  value: React.PropTypes.string.isRequired,
  options: React.PropTypes.array.isRequired
}

export default RadioButtonGroup
