import React, { Component, PropTypes } from 'react'
import classNames from 'classnames'
import isEmail from 'validator/lib/isEmail'
import isPostalCode from 'validator/lib/isPostalCode'
import { camelCase, capitalize, isEmpty, kebabCase } from 'lodash'

import styles from './newsletter-form.scss'
import { Button, CaptionText, Link, TextInput } from 'atoms'
import { postMiscAction } from '../../../fetch-content-helper'
import { TRANSLATIONS } from '../../../translations'
import { getLanguageOverride } from '../../../services/utils'

const FORM_STATE = {
  initial: 'initial',
  processing: 'processing',
  success: 'success',
  error: 'error'
}

const initialState = {
  emailAddress: '',
  isEmailAddressValid: false,
  isZipCodeValid: true,
  formState: FORM_STATE.initial,
  zipCode: ''
}

class NewsletterForm extends Component {
  static defaultProps = {
    footer: false
  }

  static propTypes = {
    footer: PropTypes.bool,
    title: PropTypes.string
  }

  /* eslint-disable no-invalid-this */
  isValid = () => {
    const { isEmailAddressValid, isZipCodeValid } = this.state
    return isEmailAddressValid && isZipCodeValid
  }

  reset = () => {
    this.setState({ ...initialState })
  }
  /* eslint-enable no-invalid-this */

  constructor(props) {
    super(props)

    this.state = { ...initialState }
  }

  render() {
    const { footer, title } = this.props
    const { formState } = this.state

    const className = classNames({
      newsletter: true,
      [styles.newsletter]: true,
      [styles.form]: !footer,
      [styles.footer]: footer
    })

    const textInputs = [
      {
        name: 'email address',
        optional: false,
        validate: value => {
          const isEmailAddressValid = isEmail(value)
          this.setState({ isEmailAddressValid })
          return isEmailAddressValid
        }
      },
      {
        name: 'zip code',
        optional: true,
        validate: value => {
          // only checks U.S. zip codes
          const isZipCodeValid = isEmpty(value) || isPostalCode(value, 'US')
          this.setState({ isZipCodeValid })
          return isZipCodeValid
        }
      }
    ]

    const langCode = getLanguageOverride(true)
    const buttonText = TRANSLATIONS.govDelivery[langCode].buttonText
    let formContent

    switch (formState) {
      case FORM_STATE.initial:
      case FORM_STATE.processing:
        formContent = (
          <div>
            {!footer ? (
              <h3 data-testid="newsletter-title">{title}</h3>
            ) : (
              <p data-testid="newsletter-footer-title">{title}</p>
            )}
            {!footer && (
              <CaptionText>
                Please enter your zip code to get information about business news and events in your area.
              </CaptionText>
            )}
            <div className={styles.inputs}>
              {!footer &&
                textInputs.map(({ name, optional, validate }) => (
                  <TextInput
                    errorText={`Enter a valid ${name}`}
                    id={kebabCase(`newsletter ${name}`)}
                    key={name}
                    label={capitalize(name)}
                    onChange={event => this.setState({ [camelCase(name)]: event.target.value })}
                    optional={optional}
                    validationFunction={validate}
                    value={this.state[camelCase(name)]}
                  />
                ))}
              {/* Wrap the button for CSS grid positioning */}
              <span className={styles.buttonWrapper}>
                <Button
                  primary
                  alternate
                  children={buttonText}
                  disabled={!footer && !this.isValid()}
                  loading={!footer && formState === FORM_STATE.processing}
                  type={!footer && 'submit'}
                  url={footer ? '/updates' : null}
                />
              </span>
            </div>
          </div>
        )
        break
      case FORM_STATE.success:
        formContent = (
          <div className={styles[formState]}>
            <i className="fa fa-check-circle" data-testid="newsletter-success-icon" />
            <h3 data-testid="newsletter-success-title">You're all done here!</h3>
            <p data-testid="newsletter-success-message">You're all signed up for the SBA e-Newsletter.</p>
            <Link data-testid="newsletter-refresh-link" onClick={this.reset}>
              Refresh
            </Link>
          </div>
        )
        break
      case FORM_STATE.error:
        formContent = (
          <div className={styles[formState]} data-testid="newsletter-error-info">
            <i className="fa fa-times-circle" data-testid="newsletter-error-icon" />
            <h3 data-testid="newsletter-error-title">Sorry, we're having issues</h3>
            <p data-testid="newsletter-error-message">
              We are unable to subscribe you to the SBA newsletter. Please try again later.
            </p>
            <Link data-testid="newsletter-refresh-link" onClick={this.reset}>
              Refresh
            </Link>
          </div>
        )
        break
    }

    return (
      <form
        className={className}
        data-testid="newsletter-form"
        onSubmit={async event => {
          this.setState({ formState: FORM_STATE.processing })

          event.preventDefault()

          if (!this.isValid()) {
            return
          }

          const { emailAddress, zipCode } = this.state

          try {
            const { subscriber } = await postMiscAction('gov-delivery', { emailAddress, zipCode })
            // show success
            this.setState({ formState: FORM_STATE.success })
          } catch (error) {
            this.setState({ formState: FORM_STATE.error })
          }
        }}
      >
        {formContent}
      </form>
    )
  }
}

export default NewsletterForm