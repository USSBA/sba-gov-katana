import React from 'react'
import ButtonBase from '../button-base/button-base.jsx'
import styles from './large-inverse-primary-button.scss'

const LargeInversePrimaryButton = props => (
  <ButtonBase {...props} buttonClassName={styles.LargeInversePrimaryButton} />
)

export default LargeInversePrimaryButton
