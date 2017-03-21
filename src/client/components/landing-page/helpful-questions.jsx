import React from 'react';
import { Grid, Row, Col, Image, Button } from 'react-bootstrap'
import styles from '../../styles/landing-page/helpful-questions.scss';
import thumbNail from '../../../../public/assets/images/placeholder370x170.png';
import '../../styles/common/collapse.scss'

import { FindLendersBtn } from './find-lenders-btn.jsx';
import { ExpertHelpBtn } from './expert-help-btn.jsx';

var Collapse = require('rc-collapse');
var Panel = Collapse.Panel;

export const HelpfulQuestions = (props) => <div className={ styles.section }>
                                             <h2>Details.</h2>
                                             <div className={ styles.mobile }>
                                             <Collapse accordion={ false }>
                                               <Panel showArrow={ false } header="What happens next?"><hr/>You’ll receive an email with contact information of interested lenders two business days after you submit the form. From there, you’ll start talking to lenders
                                                 and completing applications. Some will reach out to you, and you’re welcome to contact them as well.</Panel>
                                             </Collapse>
                                             <Collapse accordion={ false }>
                                               <Panel showArrow={ false } header="Am I guaranteed to get matched?"><hr/>No, using Lender Match doesn't guarantee that you'll get matched or be offered a loan. Lender Match isn't a loan application — it's a tool to help businesses
                                                 find lenders in their communities.</Panel>
                                             </Collapse>
                                             <Collapse accordion={ false }>
                                               <Panel showArrow={ false } header="What should I ask a lender?"><hr/>Ask lenders about interest rates, minimum credit score, cash flow requirements, and other qualifying factors. Get an understanding of prepayment penalties, grace
                                                 periods, and if/when the lender can demand full repayment of the loan’s principal.</Panel>
                                             </Collapse>
                                             <Collapse accordion={ false }>
                                               <Panel showArrow={ false } header="Why am I asked my personal information?"><hr/>The personally identifiable information you share will be used to connect you with prospective SBA lenders. Registering and providing responses to the questionnaire
                                                 is no guarantee that SBA-approved lenders will find you eligible for their programs.</Panel>
                                             </Collapse>
                                             <Collapse accordion={ false }>
                                               <Panel showArrow={ false } header="How many lenders participate?"><hr/>More than 800 lenders participate in Lender Match throughout all 50 states and U.S. territories. While all lenders who use Lender Match offer SBA-approved loans,
                                                 many also offer conventional loans.</Panel>
                                             </Collapse>
                                             <Collapse accordion={ false }>
                                               <Panel showArrow={ false } header="Where can I learn more about loans?"><hr/>We're glad you asked! You can learn about our loan programs in more detail online. If you need to talk to someone about Lender Match, you can contact us.</Panel>
                                             </Collapse>
                                             </div>
                                             <div className={ styles.desktop }>
                                             <Collapse accordion={ false } defaultActiveKey="1">
                                               <Panel showArrow={ false } header="What happens next?"  key="1"><hr/>You’ll receive an email with contact information of interested lenders two business days after you submit the form. From there, you’ll start talking to lenders
                                                 and completing applications. Some will reach out to you, and you’re welcome to contact them as well.</Panel>
                                             </Collapse>
                                             <Collapse accordion={ false } defaultActiveKey="2">
                                               <Panel showArrow={ false } header="Am I guaranteed to get matched?" key="2"><hr/>No, using Lender Match doesn't guarantee that you'll get matched or be offered a loan. Lender Match isn't a loan application — it's a tool to help businesses
                                                 find lenders in their communities.</Panel>
                                             </Collapse>
                                             <Collapse accordion={ false } defaultActiveKey="3">
                                               <Panel showArrow={ false } header="What should I ask a lender?" key="3"><hr/>Ask lenders about interest rates, minimum credit score, cash flow requirements, and other qualifying factors. Get an understanding of prepayment penalties, grace
                                                 periods, and if/when the lender can demand full repayment of the loan’s principal.</Panel>
                                             </Collapse>
                                             <Collapse accordion={ false } defaultActiveKey="4">
                                               <Panel showArrow={ false } header="Why am I asked my personal information?" key="4"><hr/>The personally identifiable information you share will be used to connect you with prospective SBA lenders. Registering and providing responses to the questionnaire
                                                 is no guarantee that SBA-approved lenders will find you eligible for their programs.</Panel>
                                             </Collapse>
                                             <Collapse accordion={ false } defaultActiveKey="5">
                                               <Panel showArrow={ false } header="How many lenders participate?" key="5"><hr/>More than 800 lenders participate in Lender Match throughout all 50 states and U.S. territories. While all lenders who use Lender Match offer SBA-approved loans,
                                                 many also offer conventional loans.</Panel>
                                             </Collapse>
                                             <Collapse accordion={ false } defaultActiveKey="6">
                                               <Panel showArrow={ false } header="Where can I learn more about loans?" key="6"><hr/>We're glad you asked! You can learn about our loan programs in more detail online. If you need to talk to someone about Lender Match, you can contact us.</Panel>
                                             </Collapse>
                                             </div>
                                             <div className={ styles.CallToAction }>
                                               <div className={ styles.ButtonGroup }>
                                                 <Col xs={ 12 } smOffset={ 3 } sm={ 3 }>
                                                 <ExpertHelpBtn/>
                                                 </Col>
                                                 <Col xs={ 12 } sm={ 3 }>
                                                 <FindLendersBtn/>
                                                 </Col>
                                               </div>
                                             </div>
                                           </div>;


const FAQ = (props) => <div className={ styles.faq }>
                         <h3>{ props.question }</h3>
                         <hr />
                         <p>
                           { props.answer }
                         </p>
                       </div>;
