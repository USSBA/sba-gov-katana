import React from 'react'
import PropTypes from 'prop-types'
import styles from './aria-error-message.scss'

const AriaErrorMessage = ({ message }) => <p data-testid="aria-error-message" className={styles.ariaErrorMessage} aria-live="assertive" aria-atomic="true">{message}</p>
AriaErrorMessage.propTypes = {
	'message': PropTypes.string.isRequired
}

export default AriaErrorMessage
