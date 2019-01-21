import React, { PropTypes } from 'react'

const FileTypeIcon = ({ fileExtension }) => {
  let icon = null
  if (fileExtension === 'pdf') {
    // data-cy prop allows us to name this for use in cypress testing.
    icon = <i className="fa fa-file-pdf-o" data-cy="pdf icon" />
  }
  return icon
}

FileTypeIcon.propTypes = {
  fileExtension: PropTypes.string.isRequired
}

export default FileTypeIcon
