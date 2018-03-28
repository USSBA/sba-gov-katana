import React from 'react'
import { Link } from 'react-router'

import s from './menu-tile-with-links.scss'

class MenuTileWithLinks extends React.Component {
  render() {
    let eventConfig = {
      category: 'Main-Menu',
      action:
        (this.props.largeTitle || '') +
        (this.props.largeTitle && this.props.smallTitle ? ' ' : '') +
        (this.props.smallTitle || '')
    }
    return (
      <div id={this.props.id} className={s.tileHover}>
        <Link to={this.props.link} className={s.noUnderline}>
          <h2 className={s.largeTitleHover}>{this.props.largeTitle}</h2>
        </Link>
        <Link to={this.props.link} className={s.noUnderline}>
          <h4 className={s.smallTitleHover}>{this.props.smallTitle}</h4>
        </Link>
        <div className={s.topLine} />
        {this.props.children
          ? this.props.children.map((object, index) => {
              let autoFocusOnMe = this.props.autoFocusOnLast && index === this.props.children.length - 1
              let eventConfig = {
                category: 'Main-Menu',
                action:
                  this.props.largeTitle +
                  (this.props.smallTitle ? ' ' + this.props.smallTitle : '') +
                  ':' +
                  object.title
              }
              return (
                <HoverLink
                  id={this.props.id + '-link-' + index}
                  key={index}
                  title={object.title}
                  link={object.fullUrl}
                  autoFocus={autoFocusOnMe}
                  eventConfig={eventConfig}
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
