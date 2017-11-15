import React from 'react'
import ButtonBase from '../button-base/button-base.jsx'
import styles from './large-secondary-button.scss'

const LargeSecondaryButton = props => (
  <ButtonBase {...props} buttonClassName={styles.LargeSecondaryButton} />
)

export default LargeSecondaryButton
