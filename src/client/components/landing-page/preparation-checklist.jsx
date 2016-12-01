import React from 'react';
import {Grid, Row, Col, Image, Button } from 'react-bootstrap'
import styles from '../common/styles.scss';
import thumbNail from '../../../../public/assets/images/placeholder80X80.png';
import {FindLendersBtn} from './find-lenders-btn.jsx'

export const PreparationChecklist = (props) =>
        <Row>
            <Col xs={12} className={styles.prepSection + " " + styles.landingSection}>

                <Row>
                    <p  className={styles.sectionTitle + " text-center"}> Preparation Checklist </p>
                </Row>

                <Row style={{marginTop: "60px"}}>
                    <Col xs={10} xsOffset={1}>
                        <PrepSubSection
                            image={thumbNail}
                            title="Describe Your needs"
                            text="A financing validation funding alpha monetization early"
                        />
                        <PrepSubSection
                            image={thumbNail}
                            title="Get matched in 2 days"
                            text="Prototype return on investment first mover advantage agile"
                        />
                        <PrepSubSection
                            image={thumbNail}
                            title="Select the right lender"
                            text="Accelerator seed round freemium seed money research & development"
                        />
                        <PrepSubSection
                            image={thumbNail}
                            title="Describe Your needs"
                            text="A financing validation funding alpha monetization early"
                        />
                        <PrepSubSection
                            image={thumbNail}
                            title="Get matched in 2 days"
                            text="Prototype return on investment first mover advantage agile"
                        />
                        <PrepSubSection
                            image={thumbNail}
                            title="Select the right lender"
                            text="Accelerator seed round freemium seed money research & development"
                        />
                    </Col>
                </Row>

                <Row>
                    <Col xs={6} xsOffset={3}>
                        <p className="text-center">Have questions or need guidance? Take advantage of free, local counseling. </p>
                    </Col>
                </Row>

                <Row style={{marginTop: "30px", marginBottom: "60px"}}>
                    <Col xs={2} xsOffset={3}>
                        <HelpMeBtn/>
                    </Col>
                    <Col xs={2} xsOffset={2}>
                        <FindLendersBtn/>
                    </Col>
                </Row>

            </Col>
        </Row>;

const PrepSubSection = (props) =>
    <Col xs={4} style={{marginBottom: "60px"}}>
        <Col xs={4}>
            <Image src={props.image} circle/>
        </Col>
        <Col xs={8}>
            <h3 className={styles.subSectionTitle}>{props.title}</h3>
            <p className={styles.subSectionText}>{props.text}</p>
        </Col>
    </Col>;

const HelpMeBtn = (props) =>
    <div>
        <Button block className={ styles.btn+ " " + styles.whiteBtn}>HELP ME GET READY</Button>
    </div>;