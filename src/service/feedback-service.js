function saveFeedback(feedback) {
  console.log("Saving feedback", feedback);
  return Promise.resolve(feedback.id);
}

function saveFeedbackText(id, text) {
  console.log("Saving feedback text", id, text);
  return Promise.resolve();
}

export { saveFeedback, saveFeedbackText };
