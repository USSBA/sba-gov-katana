import React from 'react';
import {Grid, Row, Col, Image, Button } from 'react-bootstrap'
import styles from '../common/styles.scss';
import thumbNail from '../../../../public/assets/images/placeholder80X80.png';
import {FindLendersBtn} from './find-lenders-btn.jsx'
import {CounselorBtn} from './counselor-btn.jsx'

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
                    </Col>
                </Row>

                <Row>
                    <Col xs={6} xsOffset={3}>
                        <p className="text-center">Have questions or need guidance? Take advantage of free, local counseling. </p>
                    </Col>
                </Row>

                <Row style={{marginTop: "30px", marginBottom: "60px"}}>
                    <Col xs={2} xsOffset={3}>
                        <CounselorBtn/>
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
