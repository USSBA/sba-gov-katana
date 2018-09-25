import React from 'react'
import _ from 'lodash'

import styles from './detail-card-collection.scss'
import { DetailCard, PeopleDetailCard } from 'molecules'

class DetailCardCollection extends React.Component {
  renderCard(item, index) {
    if (this.props.type === 'person') {
      return (
        <div className={'card-container ' + styles.card} key={index}>
          <PeopleDetailCard data={item} showDetails={this.props.showDetails} showBorder={true} />
        </div>
      )
    } else {
      return (
        <div className={'card-container ' + styles.card} key={index}>
          <DetailCard
            data={item}
            showDetails={this.props.showDetails}
            showBorder={false}
            fieldsToShowInDetails={this.props.fieldsToShowInDetails}
          />
        </div>
      )
    }
  }

  renderCards() {
    return this.props.cards.map((card, index) => this.renderCard(card, index))
  }

  render() {
    return (
      <div className={'document-card-collection ' + styles.detailCardCollection}>{this.renderCards()}</div>
    )
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
