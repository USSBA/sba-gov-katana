import React from 'react'

import DocumentArticle from '../../templates/document-article/document-article.jsx'
import ErrorPage from '../error-page/error-page.jsx'
import styles from './document-page.scss'
import { Loader } from 'atoms'
import { fetchRestContent } from '../../../fetch-content-helper'

class DocumentPage extends React.Component {
  constructor() {
    super()
    this.state = {
      isLoading: true,
      document: null
    }
  }

  async componentDidMount() {
    const document = await fetchRestContent(this.props.id)
    this.setState({ isLoading: false, document })
  }

  render() {
    const { document, isLoading } = this.state

    if (isLoading) {
      return (
        <div className={styles.container}>
          <Loader />
        </div>
      )
    } else if (document) {
      return <DocumentArticle document={document} />
    } else {
      return <ErrorPage />
    }
  }
}

export default DocumentPage
