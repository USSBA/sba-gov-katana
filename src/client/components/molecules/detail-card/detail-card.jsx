import React from 'react'
import classNames from 'classnames'
import { includes, isEmpty, isObject, size } from 'lodash'

import s from './detail-card.scss'
import { DecorativeDash, Label, Link, PdfIcon } from 'atoms'
import { logPageEvent } from '../../../services/analytics.js'
import { getCurrentFile } from '../../../services/utils.js'

class DetailCard extends React.Component {
  getLatestFile() {
    if (this.props.data && this.props.data.files) {
      return getCurrentFile(this.props.data.files)
    } else {
      return null
    }
  }

  getFileTypeIcon(fileExtension) {
    if (fileExtension == 'pdf') {
      console.log('filetypeicon called')
      return <PdfIcon />
    } else {
      return undefined
    }
  }

  makeDownloadLink() {
    const latestFile = this.getLatestFile()
    if (latestFile && !isEmpty(latestFile.fileUrl)) {
      const fileExtension = latestFile.fileUrl.substr(latestFile.fileUrl.lastIndexOf('.') + 1).toLowerCase()
      return (
        <div className={'document-card-download ' + s.download}>
          <Link
            onClick={() => {
              window.open(latestFile.fileUrl, '_blank')
            }}
            to={latestFile.fileUrl}
          >
            Download {fileExtension}
          </Link>
          {this.getFileTypeIcon(fileExtension)}
        </div>
      )
    } else {
      return undefined
    }
  }

  makeTable(doc) {
    const rows = []
    if (size(doc.activities) && includes(this.props.fieldsToShowInDetails, 'Activity')) {
      rows.push({ name: 'Activity:', value: doc.activities.join(', ') })
    }
    if (size(doc.programs) && includes(this.props.fieldsToShowInDetails, 'Program')) {
      rows.push({ name: 'Program:', value: doc.programs.join(', ') })
    }

    if (doc.published && includes(this.props.fieldsToShowInDetails, 'Published')) {
      const publishedDate = new Date(doc.updated)
      const publisheDateString =
        publishedDate.getMonth() + '/' + publishedDate.getDate() + '/' + publishedDate.getYear()
      rows.push({ name: 'Published:', value: publisheDateString })
    }
    if (size(doc.summary) && includes(this.props.fieldsToShowInDetails, 'Summary')) {
      rows.push({ name: 'Summary:', value: doc.summary })
    }

    return (
      <div>
        <div className={s.dash}>
          <DecorativeDash />
        </div>
        <table className={s.programSummaryTableData}>
          <tbody className={s['program-summary-table']}>
            {rows.map((row, index) => {
              return (
                <tr className={s['program-summary-data']} key={index}>
                  <td className={s.columnOne}>
                    <h6>{row.name}</h6>
                  </td>
                  <td className={s.columnTwo}>{row.value}</td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    )
  }

  makeTitle() {
    const doc = this.props.data
    const eventConfig = {
      category: 'Document-Download-Module',
      action: `docname - ${doc.title}: Document Landing Page`
    }
    return (
      <Link to={doc.url}>
        <h6 className={'document-card-title ' + s.title}>{doc.title}</h6>
      </Link>
    )
  }

  render() {
    const doc = this.props.data
    if (doc) {
      const { category, documents, type: pageType } = doc

      let type
      if (pageType === 'document') {
        type = doc.documentIdType
      } else if (pageType === 'article' && category) {
        type = category[0]
      }

      const idData = size(documents)
        ? doc.documents[0]
        : {
            idType: 'UNK',
            number: 'UNK'
          }

      const { showBorder } = this.props

      const className = classNames({
        'document-card-container': true,
        [s.container]: showBorder,
        [s.containerWithoutBorder]: !showBorder
      })

      return (
        <div className={className}>
          <div>
            <div className={s.documentTypeContainer}>
              <Label type={type} id={!isEmpty(doc.documentIdNumber) && doc.documentIdNumber} small />
            </div>
            <div />
            {this.makeTitle()}
            {this.props.showDetails ? this.makeTable(this.props.data) : null}
          </div>
          {this.makeDownloadLink()}
        </div>
      )
    } else {
      return <div />
    }
  }
}

DetailCard.propTypes = {
  showBorder: React.PropTypes.bool,
  type: React.PropTypes.string.isRequired
}

DetailCard.defaultProps = {
  showBorder: true,
  type: 'documents'
}

export default DetailCard
