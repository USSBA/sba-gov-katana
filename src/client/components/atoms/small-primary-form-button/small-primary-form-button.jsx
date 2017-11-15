import React from 'react'

import styles from './small-primary-form-button.scss'
import { ButtonBase } from 'atoms'

const SmallPrimaryFormButton = props => (
  <ButtonBase {...props} buttonClassName={styles.SmallPrimaryFormButton} />
)

export default SmallPrimaryFormButton
