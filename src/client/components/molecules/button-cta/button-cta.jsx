import React from 'react'

import styles from './button-cta.scss'
import { Button } from 'atoms'

// TODO: Merge with CallToAction component.
const ButtonCallToAction = ({ title, url }) => (
  <div className={styles.buttonCallToAction}>
    <Button primary url={url}>
      {title}
    </Button>
  </div>
)

export default ButtonCallToAction
