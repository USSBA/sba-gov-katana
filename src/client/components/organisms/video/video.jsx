import React from 'react'
import classNames from 'classnames'
import styles from './video.scss'

class Video extends React.Component {
  render() {
    const { title, size, youtubeId } = this.props

    const videoClassName = classNames({
      video: true,
      [styles.video]: true,
      [styles.medium]: size === 'medium',
      [styles.small]: size === 'small'
    })

    return (
      <div>
        <h2 className={styles.videoTitle}>{title}</h2>
        <div className={videoClassName}>
          <iframe src={`https://www.youtube.com/embed/${youtubeId}`} frameBorder="0" />
        </div>
      </div>
    )
  }
}

export default Video
