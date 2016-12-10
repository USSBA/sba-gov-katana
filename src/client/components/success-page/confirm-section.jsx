import React from 'react';
import {Grid, Row, Col, Image, Button } from 'react-bootstrap'
import styles from '../../styles/success-page/confirm.scss';
import thumbNail from '../../../../public/assets/images/placeholder370x170.png';

export const Confirm = (props) =>
    <Row>
        <Col xs={12} className={styles.section}>
            <Row>
                <h2  className={styles.title + " text-center"}> You're almost done! Confirm your e-mail to get matched </h2>
            </Row>

            <Row>
                <Col xs={6} xsOffset={3}>
                    <p className="text-center">Don't see the confirmation in your inbox? <a>Click here</a> to resend</p>
                </Col>
            </Row>

            <Row style={{marginTop: "40px", marginBottom: "40px"}}>
                <Col xs={10} xsOffset={1}>
                    <Row>
                        <Col xs={6}>
                            <Image className="pull-right" src={thumbNail}/>
                        </Col>
                    </Row>
                    <Row>
                        <Col xs={6}>
                            <p className={styles.title}>How to prepare a loan proposal</p>
                        </Col>
                    </Row>
                    <Row>
                        <Col xs={6}>
                            <p className="text-left">Learning Course 30 Minute Video</p>
                        </Col>
                    </Row>
                </Col>

                <Col xs={10} xsOffset={1}>
                    <Row>
                        <Col xs={6}>
                            <Image className="pull-left" src={thumbNail}/>
                        </Col>
                    </Row>
                    <Row>
                        <Col xs={6}>
                            <p className={styles.title}>5 Tips for navigating a loan application</p>
                        </Col>
                    </Row>
                    <Row>
                        <Col xs={6}>
                            <p className="text-left">Blog 12 Minute Read</p>
                        </Col>
                    </Row>
                </Col>
            </Row>
        </Col>
    </Row>;
