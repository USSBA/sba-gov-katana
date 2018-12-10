import React from 'react'
import moment from 'moment'
import { isObject, isEmpty } from 'lodash'

import styles from './versions-list.scss'
import { logPageEvent } from '../../../services/analytics.js'
import { getFileExtension } from '../../../services/utils.js'
import { FileTypeIcon } from 'atoms'

const VersionsList = props => {
  const { doc } = props
  const { documentIdNumber, documentIdType, files, title } = doc

  if (!files || (files.length && files.length <= 1)) return null

  const list = files.map((file, index) => {
    const { effectiveDate, fileUrl, version } = file

    const versionMessage =
      (documentIdType === 'SOP' &&
      documentIdNumber &&
      (!isObject(documentIdNumber) || !isEmpty(documentIdNumber))
        ? documentIdNumber
        : 'Version') +
      ' ' +
      (version ? version : 'N/A')

    const fileExtension = getFileExtension(fileUrl)
    const effectiveDateMessage = `Effective: ${effectiveDate || 'N/A'}`
    const effectiveDateInTheFuture = effectiveDate && moment(effectiveDate, 'YYYY-MM-DD').isAfter(moment())
    const eventConfig = {
      category: 'Document-Version',
      action: `docname - ${title}: previous version #${version || 'N/A'}`
    }

    return (
      <li key={index}>
        <strong>{versionMessage}</strong>
        <strong>|</strong>
        {effectiveDateMessage}.
        <a href={fileUrl} onClick={_ => logPageEvent(eventConfig)} target="_blank">
          Download
          {fileExtension ? ' ' + fileExtension : ''}
          <FileTypeIcon fileExtension={fileExtension} />
        </a>
        {effectiveDateInTheFuture ? (
          <strong className={styles.future} key={30}>
            Future Document
          </strong>
        ) : null}
      </li>
    )
  })

  return (
    <div className={styles.allVersionsList}>
      <h3>All versions</h3>
      <ul>{list}</ul>
    </div>
  )
}

export default VersionsList
