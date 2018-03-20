import React from 'react'

import styles from './page-link-group.scss'
import { BasicLink } from 'atoms'
import PageLink from './page-link'

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
            <BasicLink
              id={id + '-title'}
              text={title}
              url={titleLink}
              onBlur={() => {
                if (isLastGroup && links.length === 0) {
                  onFinalBlur()
                }
              }}
            />
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
