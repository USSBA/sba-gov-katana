import React from 'react'
import _ from 'lodash'

import styles from './card-grid.scss'

class CardGrid extends React.Component {
  renderCard(item, index) {
    return (
      <div className={'card-container ' + styles.card} key={index}>
        {this.props.renderCard(item, index)}
      </div>
    )
  }

  renderRow(chunk, index) {
    return (
      <div className={styles.cardRow} key={index}>
        {chunk.map(this.renderCard.bind(this))}
      </div>
    )
  }

  renderCards() {
    const chunks = _.chunk(this.props.cards, 3)
    return chunks.map(this.renderRow.bind(this))
  }

  render() {
    return <div className={'card-grid ' + styles.container}>{this.renderCards()}</div>
  }
}
export default CardGrid
