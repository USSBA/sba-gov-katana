import React from 'react'
import { basename } from 'path'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import Article from '../../templates/article/article.jsx'
import ErrorPage from '../error-page/error-page.jsx'
import s from './article-page.scss'
import * as ContentActions from '../../../actions/content'
import { getConfig } from '../../../services/client-config'

class ArticlePage extends React.Component {
  constructor() {
    super()
    this.state = {
      loading: false
    }
  }

  componentWillMount() {
    const { actions: { fetchContentIfNeeded }, location: { pathname } } = this.props

    const url = config.get('urlRedirect') ? pathname : basename(pathname)

    if (pathname) {
      fetchContentIfNeeded('articles', 'articles', { url })
    }
  }

  render() {
    const { article, location: { pathname } } = this.props
    if (pathname && document !== null) {
      if (article) {
        return <Article article={article} />
      } else {
        return <div>Loading Article...</div>
      }
    } else {
      return <ErrorPage />
    }
  }
}

function mapReduxStateToProps(reduxState, ownProps) {
  const { contentReducer: { articles } } = reduxState

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

export default connect(mapReduxStateToProps, mapDispatchToProps)(ArticlePage)
