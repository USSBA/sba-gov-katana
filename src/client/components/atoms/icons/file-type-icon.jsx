import React, { PropTypes } from 'react'
import PdfIcon from './pdf.jsx'

const FileTypeIcon = ({ fileExtension }) => {
  let icon = null
  if (fileExtension === 'pdf') {
    icon = <PdfIcon />
  }
  return icon
}

FileTypeIcon.propTypes = {
  fileExtension: PropTypes.string
}

export default FileTypeIcon
