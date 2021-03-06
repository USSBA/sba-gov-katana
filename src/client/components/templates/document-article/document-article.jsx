import React from 'react'
import { size } from 'lodash'

import styles from './document-article.scss'
import { DocumentArticle, RelatedDocumentCards } from 'organisms'

class DocumentArticleTemplate extends React.Component {
  render() {
    // Use doc instead of document to avoid potential conflicts.
    const { article, document: doc } = this.props

    let data
    if (article) {
      data = article
    } else if (doc) {
      data = doc
    }

    if (!data) {
      return <div />
    }

    return (
      <div data-testid={'document-article-template'}>
        <div className={styles.container}>
          <DocumentArticle data={data} />
        </div>
        {Boolean(size(data.relatedDocuments)) && <RelatedDocumentCards data={data} />}
      </div>
    )
  }
}

export default DocumentArticleTemplate
