import React from 'react'
import _ from 'lodash'
import { DetailCardCollection } from 'organisms'
import { fetchSiteContent } from '../../../fetch-content-helper'
import queryString from 'querystring'
import { logPageEvent } from '../../../services/analytics'
import s from './related-document-cards.scss'

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
    const relatedDocumentsData = []

    for (let i = 0; i < relatedDocuments.length; i++) {
      let data = await fetchSiteContent(`node/${relatedDocuments[i]}`)
      relatedDocumentsData.push(data)
    }

    this.sortRelatedDocuments(relatedDocumentsData)
  }

  sortRelatedDocuments(relatedDocuments) {
    if (relatedDocuments) {
      const sortedAndFilteredDocuments = {}
      _.uniq(
        relatedDocuments.map(relatedDocument => {
          return relatedDocument.documentIdType
        })
      ).map(docType => {
        const filteredDocuments = _.filter(relatedDocuments, ['documentIdType', docType])
        const sortedDocuments = filteredDocuments.sort((a, b) => {
          return a.title.toLowerCase() > b.title.toLowerCase()
        })
        sortedAndFilteredDocuments[docType] = sortedDocuments
      })
      this.setState({ sortedDocuments: sortedAndFilteredDocuments })
    }
  }

  handleBrowseAll(documentType) {
    const { locationChange } = this.props
    logPageEvent({ category: 'Browse-all', action: documentType })
    const params = { type: documentType }
    locationChange('/document/?' + queryString.stringify(params))
  }

  renderRelatedDocumentSections() {
    const sortedDocuments = this.state.sortedDocuments
    return _.keys(sortedDocuments)
      .sort()
      .map((documentType, index) => {
        const documents = sortedDocuments[documentType]
        return (
          <div className={'related-document-section'} key={index}>
            <div className={'related-document-section-header ' + s.sectionHeader}>
              <h3 className={s.sectionTitle}>{documentType} </h3>
              <a
                className={s.browseAll}
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
      <div className={s.container}>
        {!_.isEmpty(this.state.sortedDocuments) ? (
          <div>
            <h2 className={s.title}>Related documents</h2>
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
