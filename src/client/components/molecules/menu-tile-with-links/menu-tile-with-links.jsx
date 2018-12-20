import React from 'react'

import styles from './menu-tile-with-links.scss'
import { Link } from 'atoms'
import { determineMenuTileData } from '../../../services/utils.js'

class MenuTileWithLinks extends React.Component {
  render() {
    const { autoFocusOnLast, children, id, langCode, largeTitle, link, smallTitle } = this.props
    return (
      <div id={id} className={styles.tileHover}>
        <Link to={link}>
          <h3>
            {largeTitle} {smallTitle}
          </h3>
        </Link>
        <div className={styles.topLine} />
        {children
          ? children.map((object, index) => {
              const titleDescriptionUrlData = determineMenuTileData(langCode, object)
              const { title, fullUrl } = titleDescriptionUrlData

              const autoFocusOnMe = autoFocusOnLast && index === children.length - 1
              return (
                <HoverLink
                  id={id + '-link-' + index}
                  key={index}
                  title={title}
                  link={fullUrl}
                  autoFocus={autoFocusOnMe}
                />
              )
            })
          : null}
      </div>
    )
  }
}

class HoverLink extends React.Component {
  render() {
    const { autoFocus, id, link, title } = this.props
    return (
      <div className={styles.linkContainer}>
        <Link id={id} className={styles.link} to={link} autoFocus={autoFocus}>
          {title}
        </Link>
      </div>
    )
  }
}

MenuTileWithLinks.propTypes = {
  id: React.PropTypes.string,
  smallTitle: React.PropTypes.string,
  largeTitle: React.PropTypes.string,
  children: React.PropTypes.array,
  autoFocusOnLast: React.PropTypes.bool,
  description: React.PropTypes.string
}

MenuTileWithLinks.defaultProps = {}

export default MenuTileWithLinks
