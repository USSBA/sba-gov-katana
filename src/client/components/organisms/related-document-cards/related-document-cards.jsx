import React from 'react'
import queryString from 'querystring'
import { filter, isEmpty, keys, uniq } from 'lodash'
import { browserHistory } from 'react-router'

import style from './related-document-cards.scss'
import { DetailCardCollection } from 'organisms'
import { fetchSiteContent } from '../../../fetch-content-helper'
import { logEvent, logPageEvent } from '../../../services/analytics'

class RelatedDocumentCards extends React.Component {
  constructor() {
    super()
    this.state = {
      sortedDocuments: null
    }
  }

  async componentDidMount() {
    const {
      data: { relatedDocuments }
    } = this.props
    let relatedDocumentsData = []

    for (let i = 0; i < relatedDocuments.length; i++) {
      const data = await fetchSiteContent(`node/${relatedDocuments[i]}`)
      relatedDocumentsData.push(data)
    }

    // removes deleted documents
    relatedDocumentsData = relatedDocumentsData.filter(data => data)

    this.sortRelatedDocuments(relatedDocumentsData)
  }

  sortRelatedDocuments(relatedDocuments) {
    if (relatedDocuments) {
      const sortedAndFilteredDocuments = {}
      uniq(
        relatedDocuments.map(relatedDocument => {
          return relatedDocument.documentIdType
        })
        /* eslint-disable-next-line array-callback-return */
      ).map(docType => {
        const filteredDocuments = filter(relatedDocuments, ['documentIdType', docType])
        const sortedDocuments = filteredDocuments.sort((a, b) => {
          return a.title.toLowerCase() > b.title.toLowerCase()
        })
        sortedAndFilteredDocuments[docType] = sortedDocuments
      })
      this.setState({ sortedDocuments: sortedAndFilteredDocuments })
    }
  }

  handleBrowseAll(documentType) {
    const params = { type: documentType }
    const targetLocation = '/document/?' + queryString.stringify(params)
    window.scrollTo(0, 0)
    logPageEvent({ category: 'Browse-all', action: documentType })
    logEvent({
      category: 'Navigation',
      action: 'Location Change',
      label: ''
    })
    browserHistory.push(targetLocation)
  }

  renderRelatedDocumentSections() {
    const { sortedDocuments } = this.state
    return keys(sortedDocuments)
      .sort()
      .map((documentType, index) => {
        const documents = sortedDocuments[documentType]
        return (
          <div className={'related-document-section'} key={index}>
            <div className={'related-document-section-header ' + style.sectionHeader}>
              <h3 className={style.sectionTitle}>{documentType} </h3>
              <a
                className={style.browseAll}
                onClick={() => {
                  return this.handleBrowseAll(documentType)
                }}
              >
                Browse all
              </a>
            </div>
            <div>
              <DetailCardCollection showDetails={false} cards={documents} type={documentType} />
            </div>
          </div>
        )
      })
  }

  render() {
    return (
      <div className={style.container}>
        {!isEmpty(this.state.sortedDocuments) ? (
          <div>
            <h2 className={style.title}>Related documents</h2>
            {this.renderRelatedDocumentSections()}
          </div>
        ) : (
          <div />
        )}
      </div>
    )
  }
}

export default RelatedDocumentCards
