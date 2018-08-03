import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import DocumentArticle from '../../templates/document-article/document-article.jsx'
import ErrorPage from '../error-page/error-page.jsx'
import styles from './article-page.scss'
import * as ContentActions from '../../../actions/content.js'
import { Loader } from 'atoms'

class ArticlePage extends React.Component {
  constructor() {
    super()
    this.state = {
      loading: false
    }
  }

  componentWillMount() {
    const {
      actions: { fetchContentIfNeeded },
      location: { pathname }
    } = this.props

    if (pathname) {
      fetchContentIfNeeded('articles', 'articles', {
        url: pathname
      })
    }
  }

  render() {
    const {
      article,
      location: { pathname }
    } = this.props
    if (pathname && document !== null) {
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

function mapReduxStateToProps(reduxState, ownProps) {
  const {
    contentReducer: { articles }
  } = reduxState

  let articleProp = {}
  if (articles) {
    const { items } = articles
    if (articles.count === 0) {
      articleProp = {
        article: null
      }
    } else if (items && items.length > 0) {
      articleProp = {
        article: items[0]
      }
    }
  }

  return {
    ...articleProp,
    location: ownProps.location
  }
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(ContentActions, dispatch)
  }
}

export default connect(
  mapReduxStateToProps,
  mapDispatchToProps
)(ArticlePage)

export { ArticlePage }
