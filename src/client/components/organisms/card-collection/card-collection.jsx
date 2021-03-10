import React from 'react'
import PropTypes from 'prop-types'
import { isEmpty } from 'lodash'
import breakpoints from '../../../styles/base/_variables.scss'
import styles from './card-collection.scss'
import { Card } from 'molecules'

const cardsPerRowMap = {
  '1': { full: [1], tablet: [1], mobile: [1] }, //2
  '2': { full: [2], tablet: [2], mobile: [1, 1] }, //2
  '3': { full: [3], tablet: [3], mobile: [1, 1, 1] }, //3,
  '4': { full: [4], tablet: [2, 2], mobile: [1, 1, 1, 1] }, //4,
  '5': { full: [3, 2], tablet: [3, 2], mobile: [1, 1, 1, 1, 1] }, //3,
  '6': { full: [3, 3], tablet: [3, 3], mobile: [1, 1, 1, 1, 1, 1] }, //6,
  '7': { full: [4, 3], tablet: [3, 3, 1], mobile: [1, 1, 1, 1, 1, 1, 1] }, //4,
  '8': { full: [4, 4], tablet: [2, 2, 2, 2], mobile: [1, 1, 1, 1, 1, 1, 1, 1] }, //4,
  '9': { full: [3, 3, 3], tablet: [3, 3, 3], mobile: [1, 1, 1, 1, 1, 1, 1, 1, 1] }, //4,
  '10': { full: [3, 3, 3, 1], tablet: [3, 3, 3, 1], mobile: [1, 1, 1, 1, 1, 1, 1, 1, 1, 1] }, //4,
  '11': { full: [3, 3, 3, 2], tablet: [3, 3, 3, 2], mobile: [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1] }, //4,
  '12': { full: [3, 3, 3, 3], tablet: [3, 3, 3, 3], mobile: [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1] } //4,
}

const medium = parseInt(breakpoints.breakpointMedium, 10)
const large = parseInt(breakpoints.breakpointLarge, 10)

class CardCollection extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      cardsPerRow: []
    }
  }

  componentDidMount() {
    if (!isEmpty(this.props.cards)) {
      this.setState(
        {
          cardsPerRow: cardsPerRowMap[this.props.cards.length].full
        },
        () => {
          this.updateCardsPerRow()
        }
      )
    }
  }

  updateCardsPerRow() {
    const viewportWidth = Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0)

    const cardsLength = cardsPerRowMap[this.props.cards.length]

    if (cardsLength) {
      if (viewportWidth >= medium && viewportWidth < large) {
        this.setState({ cardsPerRow: cardsLength.tablet })
      } else if (viewportWidth < medium) {
        this.setState({ cardsPerRow: cardsLength.mobile })
      } else {
        this.setState({ cardsPerRow: cardsLength.full })
      }
    }
  }

  render() {
    const { leftAligned, parentIndex, cards, numberOverride, cardAriaLabel } = this.props
    const { cardsPerRow } = this.state

    // this is here to patch up a bug where the cards do not stack properly at certain points in the 'medium' breakpoint section
    window.addEventListener('resize', this.updateCardsPerRow.bind(this))

    let currentCardIndex = 0
    const rows = cardsPerRow.map(function(count) {
      const row = []
      let i

      for (i = 0; i < count; i++) {
        row.push(
          <Card
            parentIndex={parentIndex}
            key={currentCardIndex}
            item={cards[currentCardIndex]}
            index={currentCardIndex}
            numCards={count}
            leftAligned={leftAligned}
            cardAriaLabel={cardAriaLabel}
          />
        )
        currentCardIndex++
      }
      return row
    })
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
