import React from 'react';
import styles from '../../styles/success-page/confirm-section.scss';
import { Row, Col, Button } from 'react-bootstrap';

class EmailConfirmationInvalid extends React.Component {
  render() {
    return (
      <div className="container">
        <Col xs={ 12 } className={ styles.section }>
        <Row>
          { /*esfmt-ignore-start*/}
            <h2 className={styles.title + " text-center"}>
              Your email confirmation link has expired. Please submit a new application with your updated information at https://www.sba.gov/lendermatch.
            </h2>
            {/*esfmt-ignore-end*/ }
        </Row>
        </Col>
      </div>
    )
  }

}

export default EmailConfirmationInvalid;
