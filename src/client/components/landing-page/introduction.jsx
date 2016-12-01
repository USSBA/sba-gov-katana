import React from 'react';
import {Grid, Row, Col } from 'react-bootstrap'
import styles from '../common/styles.scss';

export const Introduction = (props) =>
        <Grid fluid={true}>
            <Row>

                <Col xs={12} className={styles.introSection + " " + styles.landingSection}>
                    <Row>
                        <h2  className="text-center"> Find lender who can finance your business loan </h2>
                    </Row>

                    <Row>
                        <Col xs={4} xsOffset={4}>
                            <p className="text-center">Learning curve MVP gen-z. Incubator series A financing validation funding alpha monetization early adopters gamification backing pitch. </p>
                        </Col>
                    </Row>

                    <Row>
                        <Col xs={6} xsOffset={3}>
                            <IntroSubSection/>
                        </Col>
                    </Row>
                </Col>

            </Row>
        </Grid>;

const IntroSubSection = (props) =>
    <Col xs={4}>
        <Col xs={5}>
            stuff on left
        </Col>
        <Col xs={7}>
            stuff on right
        </Col>
    </Col>;