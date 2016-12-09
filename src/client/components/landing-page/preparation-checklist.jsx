import React from 'react';
import {Grid, Row, Col, Image, Button } from 'react-bootstrap'
import styles from '../../styles/landing-page/preparation-checklist.scss';
import thumbNail from '../../../../public/assets/images/placeholder80x80.png';
import {FindLendersBtn} from './find-lenders-btn.jsx'
import {CounselorBtn} from './counselor-btn.jsx'

export const PreparationChecklist = (props) =>
        <Row>
            <Col xs={12} id="preparation-checklist" className={styles.section}>

                <Row>
                    <p  className={styles.title + " text-center"}> Preparation Checklist </p>
                </Row>

                <Row style={{marginTop: "60px"}}>
                    <Col xs={12} lg={10} lgOffset={1}>
                        <Row>
                            <PrepSubSection
                                image={thumbNail}
                                title="Business Plan"
                                text="Bandwidth iPhone incubator angel investor founders"
                            />
                            <PrepSubSection
                                image={thumbNail}
                                title="Collateral"
                                text="Direct mailing ecosystem incubator creative"
                            />
                            <PrepSubSection
                                image={thumbNail}
                                title="Credit Score"
                                text="Lean startup accelerator hackathon client funding"
                            />
                        </Row>

                        <Row>
                            <PrepSubSection
                                image={thumbNail}
                                title="Financial Projections"
                                text="Venture stock channels success A/B testing series A"
                            />
                            <PrepSubSection
                                image={thumbNail}
                                title="Valid Use"
                                text="Ownership social media ramen effects partnership customer"
                            />
                            <PrepSubSection
                                image={thumbNail}
                                title="Industry Experience"
                                text="A/B testing long tail buzz branding customer early"
                            />

                        </Row>


                    </Col>
                </Row>

                <Row>
                    <Col xs={6} xsOffset={3}>
                        <p className="text-center">Have questions or need guidance? Take advantage of free, local counseling. </p>
                    </Col>
                </Row>

                <Row style={{marginTop: "30px", marginBottom: "60px"}}>

                        <CounselorBtn/>

                    <Col xs={3} xsOffset={2} lg={2} lgOffset={2}>
                        <FindLendersBtn/>
                    </Col>
                </Row>

            </Col>
        </Row>;

const PrepSubSection = (props) =>
    <Col xs={4} style={{marginBottom: "60px", paddingLeft: "0px", paddingRight: "0px"}}>
        <Col style={{paddingLeft: "0px", paddingRight: "0px"}} xs={4}>
            <Image src={props.image} circle/>
        </Col>
        <Col xs={8}>
            <h3 className={styles.subTitle}>{props.title}</h3>
            <p className={styles.subText}>{props.text}</p>
        </Col>
    </Col>;
