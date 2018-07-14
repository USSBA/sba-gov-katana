import React from 'react'
import axios from 'axios'

import styles from './feedback-form.scss'
import { Button, TextArea } from 'atoms'
import constants from '../../../services/constants.js'

const question = 'Was this article helpful?'
const firstThankYou = 'Thanks for your feedback!'
const secondThankYou = 'Thanks again for your feedback!'
const subtext = 'Please let us know how you think we can improve this article'
const placeholder = 'Add your suggestions here'
const states = ['QUESTION', 'INPUT', 'THANKYOU']

class FeedbackForm extends React.Component {
  constructor() {
    super()
    this.state = {
      displayState: states[0],
      feedbackText: '',
      otherFeedback: '',
      currentData: null
    }
  }

  submitFeedbackToServer(result, newDisplayState) {
    axios.post(constants.routes.submitFeedbackResults, result).then(response => {
      if (response && response.status === 200) {
        let data = response.data;
        this.setState({ displayState: newDisplayState, currentData: data })
      }
      else {
        console.log(response)
      }
    })
  }

  handleYesClick() {
    this.submitFeedbackToServer({ result: "yes" }, states[1])
  }

  handleNoClick() {
    this.submitFeedbackToServer({ result: "no" }, states[1])
  }

  handleSubmit() {
    const { feedbackText, otherFeedback } = this.state
    let newFeedback = Object.assign({},{ feedbackText, otherFeedback }, this.state.currentData);
    this.submitFeedbackToServer(newFeedback, states[2]);
  }

  handleChange(e) {
    this.setState({ feedbackText: e.target.value })
  }

  handleOtherFeedbackChange(e) {
    this.setState({ otherFeedback: e.target.value })
  }

  render() {
    const { displayState, feedbackText } = this.state

    if (displayState === states[1]) {
      return (
        <div id="feedback-module-input" className={styles.container}>
          <h4 className={styles.firstThankYou}>{firstThankYou}</h4>
          <p>{subtext}</p>
          <TextArea
            id="feedback-input"
            placeholder={placeholder}
            showCounter={false}
            onChange={this.handleChange.bind(this)}
            value={feedbackText}
          />
          {/* This is a honeypot input to catch bots. */}
          <div className={styles.otherFeedbackContainer}>
            <input id="other-feedback" onChange={this.handleOtherFeedbackChange.bind(this)} />
          </div>
          <Button
            id="feedback-submit-button"
            onClick={this.handleSubmit.bind(this)}
            disabled={!feedbackText || feedbackText.length === 0}
            primary
          >
            Submit
          </Button>
        </div>
      )
    }
    else if (displayState === states[2]) {
      return (
        <div id="feedback-module-thank-you" className={styles.container}>
          <i
            id="thank-you-check-circle"
            tabIndex="-1"
            alt="thank-you"
            className={'fa fa-check-circle fa-2x'}
            aria-hidden="true"
          />
          <h4>{secondThankYou}</h4>
        </div>
      )
    }
    else {
      return (
        <div id="feedback-module-question" className={styles.container}>
          <h4 className={styles.question}>{question}</h4>
          <div>
            <Button id="feedback-yes-button" onClick={this.handleYesClick.bind(this)} primary>
              Yes
            </Button>
            <Button id="feedback-no-button" onClick={this.handleNoClick.bind(this)} primary>
              No
            </Button>
          </div>
        </div>
      )
    }
  }
}

export default FeedbackForm
