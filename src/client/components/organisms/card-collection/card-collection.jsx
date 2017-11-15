import React from 'react'
import _ from 'lodash'
import { Card } from 'molecules'
import styles from './card-collection.scss'

let cardsPerRowMap = {
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

class CardCollection extends React.Component {
  constructor() {
    super()
    this.state = {}
  }
  render() {
    let leftAligned = this.props.leftAligned
    let numCards = _.size(this.props.cards)
    let parentIndex = this.props.parentIndex
    let cards = this.props.cards.map(function(item, index) {
      return (
        <Card
          parentIndex={parentIndex}
          key={index}
          item={item}
          index={index}
          numCards={numCards}
          leftAligned={leftAligned}
        />
      )
    })
    let cardsPerRow = cardsPerRowMap[cards.length]
    let rows = _.chunk(cards, cardsPerRow)
    return (
      <div className={styles.cardCollection}>
        {rows.map(function(item, index) {
          return (
            <div
              id={'card-row-' + parentIndex + '-' + index}
              key={index}
              className={styles.cardRow}
            >
              {item}
            </div>
          )
        })}
      </div>
    )
  }
}

CardCollection.propTypes = {
  cards: React.PropTypes.array,
  parentIndex: React.PropTypes.number
}

CardCollection.defaultProps = {
  cards: [],
  parentIndex: -1
}
export default CardCollection
