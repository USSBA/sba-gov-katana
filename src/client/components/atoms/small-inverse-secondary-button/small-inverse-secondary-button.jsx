import React from 'react'
import ButtonBase from '../button-base/button-base.jsx'
import styles from './small-inverse-secondary-button.scss'

const SmallInverseSecondaryButton = props => (
  <ButtonBase {...props} buttonClassName={styles.SmallInverseSecondaryButton} />
)

export default SmallInverseSecondaryButton
