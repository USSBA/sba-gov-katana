import React, { PropTypes } from 'react'
import { compact, findIndex, flatMap, last, nth } from 'lodash'

import styles from './previous-next.scss'
import { Button, Link } from 'atoms'
import { TRANSLATIONS } from '../../../translations.js'

class PreviousNext extends React.Component {
  render() {
    const { langCode } = this.props
    const { next, previous } = TRANSLATIONS
    const previousArticle = this.getArticle(-1, langCode)
    const nextArticle = this.getArticle(1, langCode)

    return (
      <div className={styles.previousNext} id="previous-next">
        <div className={`${styles.previous} ${!previousArticle && styles.invisible}`}>
          <h6>{previous[langCode].text}</h6>
          {previousArticle && (
            <Link className={styles.button} to={previousArticle.fullUrl}>
              <i className="fa fa-chevron-left" aria-hidden="true" />
              <span>{previousArticle.title}</span>
            </Link>
          )}
        </div>
        <div className={`${styles.next} ${!nextArticle && styles.invisible}`}>
          <h6>{next[langCode].text}</h6>
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

  getAdjacentArticle = (indexDifference, langCode) => {
    const { lineage } = this.props

    if (!lineage) {
      return null
    }

    const businessGuideUrl = langCode === 'es' ? '/guia-de-negocios' : '/business-guide'
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

  getArticle = (articlePosition, langCode) => {
    const articleData = this.getAdjacentArticle(articlePosition, langCode)

    if (articleData) {
      let fullUrl = articleData.fullUrl
      let title = articleData.title

      if (articleData.spanishTranslation && langCode === 'es') {
        const { spanishTranslation } = articleData
        fullUrl = spanishTranslation.fullUrl
        title = spanishTranslation.title
      }
      return { fullUrl, title }
    }
  }

  getSections = () => {
    const thirdToLast = nth(this.props.lineage, -3)
    return thirdToLast ? thirdToLast.children : null
  }
}

PreviousNext.propTypes = {
  lineage: PropTypes.array.isRequired
}

PreviousNext.defaultProps = {
  langCode: 'en'
}

export default PreviousNext
