import React from "react";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import {Resource} from "molecules";

import * as ConfirmationEmailActions from "../../../../actions/confirmation-email.js";
import {logEvent} from "../../../../services/analytics.js";

import styles from "./confirm-section.scss";


class ConfirmSection extends React.Component {
  constructor(props) {
    super();
    this.state = {
      resendClicked: false
    };
  }

  handleClick(e) {
    e.preventDefault();
    this.resend();
    this.setState({resendClicked: true});
  }
  resend() {
    this.props.actions.resendConfirmationEmail(this.props.email);
  }

  render() {
    let resendLink = this.state.resendClicked
      ? <span className={styles.resendLink}>
          Email was re-sent.</span>
      : <a lassName={styles.resendLink} onClick={this.handleClick.bind(this)} href="">Click here to resend.</a>;
    return (
      <div className={styles.section}>
        <h1>{this.props.name.split(" ")[0]}, check your email.</h1>
        <h5>We sent an email to {this.props.email}.<br/>
          Click on the verification link inside.<br/>
          Don’t see a confirmation email? {resendLink}
        </h5>
        <div className={styles.resources}>
          <Resource title="Free business plan template" duration="1-hour activity" description="Many lenders expect a business plan — consider using this template." buttonURL="/tools/business-plan/1" buttonText="Create Plan"/>
          <Resource title="How to prep a loan proposal" duration="30-minute video" description="This video learning course will walk you through commonly requested documents." buttonURL="/tools/sba-learning-center/training/how-prepare-loan-package" buttonText="Watch Video"/>
          <Resource title="5 Tips for loan applications" duration="5-minute read" description="This blog features tips and tricks on getting through the loan process quickly and easily." buttonURL="/blogs/5-tips-successfully-navigating-sba-loan-application-process" buttonText="Read More"/>
        </div>
      </div>
    )
  }

}

function mapReduxStateToProps(reduxState) {
    // return {name: "Jon", email: "j@j.gov"};
  return {name: reduxState.lenderMatch.contactInfoData.contactFullName, email: reduxState.lenderMatch.contactInfoData.contactEmailAddress};
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(ConfirmationEmailActions, dispatch)
  };
}
export default connect(mapReduxStateToProps, mapDispatchToProps)(ConfirmSection);
