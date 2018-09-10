import React from 'react'
import { size } from 'lodash'

import DocumentArticle from '../../templates/document-article/document-article.jsx'
import ErrorPage from '../error-page/error-page.jsx'
import styles from './article-page.scss'
import { Loader } from 'atoms'
import { fetchSiteContent } from '../../../fetch-content-helper'

class ArticlePage extends React.Component {
  constructor() {
    super()
    this.state = {
      loading: false
    }
  }

  async componentDidMount() {
    const { location: { pathname } } = this.props

    if (pathname) {
      try {
        const { data: { items } } = await fetchSiteContent('articles', 'articles', {
          url: pathname
        })

        if (size(items)) {
          const { id } = items[0]
          const { data: article } = await fetchSiteContent('article', `node/${id}`)
          this.setState({ article })
        }
      } catch (e) {
        console.error(e)
      }
    }
  }

  render() {
    const { location: { pathname } } = this.props
    const { article } = this.state

    if (pathname && article !== null) {
      if (article) {
        return <DocumentArticle article={article} />
      } else {
        return (
          <div className={styles.container}>
            <Loader />
          </div>
        )
      }
    } else {
      return <ErrorPage />
    }
  }
}

export default ArticlePage
export { ArticlePage }
