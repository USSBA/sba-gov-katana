import React from 'react'
import styles from './caption-text.scss'

const CaptionText = ({ children, tagName = 'p', ...rest }) => {
  return React.createElement(
    tagName,
    {
      className: styles.captionText,
      ...rest
    },
    children
  )
}

export default CaptionText
