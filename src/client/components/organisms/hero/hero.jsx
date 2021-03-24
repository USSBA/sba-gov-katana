/* eslint-disable complexity */
import React from 'react'
import { debounce, isEmpty } from 'lodash'

import scrollIcon from 'assets/svg/scroll.svg'
import styles from './hero.scss'
import { Button, TextInput } from 'atoms'
import { includes } from 'lodash'
import {
  containsErrorOrNull,
  getZipcodeValidationState
} from '../../../services/form-validation-helpers.js'

class Hero extends React.Component {
  constructor(props) {
    super(props)

    // TODO: This should be moved to redux state so that other components can
    // use it.
    this.state = {
      calloutHeight: 0,
      imageHeight: 0,
      isSmallOnly: false,
      zipCode: '',
      validZip: false,
      validStates: {
        zipCode: ''
      }
    }
  }

  componentDidMount() {
    // Force the resize on page load (without a delay).
    this.onResize()

    window.addEventListener('resize', this.onResizeDebounced)
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.onResizeDebounced)
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
  }

  render() {
    const { alt, buttons, imageUrl, message, title } = this.props
    const { calloutHeight, imageHeight, isSmallOnly, zipCode, validStates } = this.state

    const style = {
      // We use a background image to take advantage of `background-size: cover`.
      backgroundImage: imageUrl && `url('${imageUrl}')`,
      height: imageUrl && `calc(100vh - ${imageHeight}px)`,
      marginBottom: imageUrl && isSmallOnly && `${calloutHeight * 0.75}px`
    }

    return (
      <div data-testid="hero" className={`hero ${styles.hero}`}>
        <div
          data-testid="background"
          aria-label={alt}
          className={imageUrl ? styles.image : styles.noImage}
          style={style}
          alt={alt}
        >
          <div className={styles.callout} ref={ref => (this.callout = ref)}>
            <h1 tabIndex="0" data-testid="title">
              {title}
            </h1>
            {!isEmpty(message) && (
              <h2 className={styles.message} tabIndex="0" data-testid="message">
                {message}
              </h2>
            )}
            <form onSubmit={e => this.handleSubmit(e)} noValidate="noValidate">
              <div className={styles.zipContainer}>
                <label tabIndex="0" className={styles.label}>
                  Business Zip Code
                </label>
                <div className={styles.form}>
                  <TextInput
                    name="zipCode"
                    className={styles.field}
                    onChange={this.handleZipCodeChange.bind(this)}
                    validationState={validStates.zipCode}
                    ariaLabel="Enter a 5-digit zip code."
                    errorText="Enter a 5-digit zip code."
                    autoComplete="off"
                    alternateError
                    large
                  />
                  <div>
                    <Button
                      type="submit"
                      url={
                        validStates.zipCode && validStates.zipCode !== 'error'
                          ? `local-assistance/find/?address=${zipCode}&pageNumber=1`
                          : ''
                      }
                      className={styles.submit}
                      primary
                      alternate
                      small={false}
                    >
                      SUBMIT
                    </Button>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
        {imageUrl && (
          <img
            className={styles.arrow}
            data-testid="hero-arrow"
            aria-hidden="true"
            alt=""
            ref={ref => (this.arrow = ref)}
            src={scrollIcon}
          />
        )}
      </div>
    )
  }

  /* eslint-disable no-invalid-this */
  onResize = () => {
    const arrow = this.arrow
    const callout = this.callout
    const disasterAlert = document.getElementById('disaster-alert')
    const nav = document.getElementById('nav')

    this.setState({
      calloutHeight: callout && callout.clientHeight,
      imageHeight:
        (disasterAlert && disasterAlert.clientHeight) +
        (nav && nav.clientHeight) +
        (arrow && arrow.clientHeight),
      isSmallOnly: window && window.matchMedia(`(max-width: ${styles.breakpointMedium})`).matches
    })
  }

  // Debounce onResize() before hooking onto event listeners for performance.
  onResizeDebounced = debounce(this.onResize, 250)
  /* eslint-enable no-invalid-this */
}

export default Hero
