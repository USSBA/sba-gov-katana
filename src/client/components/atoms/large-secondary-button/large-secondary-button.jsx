import React from 'react'

import styles from './large-secondary-button.scss'
import { ButtonBase } from 'atoms'

const LargeSecondaryButton = props => (
  <ButtonBase {...props} buttonClassName={styles.LargeSecondaryButton} />
)

export default LargeSecondaryButton
