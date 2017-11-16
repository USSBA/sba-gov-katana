import React from 'react'

import styles from './small-grey-secondary-form-button.scss'
import { ButtonBase } from 'atoms'

const SmallGreySecondaryFormButton = props => (
  <ButtonBase {...props} buttonClassName={styles.SmallGreySecondaryFormButton} />
)

export default SmallGreySecondaryFormButton
