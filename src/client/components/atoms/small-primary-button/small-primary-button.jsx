import React from 'react'
import ButtonBase from '../button-base/button-base.jsx'
import styles from './small-primary-button.scss'

const SmallPrimaryButton = props => (
  <ButtonBase {...props} buttonClassName={styles.SmallPrimaryButton} />
)

export default SmallPrimaryButton
