import React from 'react'
import styles from './icons.scss'

class Failure extends React.Component {
  render() {
    return <i className={styles.failure + ' fa fa-exclamation-circle'} />
  }
}

export default Failure
