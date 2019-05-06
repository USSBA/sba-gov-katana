import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import { isEmpty, snakeCase } from 'lodash'

import styles from './card.scss'
import { DecorativeDash, Link } from 'atoms'
import { TRANSLATIONS } from '../../../translations'
import { getLanguageOverride } from '../../../services/utils'

const Card = props => {
  const {
    cardAriaLabel,
    index,
    item: { image, link, subtitleText, titleText, italicText },
    numCards,
    parentIndex
  } = props

  /* eslint-disable no-magic-numbers */
  const className = classNames({
    card: true,
    [styles.card]: true,
    [styles.twoColumn]: numCards < 3,
    [styles.threeColumn]: [3, 5, 9].includes(numCards),
    [styles.fourColumn]: [4, 7, 8, 10, 11].includes(numCards),
    [styles.sixColumn]: [6, 12].includes(numCards) || numCards > 12,
    [styles.noImage]: isEmpty(image)
  })
  /* eslint-enable no-magic-numbers */

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
        data-testid="card image"
      />
    )

    if (!isEmpty(link) && uri) {
      imageMarkup = <Link to={uri}>{imageMarkup}</Link>
    }
  }

  const titleMarkup = uri ? <Link to={uri}>{titleText}</Link> : titleText
  const learnMoreMarkup = uri ? (
    <Link to={uri} data-testid="card link">
      {title}
    </Link>
  ) : null

  return (
    <div
      className={className}
      id={snakeCase('card', parentIndex, index)}
      data-testid="card"
      tabIndex="0"
      aria-label={`${cardAriaLabel} ${index + 1}`}
    >
      {imageMarkup}
      {/* If a card has a an image, a parent StyledGrayBackground will add
        padding to the card using the class name as a hook. */}
      <div className={`${styles.content} ${!isEmpty(image) && 'content-with-image'}`}>
        {titleText ? (
          <h4
            className={styles.itemTitle}
            id={snakeCase('title', parentIndex, index)}
            data-testid="card title"
          >
            {titleMarkup}
          </h4>
        ) : null}
        {subtitleText || italicText ? (
          <div>
            <DecorativeDash id={'hr-' + parentIndex + '-' + index} width={30} />
            {italicText ? (
              <p
                id={'italic-text-' + parentIndex + '-' + index}
                className={styles.itemItalic}
                data-testid="card italic text"
                tabIndex="0"
              >
                {italicText}
              </p>
            ) : null}
            {subtitleText ? (
              <p
                id={'subtitle-text-' + parentIndex + '-' + index}
                className={styles.itemSubTitle}
                data-testid="card subtitle text"
                tabIndex="0"
              >
                {subtitleText}
              </p>
            ) : null}
          </div>
        ) : null}
        {learnMoreMarkup}
      </div>
    </div>
  )
}

Card.defaultProps = {
  cardAriaLabel: 'card',
  item: {},
  index: -1,
  numCards: -1,
  parentIndex: -1
}

Card.propTypes = {
  cardAriaLabel: PropTypes.string,
  index: PropTypes.number,
  item: PropTypes.shape({
    image: PropTypes.shape({
      alt: PropTypes.string,
      url: PropTypes.url
    }),
    italicText: PropTypes.string,
    link: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
    subtitleText: PropTypes.string,
    titleText: PropTypes.string
  }),
  numCards: PropTypes.number,
  parentIndex: PropTypes.number
}

export default Card
