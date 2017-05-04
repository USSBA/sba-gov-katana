import React from 'react';
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import styles from './feedback-form.scss'
import SmallPrimaryButton from "../../atoms/small-primary-button/small-primary-button.jsx"
import TextArea from "../../atoms/textarea.jsx";
import * as FeedbackActions from "../../../actions/feedback.js";
import uuid from "uuid";

let question = "Was this article helpful?";
let firstThankYou = "Thanks for your feedback!";
let subtext = "Please let us know how you think we can improve this article";
let placeholder = "Add your suggestions here";
let thanksAgain = "Thanks again for your feedback!";
let states = ["QUESTION", "INPUT", "THANKYOU"];
class FeedbackForm extends React.Component {
  constructor() {
    super();
    this.state = {
      displayState: states[0],
      feedbackText: "",
      honeyPotText: "",
    };
  }
  handleYesClick() {
    this.props.actions.submitResults(true, uuid.v4());
    this.setState({displayState: states[1]});
  }
  handleNoClick() {
    this.props.actions.submitResults(false, uuid.v4());
    this.setState({displayState: states[1]});
  }
  handleSubmit() {
    this.props.actions.submitText(this.props.lastFeedbackId, {feedbackText: this.state.feedbackText, honeyPotText: this.state.honeyPotText});
    this.setState({displayState: states[2]});
  }
  handleChange(e) {
    this.setState({feedbackText: e.target.value});
  }

  handleMaidenNameChange(e){
    this.setState({honeyPotText: e.target.value});
  }

  render() {
    if (this.state.displayState === states[1]) {
      return (
        <div id="feedback-module-input" className={styles.InputContainer}>
          <h4 className={styles.question}>{firstThankYou}</h4>
          <p>{subtext}</p>
          <TextArea id="feedback-input" placeholder={placeholder} showCounter={false} onChange={this.handleChange.bind(this)} />
          <div className={styles.maidenNameContainer}><input id="maiden-name" onChange={this.handleMaidenNameChange.bind(this)}/></div>
          <SmallPrimaryButton id="feedback-submit-button" text="SUBMIT" onClick={this.handleSubmit.bind(this)} disabled={!this.state.feedbackText || this.state.feedbackText.length===0}/>
        </div>
      );
    } else if (this.state.displayState === states[2]) {
      return (
        <div id="feedback-module-thankyou" className={styles.ThankYouContainer}>
          <i id="thank-you-check-circle" tabIndex="-1" alt="thank-you" className={"fa fa-check-circle " + styles.checkIcon} aria-hidden="true"></i>
          <h4 className={styles.thanksAgain}>{thanksAgain}</h4>
        </div>
      );
    } else {
      return (
        <div id="feedback-module-question" className={styles.QuestionContainer}>
          <h4 className={styles.question}>{question}</h4>
          <div>
            <button id="feedback-yes-button" className={styles.GreenButton} onClick={this.handleYesClick.bind(this)}>YES</button>
            <button id="feedback-no-button" className={styles.RedButton} onClick={this.handleYesClick.bind(this)}>NO</button>
          </div>
        </div>
      );
    }
  }
}

function mapStateToProps(state) {
  return {lastFeedbackId: state.feedback.lastFeedbackId};
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(FeedbackActions, dispatch)
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(FeedbackForm);
