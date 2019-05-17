import React from 'react'
import styles from './form-error-message.scss'

class FormErrorMessage extends React.Component {
  render() {
    return (
      <p
        id={this.props.errorFor + '-error'}
        className={styles.errorText}
        data-testid={this.props.errorFor + '-error'}
      >
        {this.props.errorText}
      </p>
    )
  }
}
export default FormErrorMessage
