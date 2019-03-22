import React from 'react'
import PropTypes from 'prop-types'
import { last, size, take } from 'lodash'

import styles from './breadcrumb.scss'
import { Link, SmallIcon } from 'atoms'
import { getLanguageOverride } from '../../../services/utils.js'

class Breadcrumb extends React.Component {
  makeLastAnchor(tail, languageOverride) {
    let { title, url } = tail
    const { spanishTranslation } = tail

    if (tail && spanishTranslation && languageOverride === 'es') {
      title = spanishTranslation.title
      url = spanishTranslation.url
    }

    return (
      <span className={styles.last} key={20}>
        <Link id={'breadcrumb-current'} to={url} data-cy="last-breadcrumb">
          {title}
        </Link>
      </span>
    )
  }

  render() {
    const { items } = this.props
    const languageOverride = getLanguageOverride()

    if (size(items)) {
      const tail = last(items)
      const tailAnchor = this.makeLastAnchor(tail, languageOverride)
      const rest = take(items, items.length - 1)

      return (
        <div className={styles.breadcrumb} data-cy="naviagation-breadcrumb">
          <SmallIcon fontAwesomeIconClassName="home" data-cy="breadcrumb-home-icon" onClick={() => {}} />
          <span className={styles.slash}>/</span>
          {rest ? (
            rest.map((item, index) => {
              let { title, url } = item
              const { spanishTranslation } = item

              if (spanishTranslation && languageOverride === 'es') {
                title = spanishTranslation.title
                url = spanishTranslation.url
              }

              return [
                <Link id={'breadcrumb-level' + index} to={url}>
                  {title}
                </Link>,
                <span className={styles.slash}>/</span>
              ]
            })
          ) : (
            <div />
          )}
          {tailAnchor}
        </div>
      )
    } else {
      return <div />
    }
  }
}

Breadcrumb.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string,
      url: PropTypes.string
    })
  )
}

export default Breadcrumb
