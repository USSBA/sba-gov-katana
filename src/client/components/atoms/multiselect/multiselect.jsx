import React from 'react'
import ReactSelect from 'react-select'
import _ from 'lodash'
import 'react-select/dist/react-select.css'

import chevron from 'assets/svg/chevron.svg'
import styles from './multiselect.scss'
import { FormErrorMessage } from 'atoms'

class MultiSelectBox extends React.Component {
  constructor() {
    super()
    this.state = {}
  }

  componentWillReceiveProps(nextProps) {
    if (this.state.value !== nextProps.value) {
      this.setState({ value: nextProps.value })
    }
  }

  handleChange(newValue) {
    let value
    if (this.props.multi) {
      if (newValue.length <= this.props.maxValues) {
        value = _.map(newValue, 'value').join(',')
      }
    } else {
      value = newValue
    }

    if (value && value !== this.state.value) {
      if (this.props.onChange) {
        this.props.onChange(value)
      }
      this.setState({ value: value })
    }
  }
  handleBlur() {
    this.props.onBlur({
      target: {
        name: this.props.name
      }
    })
  }
  handleFocus() {
    this.props.onFocus({
      target: {
        name: this.props.name
      }
    })
  }

  renderArrow() {
    return <i src={chevron} />
  }
  render() {
    const myValue = this.props.multi
      ? this.state.value ? this.state.value.split(',') : []
      : this.state.value

    const errorMessage =
      this.props.validationState === 'error' ? <FormErrorMessage errorText={this.props.errorText} /> : null
    const errorClass = this.props.validationState === 'error' ? styles.redBorder : ''
    const arrowRenderer = () => {
      return <img alt="dropdown arrow" className={styles.chevronIcon} src={chevron} />
    }
    const clearRenderer = this.props.multi
      ? null
      : () => {
          return <div />
        }

    const inputPropFields = ['aria-labelledby', 'aria-label', 'required']
    const inputProps = {}
    _.forEach(inputPropFields, field => {
      if (this.props[field]) {
        inputProps[field] = this.props[field]
      }
    })

    return (
      <div id={this.props.id + '-container'} className={this.props.className ? this.props.className : ''}>
        <label>{this.props.label}</label>
        <div id={this.props.id} className={styles.errorClass}>
          <ReactSelect
            className={errorClass + ' ' + styles.myselect}
            menuBuffer={10}
            tabSelectsValue={false}
            multi={this.props.multi}
            autoBlur={true}
            onChange={this.handleChange.bind(this)}
            name={this.props.name}
            autofocus={this.props.autoFocus}
            value={myValue}
            options={this.props.options}
            onBlur={this.handleBlur.bind(this)}
            onFocus={this.handleFocus.bind(this)}
            arrowRenderer={arrowRenderer}
            clearRenderer={clearRenderer}
            searchable={this.props.multi}
            placeholder={this.props.placeholder ? this.props.placeholder : 'Select...'}
            inputProps={inputProps}
          />
        </div>
        {errorMessage}
      </div>
    )
  }
}

MultiSelectBox.defaultProps = {
  multi: true,
  maxValues: 3,
  onBlur: () => {},
  onFocus: () => {},
  onChange: () => {}
}

export default MultiSelectBox
