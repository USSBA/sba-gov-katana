import React from 'react'
import { size } from 'lodash'

import DocumentArticle from '../../templates/document-article/document-article.jsx'
import ErrorPage from '../error-page/error-page.jsx'
import styles from './document-page.scss'
import { Loader } from 'atoms'
import { fetchSiteContent } from '../../../fetch-content-helper'

class DocumentPage extends React.Component {
  constructor() {
    super()
    this.state = {
      loading: false
    }
  }

  async componentDidMount() {
    const { location: { pathname } } = this.props
    await this.fetchDocument(pathname)
  }

  async componentWillReceiveProps(nextProps) {
    const { location: { pathname } } = this.props
    const { location: { pathname: nextPathname } } = nextProps

    // Re-render the page with new document data when we remain on `/documents`
    // and the DocumentPage but the location has changed.
    if (pathname !== nextPathname) {
      await this.fetchDocument(nextPathname)
    }
  }

  render() {
    const { location: { pathname } } = this.props
    const { document } = this.state

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

  async fetchDocument(pathname) {
    if (pathname) {
      try {
        const { data: { items } } = await fetchSiteContent('documents', 'documents', {
          url: pathname
        })

        if (size(items)) {
          const { id } = items[0]
          const { data: document } = await fetchSiteContent('document', `node/${id}`)
          this.setState({ document })
        }
      } catch (e) {
        console.error(e)
      }
    }
  }
}

export default DocumentPage
