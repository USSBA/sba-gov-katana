import React, { PropTypes } from 'react'
import { compact, findIndex, flatMap, last, nth } from 'lodash'

import styles from './previous-next.scss'
import { Button, Link } from 'atoms'

const businessGuideUrl = '/business-guide'

class PreviousNext extends React.Component {
  render() {
    const previousArticle = this.getPreviousArticle()
    const nextArticle = this.getNextArticle()

    return (
      <div className={styles.previousNext} id="previous-next">
        <div className={`${styles.previous} ${!previousArticle && styles.invisible}`}>
          <h6>Previous</h6>
          {previousArticle && (
            <Link className={styles.button} to={previousArticle.fullUrl}>
              <i className="fa fa-chevron-left" aria-hidden="true" />
              <span>{previousArticle.title}</span>
            </Link>
          )}
        </div>
        <div className={`${styles.next} ${!nextArticle && styles.invisible}`}>
          <h6>Next</h6>
          {nextArticle && (
            <Link className={styles.button} to={nextArticle.fullUrl}>
              <span>{nextArticle.title}</span>
              <i className="fa fa-chevron-right" aria-hidden="true" />
            </Link>
          )}
        </div>
      </div>
    )
  }

  getAdjacentArticle = indexDifference => {
    const { lineage } = this.props

    if (!lineage) {
      return null
    }

    const includeAdjacentSections = lineage[0].fullUrl === businessGuideUrl
    const currentArticle = this.getCurrentArticle(lineage)
    const sections = this.getSections()
    const articles = includeAdjacentSections
      ? this.getArticlesFromSections(sections)
      : nth(lineage, -2).children
    const currentArticleIndex = this.getCurrentArticleIndex(articles, currentArticle)

    if (indexDifference > 0) {
      if (currentArticleIndex < 0 || currentArticleIndex >= articles.length - indexDifference) {
        return null
      }
      return articles[currentArticleIndex + indexDifference]
    } else {
      // indexDifference negative
      if (currentArticleIndex < indexDifference * -1 || currentArticleIndex >= articles.length) {
        return null
      }
      return articles[currentArticleIndex + indexDifference]
    }
  }

  getArticlesFromSections = sections => {
    return compact(flatMap(sections, section => section.children))
  }

  getCurrentArticle = lineage => last(lineage)

  getCurrentArticleIndex = (articles, currentArticle) => {
    return findIndex(
      articles,
      article => article && article.fullUrl && article.fullUrl === currentArticle.fullUrl
    )
  }

  getNextArticle = () => this.getAdjacentArticle(1)

  getPreviousArticle = () => this.getAdjacentArticle(-1)

  getSections = () => {
    const thirdToLast = nth(this.props.lineage, -3)
    return thirdToLast ? thirdToLast.children : null
  }
}

PreviousNext.propTypes = {
  lineage: PropTypes.array.isRequired
}

export default PreviousNext
