import React from 'react';
import {Grid, Row, Col, Image, Button } from 'react-bootstrap'
import styles from '../../styles/success-page/confirm-section.scss';
import thumbNail from '../../../../public/assets/images/placeholder370x170.png';

const ConfirmSection = (props) =>
    <Row>
        <Col xs={12} className={styles.section}>
            <Row>
                <h2  className={styles.title + " text-center"}> You're almost done! Confirm your e-mail to get matched </h2>
            </Row>

            <Row>
                <Col xs={6} xsOffset={3}>
                    <p className="text-center">Don't see the confirmation in your inbox? <a href="#">Click here</a> to resend</p>
                </Col>
            </Row>

            <Row style={{marginTop: "40px", marginBottom: "40px"}}>
                <ConfirmSubSection
                    image={thumbNail}
                    title="How to prepare a loan proposal"
                    subTitle="Learning Course 30 Minute Video"
                    linkRef="https://www.sba.gov/offices/district/nd/fargo/resources/how-prepare-loan-proposal"
                />

                <ConfirmSubSection
                    image={thumbNail}
                    title="5 Tips for navigating a loan application"
                    subTitle="Blog 12 Minute Read"
                    linkRef="https://www.sba.gov/blogs/5-tips-successfully-navigating-sba-loan-application-process"
                />
            </Row>
        </Col>
    </Row>;

const ConfirmSubSection = (props) =>
    <Col className={styles.display}>
        <Image src={props.image}/>
        <a className={styles.subtitle} href={props.linkRef}>{props.title}</a>
        <p className={styles.subpara}>{props.subTitle}</p>
    </Col>
    ;

export default ConfirmSection;