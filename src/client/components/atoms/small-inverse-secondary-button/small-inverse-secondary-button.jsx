import React from 'react'

import styles from './small-inverse-secondary-button.scss'
import { ButtonBase } from 'atoms'

const SmallInverseSecondaryButton = props => (
  <ButtonBase {...props} buttonClassName={styles.SmallInverseSecondaryButton} />
)

export default SmallInverseSecondaryButton
