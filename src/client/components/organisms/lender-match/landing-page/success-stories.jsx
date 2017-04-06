import React from 'react';
import { Grid, Row, Col, Image, Button } from 'react-bootstrap'
import styles from './success-stories.scss';
import { FindLendersBtn } from './find-lenders-btn.jsx'
import { CounselorBtn } from './counselor-btn.jsx'

export const SuccessStories = (props) => <Row>
                                           <Col xs={ 12 } className={ styles.section }>
                                           <p className={ styles.title + " text-center" }>Hear from other business owners</p>
                                           <Quote text="Responsive web design network effects burn rate stock seed round. Incubator growth hacking investor vesting period innovator disruptive stealth termsheet market ownership funding analytics burn rate."
                                             name="John Doe" title="Ceo of Getdough" />
                                           <Quote text="Equity paradigm shift growth hacking venture. Conversion iPhone agile development deployment. Ramen ownership release. A/B testing business model canvas influencer alpha direct mailing."
                                             name="Zander Nelson" title="I Have Many Leather Bound Books" />
                                           <Row style={ { marginTop: "80px", marginBottom: "60px" } }>
                                             <CounselorBtn/>
                                             <Col xs={ 3 } xsOffset={ 2 } lg={ 2 } lgOffset={ 2 }>
                                             <FindLendersBtn/>
                                             </Col>
                                           </Row>
                                           </Col>
                                         </Row>;

const Quote = (props) => <Row style={ { marginBottom: "30px" } }>
                           <Col className="text-center" xs={ 4 } xsOffset={ 4 }>
                           <p className={ styles.quote }>"
                             { props.text }"</p>
                           <span>_______</span>
                           <p>
                             { props.name }
                           </p>
                           <p>
                             { props.title }
                           </p>
                           </Col>
                         </Row>;
