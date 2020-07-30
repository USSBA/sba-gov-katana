import React from 'react'
import PropTypes from 'prop-types'
import { DetailCardCollection } from 'organisms'
import { Button } from 'atoms'
import { fetchSiteContent } from '../../../fetch-content-helper'
import styles from './news-releases.scss'

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
      sortBy: 'Authored on Date',
      start: 0,
      end: 3
    }

    // if these optional props were passed in, then add them as query params
    officeId && (queryParams.relatedOffice = officeId) && (queryParams.office = officeId)
    national && (queryParams.national = national)
    region && (queryParams.region = region)

    return queryParams
  }

  async componentDidMount() {
    const queryParams = this.buildArticleQueryParams()
    const { items } = await fetchSiteContent('articles', queryParams)
    this.setState({ articles: items })
  }

  render() {
    const { articles } = this.state
    const { officeId } = this.props
    const articleLink = `/article?office=${officeId}&relatedOffice=${officeId}`

    return (
      <div>
        {articles && articles.length > 0 && (
          <div className={styles.newsReleases} data-testid="news-cards">
            <h2>News releases</h2>
            <DetailCardCollection
              type={'article'}
              cards={articles}
              fieldsToShowInDetails={['Published']}
              showDate={true}
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

export default NewsReleases
