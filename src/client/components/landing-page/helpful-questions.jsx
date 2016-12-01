import React from 'react';
import {Grid, Row, Col, Image, Button } from 'react-bootstrap'
import styles from '../common/styles.scss';
import thumbNail from '../../../../public/assets/images/placeholder80X80.png';

export const HelpfulQuestions = (props) =>
    <Row>
        <Col xs={12} className={styles.questionSection + " " + styles.landingSection}>

            <Row>
                <p  className={styles.sectionTitle + " text-center"}> Preparation Checklist </p>
            </Row>

            <Row style={{marginTop: "60px"}}>
                <Col xs={10} xsOffset={1}>

                </Col>
            </Row>

            <Row>
                <Col xs={6} xsOffset={3}>
                    <p className="text-center">Have questions or need guidance? Take advantage of free, local counseling. </p>
                </Col>
            </Row>

        </Col>
    </Row>;

