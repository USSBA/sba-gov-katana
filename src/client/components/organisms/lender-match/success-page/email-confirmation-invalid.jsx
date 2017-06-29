import React from 'react';
import styles from './confirm-section.scss';

class EmailConfirmationInvalid extends React.Component {
  render() {
    return (
      <div className={styles.section + " " +styles.emailConfirmationText}>
        <h2 className={styles.title}>
          Your email confirmation link has expired.
        </h2>
        <h5>
          Please submit a new application with your updated information at <a href="https://www.sba.gov/lendermatch">https://www.sba.gov/lendermatch</a>.
        </h5>
      </div>
    )
  }

}

export default EmailConfirmationInvalid;
