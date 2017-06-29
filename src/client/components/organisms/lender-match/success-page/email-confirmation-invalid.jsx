import React from 'react';
import styles from './confirm-section.scss';

class EmailConfirmationInvalid extends React.Component {
  render() {
    return (
      <div className={styles.section}>
        <h2 className={styles.title}>
          Your email confirmation link has expired. Please submit a new application with your updated information at https://www.sba.gov/lendermatch.
        </h2>
      </div>
    )
  }

}

export default EmailConfirmationInvalid;
