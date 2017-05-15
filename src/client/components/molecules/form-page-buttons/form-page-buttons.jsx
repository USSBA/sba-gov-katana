import React from 'react';

import SmallPrimaryButton from '../../atoms/small-primary-button/small-primary-button.jsx';
import styles from './form-page-buttons.scss';

class FormPageButtons extends React.Component {
  render() {
    return (
      <div className={styles.container}>
        { this.props.showBackButton? <SmallPrimaryButton text={this.props.backButtonText} onClick={this.props.backButtonHandler}/> : ""}
        <SmallPrimaryButton text={this.props.continueButtonText} disabled={this.props.continueButtonDisabled} onClick={this.props.continueButtonHandler}/>
      </div>
    );
  }
}

FormPageButtons.defaultProps = {
  showBackButton: true,
  backButtonText: "BACK",
  continueButtonText:  "CONTINUE",
  backButtonHandler: () => {},
  continueButtonHandler: () => {},
  continueButtonDisabled: false
}

export default FormPageButtons;
