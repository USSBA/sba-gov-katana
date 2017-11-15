import React from 'react'
import _ from 'lodash'

import styles from './button-cta.scss'
import { LargePrimaryButton } from 'atoms'

const ButtonCta = props => {
  let eventConfig = {
    category: 'General-CTA-Button',
    action: _.camelCase(props.title) + ': ' + props.url
  }
  return (
    <div className={styles.buttonCTA}>
      <LargePrimaryButton
        text={props.title}
        url={props.url}
        eventConfig={eventConfig}
      />
    </div>
  )
}

export default ButtonCta
