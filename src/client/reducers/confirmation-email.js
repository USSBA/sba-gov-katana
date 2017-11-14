const confirmationEmailReducer = (state = {}, action) => {
  if (action.type === 'RESEND_CONFIRMATION_EMAIL_SUCCESS') {
    return Object.assign({}, state, {
      resent: 'success'
    })
  } else if (action.type === 'RESEND_CONFIRMATION_EMAIL_ERROR') {
    return Object.assign({}, state, {
      resent: 'error'
    })
  }

  return state
}

export default confirmationEmailReducer
