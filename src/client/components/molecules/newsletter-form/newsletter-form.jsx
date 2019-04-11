import React, { Component, PropTypes } from 'react'
import classNames from 'classnames'
import isEmail from 'validator/lib/isEmail'
import isPostalCode from 'validator/lib/isPostalCode'
import { capitalize } from 'lodash'

import styles from './newsletter-form.scss'
import { Button, TextField, TextInput } from 'atoms'

class NewsletterForm extends Component {
  static propTypes = {
    title: PropTypes.string
  }

  isValid = () => {
    // eslint-disable-next-line no-invalid-this
    const { isEmailValid, isZipCodeValid } = this.state
    return isEmailValid && isZipCodeValid
  }

  constructor(props) {
    super(props)

    this.state = {
      isEmailValid: false,
      isZipCodeValid: false
    }
  }

  render() {
    const { footer, title } = this.props

    const className = classNames({
      newsletter: true,
      [styles.newsletter]: !footer,
      [styles.footerLocation]: footer
    })

    const textInputs = [
      {
        name: 'email',
        validate: value => {
          const isEmailValid = isEmail(value)
          this.setState({ isEmailValid })
          return isEmailValid
        }
      },
      {
        name: 'zip code',
        validate: value => {
          // only checks U.S. zip codes
          const isZipCodeValid = isPostalCode(value, 'US')
          this.setState({ isZipCodeValid })
          return isZipCodeValid
        }
      }
    ]

    return (
      <form
        className={className}
        data-cy="newsletter"
        onSubmit={event => {
          event.preventDefault()

          if (!this.isValid()) {
            return
          }

          // TODO: implement call to misc-api here
          console.log('subscribe')
        }}
      >
        <h3>{title}</h3>
        <div className={styles.inputs}>
          {!footer &&
            textInputs.map(({ name, validate }) => (
              <TextInput
                id={`newsletter ${name}`}
                key={name}
                label={capitalize(name)}
                errorText={`Enter a valid ${name}`}
                validationFunction={validate}
              />
            ))}
          {/* Wrap the button for CSS grid positioning */}
          <span className={styles.buttonWrapper}>
            <Button
              primary
              alternate
              children="Subscribe"
              disabled={!footer && !this.isValid()}
              type="submit"
            />
          </span>
        </div>
      </form>
    )
  }
}

export default NewsletterForm
