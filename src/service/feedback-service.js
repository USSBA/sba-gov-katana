import Feedback from '../models/feedback.js'
import _ from 'lodash'
import moment from 'moment'
import uuid from 'uuid'
import { isAdministrator } from '../service/user-service.js'
import { formatFeedbackData } from '../util/formatter.js'

function saveFeedback(feedback) {
  const newFeedback = _.assign({}, feedback, {
    id: uuid.v4(),
    timestamp: moment().unix()
  })
  return Feedback.create(newFeedback).then(function(result) {
    return result.id
  })
}

function saveFeedbackText(id, feedbackText, honeyPotText) {
  if (honeyPotText) {
    console.log('Detected submission with honeypot field filled.')
    return Promise.resolve()
  }
  return Feedback.update(
    {
      text: feedbackText
    },
    {
      where: {
        id: id
      }
    }
  )
}

function getFeedback(sessionId) {
  // the user authorization is here for now; move it to the global ACL when one is implemented
  return isAdministrator(sessionId).then(isAdmin => {
    if (isAdmin) {
      return Feedback.findAll({
        raw: true
      }).then(data => {
        if (data && data.length > 0) {
          return formatFeedbackData(data)
        }
        return ''
      })
    }
    throw new Error('FORBIDDEN')
  })
}

export { saveFeedback, saveFeedbackText, getFeedback }
