import types from '../actions/types.js'

const feedbackReducer = (state = {}, action) => {
  if (action.type === types.feedback.submitResults) {
    return Object.assign({}, state, {
      lastFeedbackId: action.payload.id
    })
  } else if (action.type === types.feedback.submitText) {
    return Object.assign({}, state)
  }
  return state
}

export default feedbackReducer
