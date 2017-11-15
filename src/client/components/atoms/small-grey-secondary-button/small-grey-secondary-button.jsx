import React from 'react'

import styles from './small-grey-secondary-button.scss'
import { ButtonBase } from 'atoms'

const SmallGreySecondaryButton = props => (
  <ButtonBase {...props} buttonClassName={styles.SmallGreySecondaryButton} />
)

export default SmallGreySecondaryButton
