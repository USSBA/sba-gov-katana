import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import styles from './card-container.scss'

const CardContainer = props => {
  const { cardContent, cardAriaLabel, index, numCards, parentIndex } = props

  /* eslint-disable no-magic-numbers */
  const className = classNames({
    card: true,
    [styles.card]: true,
    [styles.topBorder]: true,
    [styles.shadow]: true,
    [styles.twoColumn]: numCards < 3,
    [styles.threeColumn]: [3, 5, 9].includes(numCards),
    [styles.fourColumn]: [4, 7, 8, 10, 11].includes(numCards),
    [styles.sixColumn]: [6, 12].includes(numCards) || numCards > 12
  })
  /* eslint-enable no-magic-numbers */

  return (
    <div
      className={className}
      id={`card-${parentIndex}-${index + 1}`}
      data-testid="card"
      tabIndex="0"
      aria-label={`${cardAriaLabel} ${index + 1}`}
    >
      {/* <div> */}
      {cardContent}
      {/* </div> */}
    </div>
  )
}

CardContainer.defaultProps = {
  cardAriaLabel: 'card',
  item: {},
  index: -1,
  numCards: -1,
  parentIndex: -1
}

CardContainer.propTypes = {
  cardContent: PropTypes.element.isRequired,
  cardAriaLabel: PropTypes.string,
  index: PropTypes.number,
  numCards: PropTypes.number,
  parentIndex: PropTypes.number
}

export default CardContainer
