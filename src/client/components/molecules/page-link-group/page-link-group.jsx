import React from 'react'

import styles from './page-link-group.scss'
import PageLink from './page-link'
import { Link } from 'atoms'

// TODO: PageLinkGroup is styled differently on header submenu nav and footer
// May consider refactoring
class PageLinkGroup extends React.Component {
  render() {
    const { id, links, title, titleLink, indent, isLastGroup, onFinalBlur } = this.props

    const renderedLinks = links.map((item, index) => {
      const isLastLink = index === links.length - 1

      return (
        <PageLink
          key={index + 1}
          id={this.props.id + '-' + index}
          text={item.text}
          url={item.url}
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
  title: React.PropTypes.string,
  titleLink: React.PropTypes.string,
  links: React.PropTypes.array.isRequired
}

export default PageLinkGroup
