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

  async componentDidMount() {
    const { officeId } = this.props
    const { items } = await fetchSiteContent('articles', {
      // office: officeId,
      // articleCategory: 'News Releases',
      start: 0,
      end: 3
    })
    const articles = items
    this.setState({ articles })
  }

  render() {
    const { articles } = this.state
    const{ officeId } = this.props
    const articleLink = `/article?office=${officeId}&articleCategory=News Releases`

    return (
      <div>
        {articles.length > 0 && (
          <div className={styles.newsReleases}>
            <h2>News Releases</h2>
            <DetailCardCollection
              type={'articles'}
              cards={articles}
              fieldsToShowInDetails={['Program', 'Published', 'Summary']}
            />
            <div className={styles.button} data-testid="news-button">
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
  officeId: PropTypes.number
}

export default NewsReleases
