import React from 'react'
import uuid from 'uuid'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import styles from './feedback-form.scss'
import * as FeedbackActions from '../../../actions/feedback.js'
import { Button, TextArea } from 'atoms'

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
      honeyPotText: ''
    }
  }

  handleYesClick() {
    this.props.actions.submitResults('yes', uuid.v4())
    this.setState({ displayState: states[1] })
  }

  handleNoClick() {
    this.props.actions.submitResults('no', uuid.v4())
    this.setState({ displayState: states[1] })
  }

  handleSubmit() {
    const { actions: { submitText }, lastFeedbackId } = this.props
    const { feedbackText, honeyPotText } = this.state

    submitText(lastFeedbackId, { feedbackText, honeyPotText })
    this.setState({ displayState: states[2] })
  }

  handleChange(e) {
    this.setState({ feedbackText: e.target.value })
  }

  handleMaidenNameChange(e) {
    this.setState({ honeyPotText: e.target.value })
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
          <div className={styles.maidenNameContainer}>
            <input id="maiden-name" onChange={this.handleMaidenNameChange.bind(this)} />
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
    } else if (displayState === states[2]) {
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
    } else {
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

function mapStateToProps(state) {
  return { lastFeedbackId: state.feedback.lastFeedbackId }
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(FeedbackActions, dispatch)
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(FeedbackForm)
