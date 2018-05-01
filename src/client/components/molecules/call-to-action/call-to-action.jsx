import React from 'react'
import classNames from 'classnames'
import { camelCase, isEmpty } from 'lodash'

import styles from './call-to-action.scss'
import { Button, DecorativeDash } from 'atoms'

const CallToAction = props => {
  let { size: variation } = props
  const { blurb, btnTitle, btnUrl, image, imageAlt, headline } = props

  // e.g. "Button only" (from Drupal) -> styles.buttonOnlyVariation
  variation = camelCase(`${variation.toLowerCase()} variation`)

  const className = classNames({
    [styles.callToAction]: true,
    [styles[variation]]: !!variation
  })

  const backgroundImageStyle = {
    backgroundImage: `url(https://kevin.sba.fun/${image})`
  }

  return (
    <div id="call-to-action" className={className}>
      {variation === 'largeVariation' ? (
        <div className={styles.image} title={imageAlt} style={backgroundImageStyle} />
      ) : null}
      <div className={styles.content}>
        {variation !== 'buttonOnlyVariation' ? <h3>{headline}</h3> : null}
        {variation !== 'smallVariation' && variation !== 'buttonOnlyVariation' ? (
          <div>
            <DecorativeDash width={1.611} />
            <p className={styles.blurb}>{blurb}</p>
          </div>
        ) : null}
        <Button alternate={variation !== 'buttonOnlyVariation'} primary url={btnUrl}>
          {btnTitle}
        </Button>
      </div>
    </div>
  )
}

export default CallToAction
