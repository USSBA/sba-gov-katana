import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { isEmpty } from 'lodash'
import classNames from 'classnames'
import { DecorativeDash, Link } from 'atoms'
import styles from './author-card.scss'

class AuthorCard extends PureComponent {
  render() {
    const { name, title, shortBio: bio, picture, url, border } = this.props

    const className = classNames({
      [styles.card]: true,
      [styles.border]: border
    })

    const infoClassName = classNames({
      [styles.info]: true,
      [styles.imageMode]: !isEmpty(picture)
    })

    const readMoreClassName = classNames({
      [styles.readMoreAdditionalMargin]: isEmpty(bio)
    })

    return (
      <div data-testid={'authorCard'} tabIndex="0" className={className}>
        {!isEmpty(picture) && (
          <div data-testid={'picture'} tabIndex="0" className={styles.image}>
            <img src={picture} alt={`photo of ${name}`} />
          </div>
        )}
        <div className={infoClassName}>
          <h4 data-testid={'name'}>
            <a href={url}>{name}</a>
          </h4>
          <div data-testid={'title'} tabIndex="0" className={styles.title}>
            <i>{title}</i>
          </div>
          <DecorativeDash width={30} />
          {!isEmpty(bio) && (
            <div data-testid={'bio'} tabIndex="0" className={styles.bio}>
              {bio}
            </div>
          )}
          <div data-testid={'read-more'} className={readMoreClassName}>
            <a href={url}>Read More</a>
          </div>
        </div>
      </div>
    )
  }
}

AuthorCard.propTypes = {
  name: PropTypes.string,
  title: PropTypes.string,
  url: PropTypes.string,
  border: PropTypes.bool
}

AuthorCard.defaultProps = {
  name: 'Full Name',
  title: 'title',
  picture: '',
  shortBio: '',
  border: true
}

export default AuthorCard
