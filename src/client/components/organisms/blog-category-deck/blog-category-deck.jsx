import React from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'

import { Button } from 'atoms'
import { CardCollection } from 'organisms'
import styles from './blog-category-deck.scss'

class BlogCategoryDeck extends React.Component {
  reformatCard(card) {
    return {
      italicText: moment.unix(card.created).format('MMMM D, YYYY'),
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
        <h2 className={styles.title} data-testid="category-title" tabIndex="0">
          {categoryTitle}
        </h2>
        <p className={styles.subtitle} data-testid="category-subtitle" tabIndex="0">
          {categorySubtitle}
        </p>
        <CardCollection cards={cardDeck} cardAriaLabel="latest blog post" />
        <div className={styles.seeMoreButton}>
          <Button data-testid="see more button" primary url={categoryUrl}>
            See more posts
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
  cards: PropTypes.array,
  categoryTitle: PropTypes.string,
  categorySubtitle: PropTypes.string,
  categoryUrl: PropTypes.string
}

export default BlogCategoryDeck
