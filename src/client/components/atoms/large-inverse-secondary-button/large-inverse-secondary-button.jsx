import React from 'react'

import styles from './large-inverse-secondary-button.scss'
import { ButtonBase } from 'atoms'

const LargeInverseSecondaryButton = props => (
  <ButtonBase {...props} buttonClassName={styles.LargeInverseSecondaryButton} />
)

export default LargeInverseSecondaryButton
