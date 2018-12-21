import React, { PropTypes } from 'react'
import classNames from 'classnames'
import { isEmpty, snakeCase } from 'lodash'

import styles from './card.scss'
import { DecorativeDash, Link } from 'atoms'
import { TRANSLATIONS } from '../../../translations'
import { getLanguageOverride } from '../../../services/utils'

const Card = props => {
  const {
    index,
    item: { eventConfig, image, link, subtitleText, titleText },
    numCards,
    parentIndex
  } = props

  const className = classNames({
    card: true,
    [styles.card]: true,
    [styles.twoColumn]: numCards < 3,
    [styles.threeColumn]: [3, 5, 9].includes(numCards),
    [styles.fourColumn]: [4, 7, 8, 10, 11].includes(numCards),
    [styles.sixColumn]: [6, 12].includes(numCards) || numCards > 12,
    [styles.noImage]: isEmpty(image)
  })

  // TODO: use lede text instead of subtitle text
  const languageOverride = getLanguageOverride()
  let title =
    languageOverride && languageOverride.startsWith('es')
      ? TRANSLATIONS.learnMore.es.text
      : TRANSLATIONS.learnMore.en.text
  let uri = ''
  if (typeof link === 'string') {
    uri = link
  } else {
    uri = link.uri || link.url
    title = link.title
  }

  let imageMarkup = null
  if (image && image.url) {
    imageMarkup = (
      <img
        id={'image-' + parentIndex + '-' + index}
        className={styles.itemImage}
        src={image.url}
        alt={image.alt}
      />
    )

    if (!isEmpty(link) && uri) {
      imageMarkup = <Link to={uri}>{imageMarkup}</Link>
    }
  }

  const titleMarkup = uri ? <Link to={uri}>{titleText}</Link> : titleText
  const learnMoreMarkup = uri ? <Link to={uri}>{title}</Link> : null

  return (
    <div className={className} id={snakeCase('card', parentIndex, index)}>
      {imageMarkup}
      {/* If a card has a an image, a parent StyledGrayBackground will add
        padding to the card using the class name as a hook. */}
      <div className={`${styles.content} ${!isEmpty(image) && 'content-with-image'}`}>
        {titleText ? (
          <h4 className={styles.itemTitle} id={snakeCase('title', parentIndex, index)}>
            {titleMarkup}
          </h4>
        ) : null}
        {subtitleText ? (
          <div>
            <DecorativeDash id={'hr-' + parentIndex + '-' + index} width={1.667} />
            <p id={'subtitle-text-' + parentIndex + '-' + index} className={styles.itemSubTitle}>
              {subtitleText}
            </p>
          </div>
        ) : null}
        {learnMoreMarkup}
      </div>
    </div>
  )
}

Card.defaultProps = {
  item: {},
  index: -1,
  numCards: -1,
  parentIndex: -1
}

Card.propTypes = {
  item: PropTypes.object,
  index: PropTypes.number,
  numCards: PropTypes.number,
  parentIndex: PropTypes.number
}

export default Card
