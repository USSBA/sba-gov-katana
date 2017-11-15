import React from 'react'

import styles from './small-secondary-button.scss'
import { ButtonBase } from 'atoms'

const SmallSecondaryButton = props => (
  <ButtonBase {...props} buttonClassName={styles.SmallSecondaryButton} />
)

export default SmallSecondaryButton
