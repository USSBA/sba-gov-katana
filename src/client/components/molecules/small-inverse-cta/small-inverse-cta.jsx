import React from 'react'

import styles from './small-inverse-cta.scss'
import { Button } from 'atoms'

const SmallInverseCta = props => {
  const { actionText, buttonText, url } = props

  return (
    <div id="small-inverse-cta" className={styles.smallInverseCta}>
      <p>{actionText}</p>
      <Button primary url={url}>
        {buttonText}
      </Button>
    </div>
  )
}

SmallInverseCta.defaultProps = {
  url: '/',
  buttonText: 'Go Home',
  actionText: 'My Action Text'
}

export default SmallInverseCta
