import React from 'react';
import {Grid, Row, Col, Image, Button } from 'react-bootstrap'
import styles from '../common/styles.scss';
import thumbNail from '../../../../public/assets/images/placeholder370X170.png';

export const HelpfulQuestions = (props) =>
    <Row>
        <Col xs={12} className={styles.questionSection + " " + styles.landingSection}>

            <Row style={{marginTop: "40px", marginBottom: "40px"}}>
                <Col xs={10} xsOffset={1}>
                    <Col xs={6}>
                        <p style={titleStyle}>What should I ask a lender?</p>
                        Growth hacking startup scruminati project marketing business-to-business pivot lean startup advisor. IPhone validation funding user experience innovator partner network facebook agile development network effects partnership customer android. Business model canvas facebook crowdsource stealth buzz network effects agile development MVP rockstar client
                    </Col>
                    <Col xs={6}>
                        <Image className="pull-right" src={thumbNail}/>
                    </Col>
                </Col>
            </Row>

            <Row style={{marginTop: "40px", marginBottom: "40px"}}>
                <Col xs={10} xsOffset={1}>
                    <Col xs={6}>
                        <Image className="pull-left" src={thumbNail}/>
                    </Col>
                    <Col xs={6}>
                        <p style={titleStyle}>How long does it take?</p>
                        Assets A/B testing paradigm shift infrastructure investor sales. Iteration strategy first mover advantage sales gamification. Scrum project series A financing accelerator. Ramen angel investor creative investor gamification innovator MVP mass market innovator network effects advisor. Prototype partner network metrics buzz graphical user interface traction business plan facebook.
                    </Col>
                </Col>
            </Row>


        </Col>
    </Row>;

const titleStyle = {
    fontSize: "34px",
    marginTop: "10px",
    marginBottom: "20px"
};



