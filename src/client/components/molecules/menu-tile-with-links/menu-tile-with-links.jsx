import React from 'react'

import s from './menu-tile-with-links.scss'
import { Link } from 'atoms'

class MenuTileWithLinks extends React.Component {
  render() {
    return (
      <div id={this.props.id} className={s.tileHover}>
        <Link to={this.props.link}>
          <h3 className={s.titleHover}>
            {this.props.largeTitle} {this.props.smallTitle}
          </h3>
        </Link>
        <div className={s.topLine} />
        {this.props.children
          ? this.props.children.map((object, index) => {
              const autoFocusOnMe = this.props.autoFocusOnLast && index === this.props.children.length - 1
              return (
                <HoverLink
                  id={this.props.id + '-link-' + index}
                  key={index}
                  title={object.title}
                  link={object.fullUrl}
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
  id: React.PropTypes.string,
  smallTitle: React.PropTypes.string,
  largeTitle: React.PropTypes.string,
  children: React.PropTypes.array,
  autoFocusOnLast: React.PropTypes.bool,
  description: React.PropTypes.string
}

MenuTileWithLinks.defaultProps = {}

export default MenuTileWithLinks
