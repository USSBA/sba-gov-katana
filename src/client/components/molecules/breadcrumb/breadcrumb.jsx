import React from 'react'
import _ from 'lodash'

import styles from './breadcrumb.scss'
import { BasicLink, SmallIcon } from 'atoms'

class Breadcrumb extends React.Component {
  makeLastAnchor(tail) {
    return (
      <span className={styles.last} key={20}>
        <BasicLink id={'breadcrumb-current'} text={tail.title} url={tail.url} />
      </span>
    )
  }
  render() {
    if (this.props.items && this.props.items.length > 0) {
      let tail = _.last(this.props.items)
      let tailAnchor = this.makeLastAnchor(tail)
      let rest = _.take(this.props.items, this.props.items.length - 1)
      return (
        <div>
          <SmallIcon fontAwesomeIconClassName="home" onClick={() => {}} />
          <span className={styles.slash}>/</span>
          {rest ? (
            rest.map((item, index) => {
              return [
                <BasicLink
                  id={'breadcrumb-level' + index}
                  text={item.title}
                  url={item.url}
                />,
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
