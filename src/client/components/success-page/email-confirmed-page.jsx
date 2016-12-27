import React from 'react';
import styles from '../../styles/success-page/confirm-section.scss';
import { Row, Col, Button } from 'react-bootstrap';
import DynamicCounselingAndTools from './counseling-and-tools.jsx';

class EmailConfirmedPage extends React.Component {
  render() {
    return (
      <div className="container">
        <Col xs={ 12 } className={ styles.section }>
        <Row>
          <h2 className={ styles.title + " text-center" }> Thank you for confirming your email. </h2>
        </Row>
        </Col>
      </div>
    )
  }

}

export default EmailConfirmedPage;
