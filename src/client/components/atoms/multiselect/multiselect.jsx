import React from 'react'
import ReactSelect from 'react-select'
import _ from 'lodash'
import 'react-select/dist/react-select.css'

import chevron from 'assets/svg/chevron.svg'
import styles from './multiselect.scss'
import { FormErrorMessage } from 'atoms'

class MultiSelectBox extends React.Component {
  handleChange(newValue) {
    if (this.props.multi) {
      if (newValue.length <= this.props.maxValues) {
        this.props.onChange(_.map(newValue, 'value').join(','))
      }
    } else {
      this.props.onChange(newValue)
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
    let myValue = this.props.multi
      ? this.props.value ? this.props.value.split(',') : []
      : this.props.value
    let errorMessage =
      this.props.validationState == 'error' ? (
        <FormErrorMessage errorText={this.props.errorText} />
      ) : (
        undefined
      )
    let errorClass = this.props.validationState == 'error' ? styles.redBorder : ''
    let arrowRenderer = () => {
      return <img alt="dropdown arrow" className={styles.chevronIcon} src={chevron} />
    }
    let clearRenderer = this.props.multi
      ? undefined
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
      <div id={this.props.id + '-container'}>
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
  maxValues: 3
}

export default MultiSelectBox
