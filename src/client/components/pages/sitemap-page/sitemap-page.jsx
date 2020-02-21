import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { isEmpty } from 'lodash'

import { fetchRestContent } from '../../../fetch-content-helper'
import styles from './sitemap-page.scss'

class SiteMapPage extends Component {
  constructor() {
    super()
    this.state = {
      siteMap: []
    }
  }

  async componentDidMount() {
    const pathname = this.props.location.pathname
    const siteMap = await fetchRestContent('siteMap')

    if (!isEmpty(siteMap)) {
      this.setState({ siteMap })
    }
  }

  render() {
    const { siteMap } = this.state

    const renderLinkList = items => {
      return (
        <ul className={styles.linkList}>
          {items.map(item => {
            return (
              <li>
                <a href={item.fullUrl}>{item.title}</a>
                {item.children && renderLinkList(item.children)}
              </li>
            )
          })}
        </ul>
      )
    }

    const linkTree = renderLinkList(siteMap)
    return <div>{linkTree}</div>
  }
}

export default SiteMapPage
