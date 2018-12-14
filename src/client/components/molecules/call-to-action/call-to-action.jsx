import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import { camelCase, isEmpty, startsWith } from 'lodash'

import styles from './call-to-action.scss'
import { Button, DecorativeDash } from 'atoms'

const CallToAction = props => {
  const {
    blurb,
    buttonAction: { buttonText, file, link, type },
    image: { url: imageUrl, alt: imageAlt },
    headline
  } = props
  let { size: variation } = props

  let btnTitle
  let btnUrl

  if (type === 'file') {
    btnTitle = buttonText
    btnUrl = file
  } else if (type === 'link') {
    btnTitle = link.title
    btnUrl = link.url
  }

  // e.g. "Button only" (from Drupal) -> styles.buttonOnlyVariation
  variation = camelCase(`${variation.toLowerCase()} variation`)

  const className = classNames({
    [styles.callToAction]: true,
    /* eslint-disable no-implicit-coercion */
    [styles[variation]]: !!variation
  })

  const backgroundImageStyle = {
    backgroundImage: `url(${imageUrl})`
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

CallToAction.propTypes = {
  blurb: PropTypes.string,
  size: PropTypes.oneOf(['Large', 'Medium', 'Small', 'Button only']).isRequired,
  buttonAction: PropTypes.shape({
    buttonText: PropTypes.string,
    file: PropTypes.string,
    link: PropTypes.shape({
      title: PropTypes.string,
      url: PropTypes.string
    }),
    type: PropTypes.oneOf(['file', 'link']).isRequired
  }),
  headline: PropTypes.string,
  image: PropTypes.shape({
    alt: PropTypes.string,
    url: PropTypes.string
  })
}

export default CallToAction
