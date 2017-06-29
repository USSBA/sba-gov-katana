import React from 'react';
import styles from './confirm-section.scss';

class EmailConfirmationInvalid extends React.Component {
  render() {
    return (
      <div className={styles.section}>
        <h2 className={styles.title}>
          Your email confirmation link has expired.
        </h2>
        <p>
          Please submit a new application with your updated information at <a href="https://www.sba.gov/lendermatch">https://www.sba.gov/lendermatch</a>.
        </p>
      </div>
    )
  }

}

export default EmailConfirmationInvalid;
