import React from 'react'
import styles from './extra-large-title-text.scss'

const ExtraLargeTitleText = props => (
  <div>
    <h1 className={styles.ExtraLargeTitleText}>{props.text}</h1>
  </div>
)

export default ExtraLargeTitleText
