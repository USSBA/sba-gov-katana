import React from 'react'
import classNames from 'classnames'
import styles from './form-error-message.scss'

class FormErrorMessage extends React.Component {
  render() {
    const { errorFor, errorText, alternate } = this.props
    return (
      <p
      	id={errorFor + '-error'}
      	className={classNames({
      		[styles.errorText]: true,
      		[styles.alternate]: alternate,
      	})}
      	data-testid={errorFor + '-error'}>
        {errorText}
      </p>
    )
  }
}
export default FormErrorMessage
