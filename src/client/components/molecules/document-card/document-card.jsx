import React from 'react'
import _ from 'lodash'

import s from './document-card.scss'
import { BasicLink, DecorativeDash, DocumentType, PdfIcon } from 'atoms'
import { logPageEvent } from '../../../services/analytics'
import { getConfig } from '../../../services/client-config'
import { getCurrentFile } from '../../../services/utils'

class DocumentCard extends React.Component {
  getLatestFile() {
    if (this.props.data && this.props.data.files) {
      return getCurrentFile(this.props.data.files)
    } else {
      return null
    }
  }

  makeDownloadLink() {
    const latestFile = this.getLatestFile()
    const title = this.props.data.title
    if (latestFile) {
      return (
        <div className={'document-card-download ' + s.download}>
          <a
            onClick={() => {
              logPageEvent({
                category: 'Document-Download-Module',
                action: `docname - ${title}: Download PDF`
              })
              window.open(latestFile.fileUrl, '_blank')
            }}
            className={s.link}
          >
            Download PDF
          </a>
          <PdfIcon />
        </div>
      )
    } else {
      return undefined
    }
  }

  makeTable(doc) {
    const rows = []
    if (
      doc.activities &&
      doc.activities.length > 0 &&
      _.includes(this.props.fieldsToShowInDetails, 'Activity')
    ) {
      rows.push({ name: 'Activity:', value: doc.activities.join(', ') })
    }
    if (doc.programs && _.includes(this.props.fieldsToShowInDetails, 'Program')) {
      rows.push({ name: 'Program:', value: doc.programs.join(', ') })
    }

    if (doc.published && _.includes(this.props.fieldsToShowInDetails, 'Published')) {
      const publishedDate = new Date(doc.updated)
      const publisheDateString =
        publishedDate.getMonth() + '/' + publishedDate.getDate() + '/' + publishedDate.getYear()
      rows.push({ name: 'Published:', value: publisheDateString })
    }
    if (doc.summary && _.includes(this.props.fieldsToShowInDetails, 'Summary')) {
      rows.push({ name: 'Summary:', value: doc.summary })
    }

    return (
      <div>
        <div className={s.dash}>
          <DecorativeDash />
        </div>
        <table>
          <tbody>
            {rows.map((row, index) => {
              return (
                <tr key={index}>
                  <td className={s.columnOne}>{row.name}</td>
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
    const { data: { title, type, url } } = this.props
    const eventConfig = {
      category: 'Document-Download-Module',
      action: `docname - ${title}: Document Landing Page`
    }
    const href = getConfig('urlRedirect') ? `/${type.replace(/s$/, '')}/${url}` : url

    return (
      <BasicLink url={href} eventConfig={eventConfig}>
        <h6 className={'document-card-title ' + s.title}>{title}</h6>
      </BasicLink>
    )
  }

  render() {
    const doc = this.props.data
    if (doc) {
      const idData =
        doc.documents && doc.documents.length > 0
          ? doc.documents[0]
          : {
              idType: 'UNK',
              number: 'UNK'
            }

      return (
        <div className={'document-card-container ' + (this.props.showBorder ? ' ' + s.container : '')}>
          <div>
            <div className={s.documentTypeContainer}>
              <DocumentType
                className={s.documentType}
                type={doc.documentIdType}
                number={doc.documentIdNumber}
              />
            </div>
            <div />
            {this.makeTitle()}
            {this.props.showDetails ? this.makeTable(this.props.data) : null}
            {this.makeDownloadLink()}
          </div>
        </div>
      )
    } else {
      return <div />
    }
  }
}

DocumentCard.propTypes = {
  showBorder: React.PropTypes.bool,
  type: React.PropTypes.string.isRequired
}

DocumentCard.defaultProps = {
  showBorder: true,
  type: 'documents'
}

export default DocumentCard
