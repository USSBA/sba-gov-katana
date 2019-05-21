import React from 'react'
import styles from './form-error-message.scss'

class FormErrorMessage extends React.Component {
  render() {
    const { errorFor, errorText } = this.props
    return (
      <p id={errorFor + '-error'} className={styles.errorText} data-testid={errorFor + '-error'}>
        {errorText}
      </p>
    )
  }
}
export default FormErrorMessage
