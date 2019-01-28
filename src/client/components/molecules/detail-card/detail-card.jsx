import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import { includes, isEmpty, size } from 'lodash'

import style from './detail-card.scss'
import { DecorativeDash, FileTypeIcon, Label, Link } from 'atoms'
import { logPageEvent } from '../../../services/analytics.js'
import { getCurrentFile, getFileExtension } from '../../../services/utils.js'

class DetailCard extends React.Component {
  getLatestFile() {
    if (this.props.data && this.props.data.files) {
      return getCurrentFile(this.props.data.files)
    } else {
      return null
    }
  }

  makeDownloadLink() {
    const latestFile = this.getLatestFile()
    if (latestFile && !isEmpty(latestFile.fileUrl)) {
      const fileExtension = getFileExtension(latestFile.fileUrl)
      return (
        <div className={'document-card-download ' + style.download}>
          <Link
            onClick={() => {
              window.open(latestFile.fileUrl, '_blank')
            }}
          >
            {fileExtension ? 'Download ' + fileExtension : 'Download'}
          </Link>
          {fileExtension && <FileTypeIcon fileExtension={fileExtension} />}
        </div>
      )
    } else {
      return null
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
        <div className={style.dash}>
          <DecorativeDash />
        </div>
        <table className={style.programSummaryTableData}>
          <tbody className={style['program-summary-table']}>
            {rows.map((row, index) => {
              return (
                <tr className={style['program-summary-data']} key={index}>
                  <td className={style.columnOne}>
                    <h6>{row.name}</h6>
                  </td>
                  <td className={style.columnTwo}>{row.value}</td>
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
        <h6 className={'document-card-title ' + style.title}>{doc.title}</h6>
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
        [style.container]: showBorder,
        [style.containerWithoutBorder]: !showBorder
      })

      return (
        <div className={className}>
          <div>
            <div className={style.documentTypeContainer}>
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
  data: PropTypes.shape({
    documentIdType: PropTypes.string,
    category: PropTypes.array,
    type: PropTypes.oneOf(['article', 'document'])
  }),
  showBorder: PropTypes.bool,
  showDetails: PropTypes.bool
}

DetailCard.defaultProps = {
  showBorder: true,
  type: 'documents'
}

export default DetailCard
