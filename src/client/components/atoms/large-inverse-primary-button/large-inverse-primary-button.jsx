import React from 'react'

import styles from './large-inverse-primary-button.scss'
import { ButtonBase } from 'atoms'

const LargeInversePrimaryButton = props => (
  <ButtonBase {...props} buttonClassName={styles.LargeInversePrimaryButton} />
)

export default LargeInversePrimaryButton
