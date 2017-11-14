import React from 'react'
import ButtonBase from '../button-base/button-base.jsx'
import styles from './large-primary-button.scss'

const LargePrimaryButton = props => (
  <ButtonBase {...props} buttonClassName={styles.LargePrimaryButton} />
)

export default LargePrimaryButton
