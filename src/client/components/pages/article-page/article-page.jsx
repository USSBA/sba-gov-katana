import React from 'react'
import { size } from 'lodash'
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
    const { actions: { fetchContentIfNeeded }, location: { pathname } } = this.props

    if (pathname) {
      fetchContentIfNeeded('articles', 'articles', {
        url: pathname
      }).then(result => {
        const { data: { items } } = result

        if (size(items)) {
          const { id } = items[0]
          fetchContentIfNeeded('article', `node/${id}`)
        }
      })
    }
  }

  render() {
    const { article, location: { pathname } } = this.props
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

function mapStateToProps(state, ownProps) {
  const { contentReducer: { article } } = state

  return {
    article,
    location: ownProps.location
  }
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(ContentActions, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ArticlePage)

export { ArticlePage }
