import React from 'react'
import PropTypes from 'prop-types'
import { chunk } from 'lodash'

import s from './card-grid.scss'

class CardGrid extends React.Component {
  renderCard(item, index) {
    return (
      <div className={'card-container ' + s.card} key={index}>
        {this.props.renderCard(item, index)}
      </div>
    )
  }

  renderRow(chunk, index) {
    return (
      <div className={s.cardRow} key={index}>
        {chunk.map(this.renderCard.bind(this))}
      </div>
    )
  }

  renderCards() {
    const chunks = chunk(this.props.cards, 3)
    return chunks.map(this.renderRow.bind(this))
  }

  render() {
    return <div className={'card-grid ' + s.container}>{this.renderCards()}</div>
  }
}

CardGrid.propTypes = {
  cards: PropTypes.arrayOf(PropTypes.object).isRequired,
  renderCard: PropTypes.func.isRequired
}

export default CardGrid
