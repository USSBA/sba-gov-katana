import React from 'react'

import styles from './small-inverse-primary-button.scss'
import { ButtonBase } from 'atoms'

const SmallInversePrimaryButton = props => (
  <ButtonBase {...props} buttonClassName={styles.SmallInversePrimaryButton} />
)

export default SmallInversePrimaryButton
