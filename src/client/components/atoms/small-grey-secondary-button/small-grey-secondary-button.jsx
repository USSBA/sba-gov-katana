import React from 'react'
import ButtonBase from '../button-base/button-base.jsx'
import styles from './small-grey-secondary-button.scss'

const SmallGreySecondaryButton = props => (
  <ButtonBase {...props} buttonClassName={styles.SmallGreySecondaryButton} />
)

export default SmallGreySecondaryButton
