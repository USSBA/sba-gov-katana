import React from 'react'
import PropTypes from 'prop-types'
import { chunk, size } from 'lodash'

import breakpoints from '../../../styles/base/_variables.scss'
import styles from './card-collection.scss'
import { Card } from 'molecules'

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

const medium = parseInt(breakpoints.breakpointMedium, 10)
const large = parseInt(breakpoints.breakpointLarge, 10)

class CardCollection extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      cardsPerRow: cardsPerRowMap[props.cards.length]
    }
  }

  componentDidMount() {
    const viewportWidth = Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0)

    if (viewportWidth >= medium && viewportWidth < large && this.props.cards.length === 4) {
      this.setState({ cardsPerRow: 2 })
    }
  }

  updateCardsPerRow() {
    const viewportWidth = Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0)
    const { cardsPerRow } = this.state
    const cardsLength = cardsPerRowMap[this.props.cards.length]

    if (viewportWidth >= medium && viewportWidth < large) {
      cardsPerRow !== 2 && this.setState({ cardsPerRow: 2 })
    } else {
      cardsPerRow !== cardsLength && this.setState({ cardsPerRow: cardsLength })
    }
  }

  render() {
    const { leftAligned, parentIndex, cards, numberOverride, cardAriaLabel } = this.props
    const { cardsPerRow } = this.state
    const numCards = numberOverride ? numberOverride : size(this.props.cards)
    const cardComponents = cards.map(function(item, index) {
      return (
        <Card
          parentIndex={parentIndex}
          key={index}
          item={item}
          index={index}
          numCards={numCards}
          leftAligned={leftAligned}
          cardAriaLabel={cardAriaLabel}
        />
      )
    })

    // this is here to patch up a bug where the cards do not stack properly at certain points in the 'medium' breakpoint section
    window.addEventListener('resize', this.updateCardsPerRow.bind(this))

    const rows = chunk(cardComponents, cardsPerRow)
    return (
      <div className={styles.cardCollection}>
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

CardCollection.propTypes = {
  cardAriaLabel: PropTypes.string,
  cards: PropTypes.array,
  numberOverride: PropTypes.number,
  parentIndex: PropTypes.number,
  leftAligned: PropTypes.bool
}

CardCollection.defaultProps = {
  cards: [],
  numberOverride: null,
  parentIndex: -1,
  leftAligned: false
}

export default CardCollection
