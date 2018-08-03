import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import DocumentArticle from '../../templates/document-article/document-article.jsx'
import ErrorPage from '../error-page/error-page.jsx'
import styles from './document-page.scss'
import * as ContentActions from '../../../actions/content.js'
import { Loader } from 'atoms'

class DocumentPage extends React.Component {
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
      fetchContentIfNeeded('documents', 'documents', {
        url: pathname
      })
    }
  }

  componentWillReceiveProps(nextProps) {
    const {
      actions: { fetchContentIfNeeded },
      location: { pathname }
    } = this.props
    const {
      location: { pathname: nextPathname }
    } = nextProps

    // Re-render the page with new document data when we remain on `/documents`
    // and the DocumentPage but the location has changed.
    if (pathname !== nextPathname) {
      fetchContentIfNeeded('documents', 'documents', {
        url: nextPathname
      })
    }
  }

  render() {
    const {
      document,
      location: { pathname }
    } = this.props
    if (pathname && document !== null) {
      if (document) {
        return <DocumentArticle document={document} />
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
    contentReducer: { documents }
  } = reduxState

  let documentProp = {}
  if (documents) {
    const { items } = documents
    if (documents.count === 0) {
      documentProp = {
        document: null
      }
    } else if (items && items.length > 0) {
      documentProp = {
        document: items[0]
      }
    }
  }

  return {
    ...documentProp,
    // must map router location to props here so that props and nextProps
    // differ when location has changed
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
)(DocumentPage)
