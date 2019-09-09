import React from 'react'
import PropTypes from 'prop-types'
import { chunk, size } from 'lodash'

import styles from './generic-card-collection.scss'
import { CardContainer } from 'atoms'

const cardsPerRowMap = {
  '2': 2,
  '3': 3,
  '4': 4,
  '5': 3,
  '6': 6,
  '7': 4,
  '8': 4,
  '9': 3,
  '10': 4,
  '11': 4,
  '12': 6
}

class GenericCardCollection extends React.Component {
  constructor() {
    super()
    this.state = {}
  }
  render() {
    const { leftAligned, parentIndex, cardsContent, numberOverride, cardAriaLabel } = this.props
    const numCards = numberOverride ? numberOverride : size(this.props.cardsContent)
    const cardComponents = cardsContent.map(function(cardContent, index) {
      return (
        <CardContainer
          cardContent={cardContent}
          parentIndex={parentIndex}
          key={index}
          index={index}
          numCards={numCards}
          leftAligned={leftAligned}
          cardAriaLabel={cardAriaLabel}
        />
      )
    })

    const cardsPerRow = cardsPerRowMap[cardComponents.length]
    const rows = chunk(cardComponents, cardsPerRow)
    return (
      <div data-testid="generic-card-collection" className={styles.cardCollection}>
        {rows.map(function(item, index) {
          return (
            <div id={'card-row-' + parentIndex + '-' + index} key={index} className={styles.cardRow}>
              {item}
            </div>
          )
        })}
      </div>
    )
  }
}

GenericCardCollection.propTypes = {
  cardAriaLabel: PropTypes.string,
  cardsContent: PropTypes.arrayOf(PropTypes.element),
  numberOverride: PropTypes.number,
  parentIndex: PropTypes.number,
  leftAligned: PropTypes.bool
}

GenericCardCollection.defaultProps = {
  cardsContent: [],
  numberOverride: null,
  parentIndex: -1,
  leftAligned: false
}

export default GenericCardCollection
