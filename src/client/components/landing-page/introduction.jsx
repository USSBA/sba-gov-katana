import React from 'react';
import {Grid, Row, Col, Image, Button } from 'react-bootstrap'
import styles from '../../styles/landing-page/introduction.scss';
import thumbNail from '../../../../public/assets/images/placeholder80x80.png';
import {FindLendersBtn} from './find-lenders-btn.jsx'
import {HelpMeBtn} from './help-me-btn.jsx'

export const Introduction = (props) =>
            <Row>
                <Col xs={12} className={styles.section}>

                    <Row>
                        <h2  className={styles.title + " text-center"}> Find lenders who can finance your business loan </h2>
                    </Row>

                    <Row>
                        <Col xs={6} xsOffset={3}>
                            <p className="text-center">Learning curve MVP gen-z. Incubator series A financing validation funding alpha monetization early adopters gamification backing pitch. Termsheet advisor disruptive lean startup.</p>
                        </Col>
                    </Row>

                    <Row style={{marginTop: "60px"}}>
                        <Col xs={10} xsOffset={1}>
                            <IntroSubSection
                                image={thumbNail}
                                title="Describe Your needs"
                                text="A financing validation funding alpha monetization early"
                            />
                            <IntroSubSection
                                image={thumbNail}
                                title="Get matched in 2 days"
                                text="Prototype return on investment first mover advantage agile"
                            />
                            <IntroSubSection
                                image={thumbNail}
                                title="Select the right lender"
                                text="Accelerator seed round freemium and seed money"
                            />
                        </Col>
                    </Row>

                    <Row style={{marginTop: "80px", marginBottom: "60px"}}>
                        <Col xs={2} xsOffset={3}>
                            <HelpMeBtn/>
                        </Col>
                        <Col xs={2} xsOffset={2}>
                            <FindLendersBtn/>
                        </Col>
                    </Row>

                </Col>
            </Row>;

const IntroSubSection = (props) =>
    <Col xs={4}>
        <Col xs={4}>
            <Image src={props.image}/>
        </Col>
        <Col xs={8}>
            <h3 className={styles.subTitle}>{props.title}</h3>
            <p className={styles.subText}>{props.text}</p>
        </Col>
    </Col>;

