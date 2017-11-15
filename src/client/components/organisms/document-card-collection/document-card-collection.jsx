import React from 'react'
import _ from 'lodash'

import styles from './document-card-collection.scss'
import { DocumentCard } from 'molecules'

class DocumentCardCollection extends React.Component {
  renderCard(item, index) {
    return (
      <div className={'card-container ' + styles.card} key={index}>
        <DocumentCard
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
    return (
      <div className={'document-card-collection ' + styles.cardCollection}>
        {this.renderCards()}
      </div>
    )
  }
}

DocumentCardCollection.propTypes = {
  cards: React.PropTypes.array,
  fieldsToShowInDetails: React.PropTypes.array
}

DocumentCardCollection.defaultProps = {
  showDetails: true,
  fieldsToShowInDetails: []
}

export default DocumentCardCollection
