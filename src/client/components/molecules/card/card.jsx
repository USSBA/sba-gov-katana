import React from 'react'
import { isEmpty, snakeCase } from 'lodash'

import styles from './card.scss'
import { DecorativeDash, Link } from 'atoms'

class Card extends React.Component {
  constructor() {
    super()
    this.state = {}
  }

  computeCardStyle() {
    let retVal = ''
    switch (this.props.numCards) {
      case 0:
      case 1:
      case 2:
        retVal = styles.twoColumn
        break
      case 3:
      case 5:
      case 9:
        retVal = styles.threeColumn
        break
      case 4:
      case 7:
      case 8:
      case 10:
      case 11:
        retVal = styles.fourColumn
        break
      case 12:
        retVal = styles.sixColumn
        break
      default:
        retVal = styles.sixColumn
        break
    }
    return retVal
  }

  render() {
    const cardStyle = `${styles.card} ${this.computeCardStyle()} ${styles.leftAligned} ${
      image ? styles.image : styles.noImage
    }`

    // TODO: use lede text instead of subtitle text
    const { index, item: { eventConfig, image, link, subtitleText, titleText }, parentIndex } = this.props
    let title = 'Learn more'
    let url = ''
    if (typeof link === 'string') {
      url = link
    } else {
      url = link.url
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

      if (!isEmpty(link) && url) {
        imageMarkup = <Link to={url}>{imageMarkup}</Link>
      }
    }

    const titleMarkup = url ? (
      <Link className={styles.unstyledLink} to={url}>
        {titleText}
      </Link>
    ) : (
      titleText
    )

    const learnMoreMarkup = url ? <Link to={url}>{title}</Link> : undefined

    return (
      <div id={snakeCase('card', parentIndex, index)} className={cardStyle}>
        {imageMarkup}
        <div className={styles.content}>
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
        </div>
        {learnMoreMarkup}
      </div>
    )
  }
}

Card.propTypes = {
  item: React.PropTypes.object,
  index: React.PropTypes.number,
  numCards: React.PropTypes.number,
  parentIndex: React.PropTypes.number
}

Card.defaultProps = {
  item: {},
  index: -1,
  numCards: -1,
  parentIndex: -1
}
export default Card
