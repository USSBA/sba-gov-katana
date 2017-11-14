import React from 'react'
import s from './article-page.scss'
import * as ContentActions from '../../../actions/content.js'
import ErrorPage from '../error-page/error-page.jsx'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import Article from '../../templates/article/article.jsx'

class ArticlePage extends React.Component {
  constructor() {
    super()
    this.state = {
      loading: false
    }
  }

  componentWillMount() {
    let url = this.props.url
    if (url) {
      this.props.actions.fetchContentIfNeeded('articles', 'articles', {
        url: url
      })
    }
  }

  render() {
    if (this.props.url && this.props.article !== null) {
      if (this.props.article) {
        return <Article article={this.props.article} />
      } else {
        return <div>Loading Article....</div>
      }
    } else {
      return <ErrorPage />
    }
  }
}

ArticlePage.defaultProps = {
  url: {}
}

function mapReduxStateToProps(reduxState, ownProps) {
  let articleStoreValue = reduxState.contentReducer['articles']
  if (articleStoreValue && articleStoreValue.count === 0) {
    return { article: null }
  } else if (
    articleStoreValue &&
    articleStoreValue.items &&
    articleStoreValue.items.length > 0
  ) {
    return { article: articleStoreValue.items[0] }
  } else {
    return {}
  }
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(ContentActions, dispatch)
  }
}

export default connect(mapReduxStateToProps, mapDispatchToProps)(ArticlePage)
