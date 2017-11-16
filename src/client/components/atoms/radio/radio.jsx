import React from 'react'
import _ from 'lodash'

import styles from './radio.scss'
import { FormErrorMessage } from 'atoms'

class RadioButtonGroup extends React.Component {
  constructor(props) {
    super()
  }
  fireChange(index) {
    this.props.onChange(this.props.options[index].value)
  }
  handleChange() {}
  handleClick(index, me) {
    me.fireChange(index)
  }
  handleKeyPress(event, index, me) {
    let code = event.keyCode ? event.keyCode : event.which
    if (code == 32) {
      me.fireChange(index)
      event.preventDefault()
    }
  }
  handleBlur(index) {
    let isLast = index === this.props.options.length - 1
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
    let me = this
    let radioButtons = this.props.options.map(function(item, index) {
      let id = me.props.id + '-radio' + index
      let isChecked = item.value === me.props.value

      return (
        <div
          id={id + '-item'}
          className={
            styles.radioItem + ' ' + (isChecked ? styles.radioItemSelected : styles.radioItemNotSelected)
          }
          onClick={event => me.handleClick(index, me)}
          key={index}
          tabIndex="0"
          onKeyPress={event => me.handleKeyPress(event, index, me)}
          onFocus={me.handleFocus.bind(me)}
          onBlur={e => me.handleBlur(index)}
        >
          <input
            className={styles.regularRadio}
            type="radio"
            name={me.props.name}
            checked={isChecked}
            tabIndex="0"
            onChange={me.handleChange}
            id={id}
            value={item.value}
          />
          <label className={styles.myLabel} htmlFor={id} />
          <span className={styles.radioText}>{item.text}</span>
        </div>
      )
    })

    let errorMessage =
      this.props.validationState == 'error' ? (
        <FormErrorMessage errorText={this.props.errorText} />
      ) : (
        undefined
      )

    return (
      <div id={this.props.id + '-container'}>
        <label>{this.props.label}</label>
        <div>{radioButtons}</div>
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
