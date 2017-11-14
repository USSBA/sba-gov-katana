import React from 'react'
import ButtonBase from '../button-base/button-base.jsx'
import styles from './small-grey-secondary-form-button.scss'

const SmallGreySecondaryFormButton = props => (
  <ButtonBase
    {...props}
    buttonClassName={styles.SmallGreySecondaryFormButton}
  />
)

export default SmallGreySecondaryFormButton
