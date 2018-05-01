import React from 'react'
import { kebabCase } from 'lodash'

import styles from './form-page-buttons.scss'
import { Button } from 'atoms'

const FormPageButtons = props => {
  const {
    backButtonText,
    backButtonHandler,
    continueButtonDisabled,
    continueButtonFullWidth,
    continueButtonHandler,
    continueButtonText,
    showBackButton
  } = props

  return (
    <div className={styles.container + ' ' + (continueButtonFullWidth ? styles.oneButton : '')}>
      {showBackButton ? (
        <Button id={`${parentId}-${kebabCase(backButtonText)}`} onClick={backButtonHandler} secondary>
          {backButtonText}
        </Button>
      ) : null}
      <Button
        id={`${parentId}-${kebabCase(continueButtonText)}`}
        disabled={continueButtonDisabled}
        onClick={continueButtonHandler}
        primary
      >
        {continueButtonText}
      </Button>
    </div>
  )
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
