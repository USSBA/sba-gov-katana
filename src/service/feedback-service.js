function saveFeedback(feedback) {
  console.log(feedback);
  return Promise.resolve();
}

function saveFeedbackText(id, text) {
  console.log(id, text);
  return Promise.resolve();
}

export { saveFeedback, saveFeedbackText };
