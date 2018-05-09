import React from 'react'

import styles from './document-article.scss'
import { VersionsList } from 'atoms'
import { DocumentArticle, RelatedDocumentCards } from 'organisms'
import { logPageEvent } from '../../../services/analytics.js'

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

    if (!data) return <div />
    console.log('ONE', data)
    return (
      <div>
        <div className={styles.container}>
          <DocumentArticle data={data} type={doc ? 'document' : 'article'} />
          {doc && <VersionsList doc={data} />}
        </div>
        {data.relatedDocuments.length > 0 && <RelatedDocumentCards data={data} />}
      </div>
    )
  }
}

export default DocumentArticleTemplate
