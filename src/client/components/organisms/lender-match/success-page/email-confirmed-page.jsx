import React from 'react';
import styles from './confirm-section.scss';
import {Row, Col} from 'react-bootstrap';
import DynamicCounselingAndTools from './counseling-and-tools.jsx';

class EmailConfirmedPage extends React.Component {
  render() {
    return (
      <div className="container">
        <Col xs={12} className={styles.section}>
          <Row>
            {/*esfmt-ignore-start*/}
            <h2 className={styles.title + " text-center"}>
              {"Your email has been confirmed. Your submission is being forwarded to lenders in your area. Please allow at least two business days to be matched with a lender in our network. We'll email you with any updates."}
            </h2>
            {/*esfmt-ignore-end*/}
          </Row>
        </Col>
      </div>
    )
  }

}

export default EmailConfirmedPage;
