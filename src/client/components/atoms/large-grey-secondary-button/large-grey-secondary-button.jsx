import React from 'react'

import styles from './large-grey-secondary-button.scss'
import { ButtonBase } from 'atoms'

const LargeGreySecondaryButton = props => (
  <ButtonBase {...props} buttonClassName={styles.LargeGreySecondaryButton} />
)

export default LargeGreySecondaryButton
