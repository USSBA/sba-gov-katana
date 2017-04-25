import React from 'react';
import styles from '../../styles/buttons.scss';
import SmallSecondaryButton from "../../atoms/small-secondary-button/small-secondary-button.jsx"

let question = "Was this article Helpful?";
class FeedbackForm extends React.Component {
  constructor() {
    super();
    this.state = {
      showingInput: false
    };
  }
  handleClick() {}
  render() {
    if (showingInput) {
      return (
        <div></div>
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
