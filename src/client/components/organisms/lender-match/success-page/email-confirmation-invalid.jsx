import React from 'react';
import styles from './confirm-section.scss';
import {Row, Col} from 'react-bootstrap';

class EmailConfirmationInvalid extends React.Component {
  render() {
    return (
      <div className="container">
        <Col xs={12} className={styles.section}>
          <Row>
            <h2 className={styles.title + " text-center"}>
              Your email confirmation link has expired. Please submit a new application with your updated information at https://www.sba.gov/lendermatch.
            </h2>
          </Row>
        </Col>
      </div>
    )
  }

}

export default EmailConfirmationInvalid;
