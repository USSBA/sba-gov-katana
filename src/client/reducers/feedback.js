const feedbackReducer = (state = {}, action) => {
  if (action.type === "SUBMIT_RESULTS") {
    return Object.assign({}, state, {
      lastFeedbackId: action.payload
    });
  } else if (action.type === "SUBMIT_TEXT") {
    return Object.assign({}, state);
  }
  return state;
};


export default feedbackReducer;
