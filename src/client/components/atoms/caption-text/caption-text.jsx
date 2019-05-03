import React from 'react'
import classNames from 'classnames'

import styles from './caption-text.scss'

const CaptionText = ({ children, tagName = 'p', ...rest }) => {
  const className = classNames({
    'caption-text': true,
    [styles.captionText]: true
  })

  return React.createElement(
    tagName,
    {
      className,
      'data-testid': 'caption-text',
      ...rest
    },
    children
  )
}

export default CaptionText
