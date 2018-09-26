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

  renderReferenceLink() {
    const latestFile = this.getLatestFile()
    let link

    if (latestFile && !isEmpty(latestFile.fileUrl)) {
      link = (
        <div className={'document-card-download ' + s.download}>
          <Link
            onClick={() => {
              window.open(latestFile.fileUrl, '_blank')
            }}
            to={latestFile.fileUrl}
          >
            Download PDF
          </Link>
          <PdfIcon />
        </div>
      )
    } else if (this.props.data.type === 'person') {
      link = (
        <div className={'bio-link ' + s.download}>
          <Link to={'/business-guide'}>See Bio</Link>
        </div>
      )
    } else {
      link = undefined
    }
    return link
  }

  makeTable(item) {
    const { fieldsToShowInDetails } = this.props
    const rows = []

    // Documents and Articles objects
    if (size(item.activities) && includes(fieldsToShowInDetails, 'Activity')) {
      rows.push({ name: 'Activity:', value: item.activities.join(', ') })
    }
    if (size(item.programs) && includes(fieldsToShowInDetails, 'Program')) {
      rows.push({ name: 'Program:', value: item.programs.join(', ') })
    }

    if (item.published && includes(fieldsToShowInDetails, 'Published')) {
      const publishedDate = new Date(item.updated)
      const publisheDateString =
        publishedDate.getMonth() + '/' + publishedDate.getDate() + '/' + publishedDate.getYear()
      rows.push({ name: 'Published:', value: publisheDateString })
    }
    if (size(item.summary) && includes(fieldsToShowInDetails, 'Summary')) {
      rows.push({ name: 'Summary:', value: item.summary })
    }

    // People object
    if (size(item.title) && includes(fieldsToShowInDetails, 'Title')) {
      rows.push({ name: <i className={'fa fa-user ' + s.fa} />, value: item.title })
    }
    if (size(item.office) && includes(fieldsToShowInDetails, 'Office')) {
      rows.push({
        name: <i className={'fa fa-building ' + s.fa} />,
        value: <Link to={'/business-guide'}>{item.office}</Link>
      })
    }
    if (size(item.phone) && includes(fieldsToShowInDetails, 'Phone')) {
      const phoneNum = item.phone.split('-')
      const phoneNumWithParentheses = `(${phoneNum[0]}) ${phoneNum[1]}-${phoneNum[2]}`
      rows.push({
        name: <i className={'fa fa-phone ' + s.fa} />,
        value: <Link to={`tel:${phoneNumWithParentheses}`}>{phoneNumWithParentheses}</Link>
      })
    }
    if (size(item.emailAddress) && includes(fieldsToShowInDetails, 'Email')) {
      rows.push({
        name: <i className={'fa fa-envelope ' + s.fa} />,
        value: <Link to={`mailto:${item.emailAddress}`}>{item.emailAddress}</Link>
      })
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
    const item = this.props.data

    if (item.type === 'person') {
      return (
        <Link to={'/person-link'}>
          <h6 className={'document-card-title ' + s.title}>{item.name}</h6>
        </Link>
      )
    } else {
      return (
        <Link to={item.url}>
          <h6 className={'document-card-title ' + s.title}>{item.title}</h6>
        </Link>
      )
    }
  }

  render() {
    const item = this.props.data
    if (item) {
      const { category, documents, type: pageType } = item

      let type
      if (pageType === 'document') {
        type = item.documentIdType
      } else if (pageType === 'article' && category) {
        type = category[0]
      }

      const idData = size(documents)
        ? item.documents[0]
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
              {!isEmpty(type) && (
                <Label type={type} id={!isEmpty(item.documentIdNumber) && item.documentIdNumber} small />
              )}
            </div>
            <div />
            {this.makeTitle()}
            {this.props.showDetails ? this.makeTable(item) : null}
          </div>
          {this.renderReferenceLink()}
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
