function saveFeedback(feedback) {
  console.log("Saving feedback", feedback);
  return Promise.resolve(feedback.id);
}

function saveFeedbackText(id, feedbackText, honeyPotText) {
  if (honeyPotText) {
    return Promise.reject("This is submitted by a spam bot.");
  }
  console.log("Saving feedback text", id, feedbackText);
  return Promise.resolve();
}


export { saveFeedback, saveFeedbackText };
