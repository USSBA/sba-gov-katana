import React from 'react'
import DocumentArticle from '../../templates/document-article/document-article.jsx'
import ErrorPage from '../error-page/error-page.jsx'
import styles from './article-page.scss'
import { Loader } from 'atoms'
import { fetchRestContent } from '../../../fetch-content-helper'

class ArticlePage extends React.Component {
  constructor() {
    super()
    this.state = {
      loading: false
    }
  }

  async componentDidMount() {
    const article = await fetchRestContent(this.props.id)
    this.setState({ article })
  }

  render() {
    const {
      location: { pathname }
    } = this.props
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
