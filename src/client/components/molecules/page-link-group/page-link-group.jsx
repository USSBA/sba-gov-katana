import React, { PropTypes } from 'react'
import { isObject } from 'lodash'

import styles from './page-link-group.scss'
import PageLink from './page-link'
import { Link } from 'atoms'

// TODO: PageLinkGroup is styled differently on header submenu nav and footer
// May consider refactoring
class PageLinkGroup extends React.Component {
  render() {
    const { id, langCode, links, titleLink, indent, isLastGroup, onFinalBlur } = this.props
    let { title } = this.props

    if (langCode && isObject(title) && title.hasOwnProperty(langCode)) {
      const content = title[langCode]
      if (isObject(content)) {
        title = title[langCode].text
      } else {
        title = title[langCode]
      }
    }

    const renderedLinks = links.map((item, index) => {
      const isLastLink = index === links.length - 1
      let { text, url } = item

      if (langCode && isObject(item) && item.hasOwnProperty(langCode)) {
        text = item[langCode].text
        url = item[langCode].url
      }

      return (
        <PageLink
          key={index + 1}
          id={this.props.id + '-' + index}
          text={text}
          url={url}
          onBlur={() => {
            if (isLastGroup && isLastLink) {
              onFinalBlur()
            }
          }}
          indent={indent}
        />
      )
    })

    return (
      <ul id={id} className={styles.pageLinkGroup}>
        {title && (
          <li key={0}>
            <Link
              id={id + '-title'}
              to={titleLink}
              onBlur={() => {
                if (isLastGroup && links.length === 0) {
                  onFinalBlur()
                }
              }}
            >
              {title}
            </Link>
          </li>
        )}

        {renderedLinks}
      </ul>
    )
  }
}

PageLinkGroup.propTypes = {
  title: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
  titleLink: PropTypes.string,
  links: PropTypes.array.isRequired
}

export default PageLinkGroup
