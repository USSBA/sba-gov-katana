import React from 'react'
import { CardCollection } from 'organisms'

class BlogCategoryDeck extends React.Component {
  reformatCard(card) {
    return {
      link: {
        title: 'Read full post',
        uri: card.url
      },
      subtitleText: card.summary,
      titleText: card.title
    }
  }

  render() {
    const { cards, categoryTitle, categorySubtitle } = this.props

    const cardDeck = cards.map(card => this.reformatCard(card))

    return (
      <div>
        <h2>{categoryTitle}</h2>
        <p>{categorySubtitle}</p>
        <CardCollection cards={cardDeck} />
      </div>
    )
  }
}

BlogCategoryDeck.defaultProps = {
  cards: []
}

BlogCategoryDeck.propTypes = {
  cards: React.PropTypes.array,
  categoryTitle: React.PropTypes.string,
  categorySubtitle: React.PropTypes.string
}

export default BlogCategoryDeck
