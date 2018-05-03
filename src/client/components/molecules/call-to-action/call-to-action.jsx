import React from 'react'
import classNames from 'classnames'
import { camelCase, isEmpty, startsWith } from 'lodash'

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
    backgroundImage: `url(${image})`
  }

  return (
    <div id="call-to-action" className={className}>
      {startsWith(variation, 'large') ? (
        <div className={styles.image} title={imageAlt} style={backgroundImageStyle} />
      ) : null}
      <div className={styles.content}>
        {!startsWith(variation, 'buttonOnly') ? (
          <div className="column">
            <h3>{headline}</h3>
          </div>
        ) : null}
        {startsWith(variation, 'medium') || startsWith(variation, 'large') ? (
          <div>
            <DecorativeDash width={1.611} />
            <p className={styles.blurb}>{blurb}</p>
          </div>
        ) : null}
        <div className="column">
          <Button alternate={!startsWith(variation, 'buttonOnly')} primary url={btnUrl}>
            {btnTitle}
          </Button>
        </div>
      </div>
    </div>
  )
}

export default CallToAction
