import Promise from 'bluebird'
import React from 'react'
import _ from 'lodash'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { DetailCardCollection } from 'organisms'
import * as ContentActions from '../../../actions/content'
import * as NavigationActions from '../../../actions/navigation'
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

  componentDidMount() {
    const { data: { relatedDocuments }, fetchContentIfNeeded } = this.props

    Promise.all(
      relatedDocuments.map(documentId => {
        return fetchContentIfNeeded('node', `node/${documentId}`)
      })
    ).then(relatedDocumentsData => {
      return this.sortRelatedDocuments(
        relatedDocumentsData
          .map(({ data }) => data)
          // Gracefully handle related documents that have been deleted.
          .filter(data => data)
      )
    })
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
    const sortedDouments = this.state.sortedDocuments
    return _.keys(this.state.sortedDocuments)
      .sort()
      .map((documentType, index) => {
        const documents = sortedDouments[documentType]
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
      <div>
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

function mapDispatchToProps(dispatch) {
  return {
    ...bindActionCreators(NavigationActions, dispatch),
    ...bindActionCreators(ContentActions, dispatch)
  }
}

export default connect(null, mapDispatchToProps)(RelatedDocumentCards)
export { RelatedDocumentCards }
