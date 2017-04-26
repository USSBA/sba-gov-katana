import React from 'react';
import SmallSecondaryButton from "../../atoms/small-secondary-button/small-secondary-button.jsx"

let question = "Was this article Helpful?";
let states = ["INITIAL", "INPUT", "THANKYOU"];
class FeedbackForm extends React.Component {
  constructor() {
    super();
    this.state = {
      displayState: states[0]
    };
  }
  handleClick() {}
  render() {
    if (this.state.displayState === state[1]) {
      return (
        <div>
          <p>Thanks for your feedback!</p>
          <p>Please let us know how you think we can improve this article</p>
        </div>
      );
  } else if (this.state.displayState === state[2]) {
      return (
        <div>
          <i>Thanks for your feedback!</p>
          <p>Thanks again for your feedback!</p>
        </div>
      );
    } else {
      return (
        <div>
          <p>{question}</p>
          <div>
            <SmallSecondaryButton text="Yes"/>
            <SmallSecondaryButton text="No"/>
          </div>
        </div>
      );
    }
  }
}

export default FeedbackForm;
