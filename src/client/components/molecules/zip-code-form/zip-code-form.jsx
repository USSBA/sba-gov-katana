import React from 'react'
import PropTypes from 'prop-types'
import { browserHistory } from 'react-router'
import { includes } from 'lodash'
import { Button, TextInput } from 'atoms'
import {
  containsErrorOrNull,
  getZipcodeValidationState
} from '../../../services/form-validation-helpers.js'

import styles from './zip-code-form.scss'

class ZipCodeForm extends React.Component {
  constructor() {
    super()
    this.state = {
      zipCode: '',
      validZip: false,
      validStates: {
        zipCode: ''
      }
    }
  }

  handleZipCodeChange(e) {
    const newState = {}
    const name = e.target.name
    newState[name] = e.target.value
    this.setState(newState, () => this.validateFields([name]))
  }

  validateSingleField(validationFunction, name, defaultWhenNotSuccessful) {
    const validationState = validationFunction(name, this.state[name], defaultWhenNotSuccessful || null)

    return validationState
  }

  validateFields(fields, defaultWhenNotSuccessful) {
    let validStates = this.state.validStates

    if (includes(fields, 'zipCode')) {
      validStates = Object.assign(
        validStates,
        this.validateSingleField(getZipcodeValidationState, 'zipCode', defaultWhenNotSuccessful)
      )
    }

    this.setState({ validStates: validStates })
  }

  isValidForm() {
    return !containsErrorOrNull(this.state.validStates)
  }

  submitZipCode() {
    this.state.validStates.zipCode &&
      this.state.validStates.zipCode !== 'error' &&
      browserHistory.push({
        pathname: `/local-assistance/find`,
        search: `?address=${this.state.zipCode}&pageNumber=1`
      })
  }

  handleSubmit(e) {
    e.preventDefault()
    this.validateFields(Object.keys(this.state.validStates), 'error')

    const { validStates } = this.state

    const hasErrors = Object.keys(validStates).filter(key => {
      return validStates[key] === 'error'
    })

    if (hasErrors.length) {
      return null
    }
    this.submitZipCode()
  }

  render() {
    const { label, btnLabel, alternateError, helperText } = this.props
    const { zipCode, validStates } = this.state

    return (
      <form onSubmit={e => this.handleSubmit(e)} noValidate="noValidate">
        <div className={styles.zipContainer}>
          <label tabIndex="0" className={styles.label}>
            {label}
          </label>
          <div className={styles.form}>
            <TextInput
              name="zipCode"
              className={styles.field}
              onChange={this.handleZipCodeChange.bind(this)}
              validationState={validStates.zipCode}
              ariaLabel={helperText}
              helperText={helperText}
              errorText={helperText}
              autoComplete="off"
              alternateError={alternateError}
              large
            />
            <div>
              <Button type="submit" className={styles.submit} primary alternate small={false}>
                {btnLabel?.toUpperCase() || 'SUBMIT'}
              </Button>
            </div>
          </div>
        </div>
      </form>
    )
  }
}

ZipCodeForm.propTypes = {
  label: PropTypes.string
}

export default ZipCodeForm
