import React from 'react'
import { Link } from 'react-router'
import _ from 'lodash'

import styles from './breadcrumb.scss'
import { SmallIcon } from 'atoms'

class Breadcrumb extends React.Component {
  makeLastAnchor(tail) {
    return (
      <span className={styles.last} key={20}>
        <Link id={'breadcrumb-current'} to={tail.url}>
          {tail.title}
        </Link>
      </span>
    )
  }
  render() {
    if (this.props.items && this.props.items.length > 0) {
      const tail = _.last(this.props.items)
      const tailAnchor = this.makeLastAnchor(tail)
      const rest = _.take(this.props.items, this.props.items.length - 1)
      return (
        <div className={styles.breadcrumb}>
          <SmallIcon fontAwesomeIconClassName="home" onClick={() => {}} />
          <span className={styles.slash}>/</span>
          {rest ? (
            rest.map((item, index) => {
              return [
                <Link id={'breadcrumb-level' + index} to={item.url}>
                  {item.title}
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
