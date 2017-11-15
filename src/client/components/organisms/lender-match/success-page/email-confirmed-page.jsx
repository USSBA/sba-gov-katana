import React from 'react'
import styles from './confirm-section.scss'

class EmailConfirmedPage extends React.Component {
  render() {
    return (
      <div className={styles.section + ' ' + styles.emailConfirmationText}>
        <h2 className={styles.title}>Your email has been confirmed.</h2>
        <h5>
          Your submission is being forwarded to lenders in your area. Please
          allow at least two business days to be matched with a lender in our
          network. We'll email you with any updates.
        </h5>
      </div>
    )
  }
}

export default EmailConfirmedPage
