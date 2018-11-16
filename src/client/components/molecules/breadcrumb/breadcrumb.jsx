import React from 'react'
import { last, take } from 'lodash'

import styles from './breadcrumb.scss'
import { Link, SmallIcon } from 'atoms'
import { getLanguageOverride } from '../../../services/utils.js'

class Breadcrumb extends React.Component {
  makeLastAnchor(tail, getLanguage) {
    let title = tail.title
    let url = tail.url

    if (tail && getLanguage === 'es') {
      title = tail.spanishTranslation.title
      url = tail.spanishTranslation.url
    }

    return (
      <span className={styles.last} key={20}>
        <Link id={'breadcrumb-current'} to={url}>
          {title}
        </Link>
      </span>
    )
  }

  render() {
    const getLanguage = getLanguageOverride()
    if (this.props.items && this.props.items.length > 0) {
      const tail = last(this.props.items)
      const tailAnchor = this.makeLastAnchor(tail, getLanguage)
      const rest = take(this.props.items, this.props.items.length - 1)
      return (
        <div className={styles.breadcrumb}>
          <SmallIcon fontAwesomeIconClassName="home" onClick={() => {}} />
          <span className={styles.slash}>/</span>
          {rest ? (
            rest.map((item, index) => {
              let title = item.title
              let url = item.url

              if (item.spanishTranslation && getLanguage === 'es') {
                title = item.spanishTranslation.title
                url = item.spanishTranslation.url
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

export default Breadcrumb
