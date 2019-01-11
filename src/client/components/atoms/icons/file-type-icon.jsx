import React, { PropTypes } from 'react'
import s from './icons.scss'

const FileTypeIcon = ({ fileExtension }) => {
  let icon = null
  if (fileExtension === 'pdf') {
    icon = <i className={s.pdf + ' fa fa-file-pdf-o'} />
  }
  return icon
}

FileTypeIcon.propTypes = {
  fileExtension: PropTypes.string
}

export default FileTypeIcon
