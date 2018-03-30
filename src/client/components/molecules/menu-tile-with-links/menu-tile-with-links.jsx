import React from 'react'

import s from './menu-tile-with-links.scss'
import { BasicLink } from 'atoms'

class MenuTileWithLinks extends React.Component {
  render() {
    const eventConfig = {
      category: 'Main-Menu',
      action:
        (this.props.largeTitle || '') +
        (this.props.largeTitle && this.props.smallTitle ? ' ' : '') +
        (this.props.smallTitle || '')
    }
    return (
      <div id={this.props.id} className={s.tileHover}>
        <BasicLink url={this.props.link} eventConfig={eventConfig}>
          <h3 className={s.largeTitleHover}>{this.props.largeTitle}</h3>
        </BasicLink>
        <BasicLink url={this.props.link} eventConfig={eventConfig}>
          <h3 className={s.smallTitleHover}>{this.props.smallTitle}</h3>
        </BasicLink>
        <div className={s.topLine} />
        {this.props.children
          ? this.props.children.map((object, index) => {
              const autoFocusOnMe = this.props.autoFocusOnLast && index === this.props.children.length - 1
              const eventConfig = {
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
                  // eventConfig={eventConfig}
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
        <BasicLink
          text={this.props.title}
          id={this.props.id}
          myClassName={s.link}
          url={this.props.link}
          autoFocus={this.props.autoFocus}
          eventConfig={this.props.eventConfig}
        />
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
