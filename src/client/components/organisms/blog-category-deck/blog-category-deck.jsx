import React from 'react'
import { CardCollection } from 'organisms'

class BlogCategoryDeck extends React.Component {
  constructor() {
    super()
    this.state = {}
  }
  render() {
    const cardDeck = this.props.cards.slice(0, 2)
    return <CardCollection cards={cardDeck} />
  }
}

BlogCategoryDeck.defaultProps = {
  cards: []
}

BlogCategoryDeck.propTypes = {
  cards: React.PropTypes.array
}

export default BlogCategoryDeck
