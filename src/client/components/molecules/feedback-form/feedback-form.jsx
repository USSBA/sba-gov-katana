import React from 'react';
import styles from './feedback-form.scss'
import SmallPrimaryButton from "../../atoms/small-primary-button/small-primary-button.jsx"
import TextArea from "../../atoms/textarea.jsx";

let question = "Was this article helpful?";
let firstThankYou = "Thanks for your feedback!";
let subtext = "Please let us know how you think we can improve this article";
let placeholder = "Add your suggestions here";
let states = ["QUESTION", "INPUT", "THANKYOU"];
class FeedbackForm extends React.Component {
  constructor() {
    super();
    this.state = {
      displayState: states[0]
    };
  }
  handleYesClick() {
      this.setState({displayState: states[1]});
  }
  handleNoClick() {
      this.setState({displayState: states[1]});
  }
  handleSubmit(){
      this.setState({displayState: states[2]});
  }
  render() {
    if (this.state.displayState === states[1]) {
      return (
        <div className={styles.InputContainer}>
          <h4 className={styles.question}>{firstThankYou}</h4>
          <p>{subtext}</p>
          <TextArea placeholder={placeholder} length={250} showCounter={false}/>
          <SmallPrimaryButton text="SUBMIT" onClick={this.handleSubmit.bind(this)} />
        </div>
      );
    } else if (this.state.displayState === states[2]) {
      return (
        <div className={styles.ThankYouContainer}>
          <h4>Thanks again for your feedback!</h4>
        </div>
      );
    } else {
      return (
        <div className={styles.QuestionContainer}>
          <h4 className={styles.question}>{question}</h4>
          <div>
            <button className={styles.GreenButton} onClick={this.handleYesClick.bind(this)}>YES</button>
            <button className={styles.RedButton} onClick={this.handleYesClick.bind(this)}>NO</button>
          </div>
        </div>
      );
    }
  }
}

export default FeedbackForm;
