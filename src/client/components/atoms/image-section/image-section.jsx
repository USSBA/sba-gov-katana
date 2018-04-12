import React, { PropTypes } from 'react'
import styles from './image-section.scss'

const ImageSection = ({ alt, caption, src }) => (
  <div>
    <img className={styles.imageSection} alt={alt} src={src} />
    <p className={styles.caption}>{caption}</p>
  </div>
)

ImageSection.propTypes = {
  alt: PropTypes.string.isRequired,
  caption: PropTypes.string,
  src: PropTypes.string.isRequired
}

export default ImageSection
