import React from 'react'
import styles from './small-primary-button.scss'

import { ButtonBase } from 'atoms'

const SmallPrimaryButton = props => <ButtonBase {...props} buttonClassName={styles.SmallPrimaryButton} />

export default SmallPrimaryButton
