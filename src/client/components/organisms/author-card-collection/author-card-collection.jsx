import React from 'react'
import PropTypes from 'prop-types'
import { AuthorCard } from 'molecules'
import classNames from 'classnames'
import styles from './author-card-collection.scss'

const AuthorCardCollection = props => {
  const { data } = props

  const authorCardCollectionClassName = classNames({
    [styles.authorCardCollection]: true,
    [styles.grayBackground]: true
  })

  return (
    <div data-testid="authorCardCollection" className={authorCardCollectionClassName}>
      {data.map((author, index) => (
        <div key={index} className={styles.authorCard}>
          <AuthorCard
            className={styles.authorCard}
            data-testid="authorCard"
            border={false}
            mode={'grid'}
            {...author}
          />
        </div>
      ))}
    </div>
  )
}

AuthorCardCollection.propTypes = {
  data: PropTypes.array
}

export default AuthorCardCollection
