import React from 'react'
import { Button } from 'atoms'
import { CardCollection } from 'organisms'
import styles from './blog-category-deck.scss'

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
    const { cards, categoryTitle, categorySubtitle, categoryUrl } = this.props

    const cardDeck = cards.map(card => this.reformatCard(card))

    return (
      <div className={styles.container} data-testid={categoryTitle}>
        <h2 data-testid="category title" tabIndex="0">
          {categoryTitle}
        </h2>
        <p data-testid="category subtitle" tabIndex="0">
          {categorySubtitle}
        </p>
        <CardCollection cards={cardDeck} />
        <div className={styles.seeMoreButton}>
          <Button className="see-more-button" data-testid="see more button" primary url={categoryUrl}>
            SEE MORE POSTS
          </Button>
        </div>
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
  categorySubtitle: React.PropTypes.string,
  categoryUrl: React.PropTypes.string
}

export default BlogCategoryDeck
