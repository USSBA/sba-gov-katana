import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { isEmpty } from 'lodash'
import classNames from 'classnames'
import { DecorativeDash, Link } from 'atoms'
import styles from './author-card.scss'

class AuthorCard extends PureComponent {
  renderReadMoreAltText(text) {
    let renderedAltText
    if (text && !isEmpty(text)) {
      renderedAltText = <span className={styles.linkSpan}>{text}</span>
    }
    return renderedAltText
  }

  renderReadMoreLink() {
    const { url, bio, mode } = this.props

    const linkClassName = classNames({
      [styles.linkAdditionalMargin]: isEmpty(bio)
    })

    if (mode === 'single') {
      return (
        <div data-testid={'read-more'} className={linkClassName}>
          <a href={url}>
            {this.renderReadMoreAltText(bio)}
            Read More
          </a>
        </div>
      )
    } else if (mode === 'grid') {
      return (
        <div data-testid={'see-all-posts'} className={linkClassName}>
          <a href={`${url}/#posts`}>See all posts</a>
        </div>
      )
    }
  }

  render() {
    const { name, title, shortBio: bio, picture, url, border, mode, containerTabIndex } = this.props

    const className = classNames({
      [styles.card]: true,
      [styles.border]: border
    })

    const infoClassName = classNames({
      [styles.info]: true,
      [styles.imageMode]: mode === 'single' && !isEmpty(picture)
    })

    //Empty author titles come out of drupal as empty objects, but is a string when valid
    const authorTitle = typeof title === 'object' ? '' : title

    return (
      <div data-testid={'authorCard'} tabIndex="0" className={className}>
        {mode === 'single' && !isEmpty(picture) && (
          <div data-testid={'picture'} tabIndex="0" className={styles.image}>
            <img src={picture.src} alt={picture.alt} />
          </div>
        )}
        <div className={infoClassName}>
          <h4 data-testid={'name'}>{url ? <a href={url}>{name}</a> : name}</h4>
          <div data-testid={'title'} tabIndex={containerTabIndex} className={styles.title}>
            <i>{authorTitle}</i>
          </div>
          <DecorativeDash width={30} />
          {!isEmpty(bio) && (
            <div data-testid={'bio'} tabIndex="0" className={styles.bio}>
              {bio}
            </div>
          )}
          {url && this.renderReadMoreLink()}
        </div>
      </div>
    )
  }
}

AuthorCard.propTypes = {
  name: PropTypes.string,
  title: PropTypes.string,
  url: PropTypes.string,
  border: PropTypes.bool,
  mode: PropTypes.string,
  containerTabIndex: PropTypes.string
}

AuthorCard.defaultProps = {
  name: 'Full Name',
  title: 'title',
  picture: {},
  shortBio: '',
  border: true,
  mode: 'single', // single | grid
  containerTabIndex: '0'
}

export default AuthorCard
