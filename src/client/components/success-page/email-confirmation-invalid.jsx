import React from 'react';
import styles from '../../styles/success-page/confirm-section.scss';
import {Row, Col, Button} from 'react-bootstrap';

class EmailConfirmationInvalid extends React.Component {
    render(){
        return (
        <div className="container">
            <Col xs={12} className={styles.section}>
                <Row>
                    <h2  className={styles.title + " text-center"}> That email confirmation link is invalid. </h2>
                </Row>
            </Col>

        </div>
        )
    }

}

export default EmailConfirmationInvalid;
