import React from 'react'
import PropTypes from 'prop-types'

import styles from './detail-card-collection.scss'
import { DetailCard } from 'molecules'

class DetailCardCollection extends React.Component {
  renderCard(item, index) {
    return (
      <div
        className={'card-container ' + styles.card}
        data-cy="detail-card-collection-container"
        key={index}
      >
        <DetailCard
          data={item}
          showDetails={this.props.showDetails}
          showBorder={true}
          fieldsToShowInDetails={this.props.fieldsToShowInDetails}
          showDate={this.props.showDate}
        />
      </div>
    )
  }

  renderCards() {
    return this.props.cards.map((card, index) => this.renderCard(card, index))
  }

  render() {
    return (
      <div
        className={'detail-card-collection ' + styles.detailCardCollection}
        data-cy="detail-card-collection"
      >
        {this.renderCards()}
      </div>
    )
  }
}

DetailCardCollection.propTypes = {
  cards: PropTypes.array,
  fieldsToShowInDetails: PropTypes.array
}

DetailCardCollection.defaultProps = {
  showDetails: true,
  fieldsToShowInDetails: [],
  showDate: false
}

export default DetailCardCollection
