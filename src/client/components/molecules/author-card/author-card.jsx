import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { isEmpty } from 'lodash'
import classNames from 'classnames'
import { DecorativeDash, Link } from 'atoms'
import styles from './author-card.scss'

class AuthorCard extends PureComponent {
  render() {
    const { name, title, bio, picture, id } = this.props

    const className = classNames({
      [styles.card]: true
    })

    const infoClassName = classNames({
      [styles.info]: true,
      [styles.imageMode]: !isEmpty(picture)
    })

    return (
      <div data-testid={'authorCard'} tabIndex="0" className={className}>
        {!isEmpty(picture) && (
          <div data-testid={'picture'} tabIndex="0" className={styles.image}>
            <img src={picture} alt="photo of author" />
          </div>
        )}
        <div className={infoClassName}>
          <h4 data-testid={'name'} tabIndex="0">
            <a href={`#${id}`}>{name}</a>
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
          <div data-testid={'read-more'} tabIndex="0">
            <a href={`#${id}`}>Read More</a>
          </div>
        </div>
      </div>
    )
  }
}

AuthorCard.propTypes = {
  name: PropTypes.string,
  title: PropTypes.string,
  id: PropTypes.number
}

AuthorCard.defaultProps = {
  name: 'Full Name',
  title: 'title',
  picture:
    'https://upload.wikimedia.org/wikipedia/commons/thumb/4/41/Linda_McMahon_official_photo.jpg/440px-Linda_McMahon_official_photo.jpg',
  bio:
    'Eaque totam ad exercitationem tempora rerum natus ea voluptates. Reiciendis recusandae exercitationem optio perspiciatis rem optio. Rerum velit veniam eos temporibus suscipit debitis dolores.',
  id: 10
}

export default AuthorCard
