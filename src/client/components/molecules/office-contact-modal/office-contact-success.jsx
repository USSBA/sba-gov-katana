import React from 'react'
import styles from './office-contact-success.scss'
import { Button } from 'atoms'

export default ({ modalActions }) => {
	const handleClose = event => {
    event.preventDefault()
    modalActions.closeOfficeContactModal()
  }

	return (
		<div>
			<h3 id="dialogTitle" className={styles.title}>
        Contact Form Submitted
      </h3>
      <div className={styles.content}>
	      <div className={styles.divider} />
	      <div className={styles.success}>
	    		<i className={styles.icon + ' fa fa-check-circle'} />
	    		<h4 className={styles.successMessage}>Your request has been sent</h4>
	      </div>
	      <h6 className={styles.messageTitle}>Thank you for contacting your district office.</h6>
	      <p className={styles.message}>You will receive an email confirmation with your request details within the next hour. Someone from your District Office will respond during standard business hours.</p>
	      <div>
	        <Button primary onClick={handleClose}>
	          CLOSE
	        </Button>
	      </div>
      </div>
		</div>
	)
}
