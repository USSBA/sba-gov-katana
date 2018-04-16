import React from 'react'
import _ from 'lodash'

import styles from './detail-card-collection.scss'
import { DetailCard } from 'molecules'

class DetailCardCollection extends React.Component {
  renderCard(item, index) {
    return (
      <div className={'card-container ' + styles.card} key={index}>
        <DetailCard
          type={this.props.type}
          data={item}
          showDetails={this.props.showDetails}
          showBorder={false}
          fieldsToShowInDetails={this.props.fieldsToShowInDetails}
        />
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
    return <div className={'document-card-collection ' + styles.cardCollection}>{this.renderCards()}</div>
  }
}

DetailCardCollection.propTypes = {
  cards: React.PropTypes.array,
  fieldsToShowInDetails: React.PropTypes.array
}

DetailCardCollection.defaultProps = {
  showDetails: true,
  fieldsToShowInDetails: []
}

export default DetailCardCollection
