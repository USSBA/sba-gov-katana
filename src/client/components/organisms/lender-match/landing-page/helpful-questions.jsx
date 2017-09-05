import React from "react";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import {
  SmallSecondaryButton,
  SmallPrimaryButton
} from "atoms";
import * as LocationChangeActions from "../../../../actions/navigation.js";
import styles from "./helpful-questions.scss";
import thumbNail from "../../../../../../public/assets/images/placeholder370x170.png";

import "../../../../styles/common/collapse.scss";
var Collapse = require('rc-collapse');
var Panel = Collapse.Panel;


let question1 = "What happens next?"
let answer1 = "You’ll receive an email with contact information of interested lenders two business days after you submit the form. From there, you’ll start talking to lenders and completing applications. Some will reach out to you, and you’re welcome to contact them as well.";

let answer2 = "No, using Lender Match doesn't guarantee that you'll get matched or be offered a loan. Lender Match isn't a loan application — it's a tool to help businesses find lenders in their communities."
let answer3 = "Ask lenders about interest rates, minimum credit score, cash flow requirements, and other qualifying factors. Get an understanding of prepayment penalties, grace periods, and if/when the lender can demand full repayment of the loan’s principal."
let answer4 = "The personally identifiable information you share will be used to connect you with prospective SBA lenders. Registering and providing responses to the questionnaire is no guarantee that SBA-approved lenders will find you eligible for their programs."
let answer5 = "More than 800 lenders participate in Lender Match throughout all 50 states and U.S. territories. While all lenders who use Lender Match offer SBA-approved loans, many also offer conventional loans."

class HelpfulQuestions extends React.Component {
  handleLenderMatchBtnClick() {
    this.props.actions.locationChange('/lendermatch/form/contact', {label: "Find Lenders #2"});
  }
  render() {
    return (
      <div className={styles.section}>
        <h2>Details.</h2>
        <div className={styles.mobileFAQs}>
          <Collapse accordion={false}>
            <Panel showArrow={false} header={question1}>
              <hr/>{answer1}</Panel>
          </Collapse>
          <Collapse accordion={false}>
            <Panel showArrow={false} header="Am I guaranteed to get matched?">
              <hr/>{answer2}</Panel>
          </Collapse>
          <Collapse accordion={false}>
            <Panel showArrow={false} header="What should I ask a lender?">
              <hr/>{answer3}</Panel>
          </Collapse>
          <Collapse accordion={false}>
            <Panel showArrow={false} header="Why am I asked my personal information?">
              <hr/>{answer4}</Panel>
          </Collapse>
          <Collapse accordion={false}>
            <Panel showArrow={false} header="How many lenders participate?">
              <hr/>{answer5}</Panel>
          </Collapse>
          <Collapse accordion={false}>
            <Panel showArrow={false} header="Where can I learn more about loans?">
              <hr/>
              <span>Were glad you asked! You can learn about our loan programs in more detail&nbsp;
                <a target="_blank" href="/loans-grants/see-what-sba-offers/sba-loan-programs">online</a>. If you need to talk to someone about Lender Match, you can&nbsp;
                <a target="_blank" href="https://www.sba.gov/about-sba/what-we-do/contact-sba">contact us</a>
                &nbsp;or email us at&nbsp;
                <a href="mailto:lendermatch@sba.gov">lendermatch@sba.gov</a>
              </span>
            </Panel>
          </Collapse>
        </div>
        <div className={styles.desktopFAQs}>
          <Collapse accordion={false} defaultActiveKey="1">
            <Panel showArrow={false} header={question1} key="1">
              <hr/>{answer1}</Panel>
          </Collapse>
          <Collapse accordion={false} defaultActiveKey="2">
            <Panel showArrow={false} header="Am I guaranteed to get matched?" key="2">
              <hr/>{answer2}</Panel>
          </Collapse>
          <Collapse accordion={false} defaultActiveKey="3">
            <Panel showArrow={false} header="What should I ask a lender?" key="3">
              <hr/>{answer3}</Panel>
          </Collapse>
          <Collapse accordion={false} defaultActiveKey="4">
            <Panel showArrow={false} header="Why am I asked my personal information?" key="4">
              <hr/>{answer4}</Panel>
          </Collapse>
          <Collapse accordion={false} defaultActiveKey="5">
            <Panel showArrow={false} header="How many lenders participate?" key="5">
              <hr/>{answer5}</Panel>
          </Collapse>
          <Collapse accordion={false} defaultActiveKey="6">
            <Panel showArrow={false} header="Where can I learn more about loans?" key="6">
              <hr/>
              <span>We're glad you asked! You can learn about our loan programs in more detail&nbsp;
                <a target="_blank" href="/loans-grants/see-what-sba-offers/sba-loan-programs">online</a>. If you need to talk to someone about Lender Match, you can&nbsp;
                <a target="_blank" href="https://www.sba.gov/about-sba/what-we-do/contact-sba">contact us</a>
                &nbsp;or email us at&nbsp;
                <a href="mailto:lendermatch@sba.gov">lendermatch@sba.gov</a>
              </span>
            </Panel>
          </Collapse>
        </div>
        <div className={styles.CallToAction}>
          <div className={styles.ButtonGroup}>
            <SmallSecondaryButton url="/tools/local-assistance" text="EXPERT HELP"/>
            <SmallPrimaryButton text="FIND LENDERS" onClick={this.handleLenderMatchBtnClick.bind(this)}/>
          </div>
        </div>
      </div>
    );
  }
}

function mapReduxStateToProps(reduxState) {
  return {};
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(LocationChangeActions, dispatch)
  };
}
export default connect(mapReduxStateToProps, mapDispatchToProps)(HelpfulQuestions);
