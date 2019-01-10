import React from 'react'
import PropTypes from 'prop-types'

import s from './menu-tile-with-links.scss'
import { Link } from 'atoms'
import { determineMenuTileData } from '../../../services/utils.js'

class MenuTileWithLinks extends React.Component {
  render() {
    return (
      <div id={this.props.id} className={s.tileHover}>
        <Link to={this.props.link}>
          <h3>
            {this.props.largeTitle} {this.props.smallTitle}
          </h3>
        </Link>
        <div className={s.topLine} />
        {this.props.children
          ? this.props.children.map((object, index) => {
              const titleDescriptionUrlData = determineMenuTileData(this.props.langCode, object)
              const { title, fullUrl } = titleDescriptionUrlData

              const autoFocusOnMe = this.props.autoFocusOnLast && index === this.props.children.length - 1
              return (
                <HoverLink
                  id={this.props.id + '-link-' + index}
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
    return (
      <div className={s.linkContainer}>
        <Link id={this.props.id} className={s.link} to={this.props.link} autoFocus={this.props.autoFocus}>
          {this.props.title}
        </Link>
      </div>
    )
  }
}

MenuTileWithLinks.propTypes = {
  id: PropTypes.string,
  smallTitle: PropTypes.string,
  largeTitle: PropTypes.string,
  children: PropTypes.array,
  autoFocusOnLast: PropTypes.bool,
  description: PropTypes.string
}

MenuTileWithLinks.defaultProps = {}

export default MenuTileWithLinks
