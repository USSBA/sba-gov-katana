import React, { Component } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import { includes, isEmpty, size } from 'lodash'
import moment from 'moment'

import styles from './detail-card.scss'
import { DecorativeDash, FileTypeIcon, Label, Link } from 'atoms'
import { ContactCard } from 'molecules'
import { logPageEvent } from '../../../services/analytics.js'
import { getCurrentFile, getFileExtension } from '../../../services/utils.js'

class DetailCard extends React.Component {
  renderDownloadLink() {
    const { data } = this.props
    const latestFile = data && size(data.files) ? getCurrentFile(data.files) : null

    if (latestFile && !isEmpty(latestFile.fileUrl)) {
      const fileExtension = getFileExtension(latestFile.fileUrl)
      return (
        <div className={styles.download}>
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

  renderTable(doc) {
    const { fieldsToShowInDetails } = this.props
    const rows = []

    if (size(doc.activities) && includes(fieldsToShowInDetails, 'Activity')) {
      rows.push({ name: 'Activity:', value: doc.activities.join(', ') })
    }

    if (size(doc.programs) && includes(fieldsToShowInDetails, 'Program')) {
      rows.push({ name: 'Program:', value: doc.programs.join(', ') })
    }

    if (doc.published && includes(fieldsToShowInDetails, 'Published')) {
      const publishedDate = moment.unix(doc.updated).format('MMMM D, YYYY')
      rows.push({ name: 'Published:', value: publishedDate })
    }

    if (size(doc.summary) && includes(fieldsToShowInDetails, 'Summary')) {
      rows.push({ name: 'Summary:', value: doc.summary })
    }

    return (
      <div>
        <table className={styles.programSummaryTableData}>
          <tbody className={styles['program-summary-table']}>
            {rows.map((row, index) => {
              return (
                <tr className={styles['program-summary-data']} key={index}>
                  <td className={styles.columnOne}>
                    <h6>{row.name}</h6>
                  </td>
                  <td className={styles.columnTwo}>{row.value}</td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    )
  }

  render() {
    const doc = this.props.data
    const { data } = this.props
    let showDownloadLink = true

    if (doc) {
      const { category, documents, type: pageType } = doc

      let type
      if (pageType === 'document') {
        type = doc.documentIdType
        showDownloadLink = !(doc.removeDownloadButton === true) //explicit because doc.removeDownloadButton can be false or {}
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
        'detail-card': true,
        [styles.detailCard]: true
      })

      if (pageType === 'person') {
        return (
          <div className={className} data-cy="detail-card">
            <h6>
              <Link data-cy="detail-card-title" to={data.url}>
                {data.name}
              </Link>
            </h6>
            <DecorativeDash width={30} />
            <ContactCard
              border={false}
              email={data.emailAddress}
              office={data.office.name}
              personTitle={data.title}
              phoneNumber={data.phone}
            />
            <Link to={data.url}>See bio</Link>
          </div>
        )
      }

      return (
        <div className={className} data-testid="detail-card">
          <Label type={type} id={!isEmpty(doc.documentIdNumber) ? doc.documentIdNumber : null} small />
          <h6>
            <Link to={doc.url}>{doc.title}</Link>
          </h6>
          <DecorativeDash width={30} />
          {this.props.showDate && doc.updated && (
            <div className={styles.date}>{moment.unix(doc.updated).format('MMMM D, YYYY')}</div>
          )}
          {this.props.showDetails ? this.renderTable(this.props.data) : null}
          {showDownloadLink && this.renderDownloadLink()}
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
    type: PropTypes.oneOf(['article', 'document', 'person'])
  }),

  showBorder: PropTypes.bool,
  showDetails: PropTypes.bool
}

DetailCard.defaultProps = {
  showBorder: true,
  type: 'documents'
}

export default DetailCard
