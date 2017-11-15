import React from 'react'
import _ from 'lodash'

import { SmallGraySecondaryFormButton, SmallPrimaryFormButton } from 'atoms'

import styles from './form-page-buttons.scss'

class FormPageButtons extends React.Component {
  render() {
    return (
      <div
        className={
          styles.container +
          ' ' +
          (this.props.continueButtonFullWidth ? styles.oneButton : '')
        }
      >
        {this.props.showBackButton ? (
          <SmallGraySecondaryFormButton
            id={
              this.props.parentId + '-' + _.kebabCase(this.props.backButtonText)
            }
            text={this.props.backButtonText}
            onClick={this.props.backButtonHandler}
          />
        ) : (
          ''
        )}
        <SmallPrimaryFormButton
          id={
            this.props.parentId +
            '-' +
            _.kebabCase(this.props.continueButtonText)
          }
          text={this.props.continueButtonText}
          disabled={this.props.continueButtonDisabled}
          onClick={this.props.continueButtonHandler}
        />
      </div>
    )
  }
}

FormPageButtons.defaultProps = {
  showBackButton: true,
  backButtonText: 'BACK',
  continueButtonText: 'CONTINUE',
  backButtonHandler: () => {},
  continueButtonHandler: () => {},
  continueButtonDisabled: false,
  continueButtonFullWidth: false
}

export default FormPageButtons
