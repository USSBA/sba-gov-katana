import React from 'react';

import SmallPrimaryFormButton from '../../atoms/small-primary-form-button/small-primary-form-button.jsx';
import SmallGraySecondaryFormButton from '../../atoms/small-grey-secondary-form-button/small-grey-secondary-form-button.jsx';


import styles from './form-page-buttons.scss';

class FormPageButtons extends React.Component {
  render() {
    return (
      <div className={styles.container + " " + (this.props.continueButtonFullWidth ? styles.oneButton : "" )}>
        { this.props.showBackButton? <SmallGraySecondaryFormButton text={this.props.backButtonText} onClick={this.props.backButtonHandler}/> : ""}
        <SmallPrimaryFormButton text={this.props.continueButtonText} disabled={this.props.continueButtonDisabled} onClick={this.props.continueButtonHandler}/>
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
  continueButtonDisabled: false,
  continueButtonFullWidth: false
}

export default FormPageButtons;
