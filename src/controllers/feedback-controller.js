import { saveFeedback, saveFeedbackText, getFeedback } from '../service/feedback-service.js'
import _ from 'lodash'
import HttpStatus from 'http-status-codes'

function handleFeedback(req, res) {
  if (req && req.body && req.body.result) {
    const feedback = {
      sessionId: req.sessionInfo || '',
      result: req.body.result,
      sourceLocation: req.header('Referer'),
      sourceIpAddress: req.ip
    }
    saveFeedback(feedback)
      .then(function(id) {
        res.status(HttpStatus.OK).send({
          id: id
        })
      })
      .catch(error => {
        console.error(error)
        res.status(HttpStatus.INTERNAL_SERVER_ERROR).send('Error saving feedback.')
      })
  } else {
    res
      .status(HttpStatus.BAD_REQUEST)
      .send(
        "Result missing from body.  Please check that the HTTP Request body includes a result with a value 'yes' or 'no'"
      )
  }
}

function handleFeedbackText(req, res) {
  if (req && req.body && req.body.text.feedbackText && req.params && req.params.id) {
    saveFeedbackText(req.params.id, req.body.text.feedbackText, req.body.text.honeyPotText)
      .then(function() {
        res.status(HttpStatus.NO_CONTENT).send()
      })
      .catch(error => {
        console.error(error)
        res.status(HttpStatus.INTERNAL_SERVER_ERROR).send('Error saving feedback.')
      })
  } else {
    res
      .status(HttpStatus.BAD_REQUEST)
      .send(
        'Text missing from body or ID missing from URL.  Please check that the HTTP request includes a text'
      )
  }
}

function retrieveFeedback(req, res) {
  if (req && req.sessionInfo) {
    getFeedback(req.sessionInfo)
      .then(function(results) {
        res
          .header('Content-Type', 'text/csv')
          .status(HttpStatus.OK)
          .send(results)
      })
      .catch(error => {
        if (error.message === 'FORBIDDEN') {
          res
            .status(HttpStatus.FORBIDDEN)
            .send('Please log in as an Administrator before requesting this data')
        } else {
          res.status(HttpStatus.INTERNAL_SERVER_ERROR).send('Error retrieving feedback')
        }
      })
  } else {
    res.status(HttpStatus.FORBIDDEN).send('Please log in as an Administrator before requesting this data')
  }
}

export { handleFeedback, handleFeedbackText, retrieveFeedback }
