import React from 'react'
import _ from 'lodash'
import { isEmpty } from 'lodash'

import styles from './card.scss'
import { BasicLink, DecorativeDash } from 'atoms'

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
    const cardStyle = `${this.computeCardStyle()} ${styles.leftAligned}`

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
        imageMarkup = <BasicLink url={url}>{imageMarkup}</BasicLink>
      }
    }

    const titleMarkup = url ? (
      <BasicLink myClassName={styles.unstyledLink} text={titleText} url={url} eventConfig={eventConfig} />
    ) : (
      titleText
    )

    const learnMoreMarkup = url ? (
      <p>
        <BasicLink text={title} url={url} eventConfig={eventConfig} />
      </p>
    ) : (
      undefined
    )

    return (
      <div id={'card-' + parentIndex + '-' + index} className={cardStyle}>
        {imageMarkup}
        {titleText ? (
          <p id={'title-' + parentIndex + '-' + index} className={styles.itemTitle}>
            {titleMarkup}
          </p>
        ) : null}
        {subtitleText ? (
          <div>
            <DecorativeDash id={'hr-' + parentIndex + '-' + index} className={styles.itemHr} />
            <p id={'subtitle-text-' + parentIndex + '-' + index} className={styles.itemSubTitle}>
              {subtitleText}
            </p>
          </div>
        ) : null}
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
