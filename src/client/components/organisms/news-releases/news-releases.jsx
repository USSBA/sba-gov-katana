import React from 'react'
import PropTypes from 'prop-types'
import { DetailCardCollection } from 'organisms'
import { Button } from 'atoms'
import { fetchSiteContent } from '../../../fetch-content-helper'
import styles from './news-releases.scss'

// This function remaps cloudsearch's schema to a schema that Katana is already using for articles
function remapArticlesToBetterSchema(articles) {
  const remappedArticles = []
  for (let i = 0; i < articles.length; i++) {
    const { fields } = articles[i]
    const remappedArticle = {
      id: Number(articles[i].id),
      category: fields.article_category ? fields.article_category : [],
      office: fields.office ? Number(fields.office[0]) : {},
      programs: fields.article_programs ? fields.article_programs : [],
      region: fields.region ? fields.region : [],
      relatedOffices: fields.related_offices ? fields.related_offices.map(office => Number(office)) : [],
      summary: fields.summary ? fields.summary[0] : '',
      type: 'article',
      title: fields.title ? fields.title[0] : '',
      created: fields.created ? Number(fields.created[0]) : {},
      updated: fields.updated ? Number(fields.updated[0]) : {},
      url: fields.url ? fields.url[0] : ''
    }

    remappedArticles.push(remappedArticle)
  }
  return remappedArticles
}

class NewsReleases extends React.Component {
  constructor() {
    super()
    this.state = {
      articles: []
    }
  }

  buildArticleQueryParams() {
    const { officeId, national, region } = this.props

    const queryParams = {
      // mode: 'districtOffice' utilizes content api's feature flag to find articles via cloudsearch
      // when/if the content api combines search functionality for articles into one place,
      // then this query param can be removed
      mode: 'districtOffice',
      articleCategory: 'Press release',
      sortBy: 'Last Updated',
      start: 0,
      end: 3
    }

    // if these optional props were passed in, then add them as query params
    officeId && (queryParams.relatedOffice = officeId)
    national && (queryParams.national = national)
    region && (queryParams.region = region)

    return queryParams
  }

  async componentDidMount() {
    let articles = []

    const queryParams = this.buildArticleQueryParams()
    const { items, count } = await fetchSiteContent('articles', queryParams)

    if (count > 0) {
      articles = remapArticlesToBetterSchema(items)
    }

    this.setState({ articles })
  }

  render() {
    const { articles } = this.state
    const { officeId } = this.props
    const articleLink = `/article?office=${officeId}&articleCategory=Press release`

    return (
      <div>
        {articles && articles.length > 0 && (
          <div className={styles.newsReleases} data-testid="news-cards">
            <h2>News releases</h2>
            <DetailCardCollection
              type={'article'}
              cards={articles}
              fieldsToShowInDetails={['Published', 'Summary']}
            />
            <div className={styles.button} data-testid="news-more-button">
              <a href={articleLink}>
                <Button primary>View All</Button>
              </a>
            </div>
          </div>
        )}
      </div>
    )
  }
}

NewsReleases.propTypes = {
  officeId: PropTypes.number,
  national: PropTypes.bool,
  region: PropTypes.string
}

// for testing purposes
export { remapArticlesToBetterSchema }

export default NewsReleases
