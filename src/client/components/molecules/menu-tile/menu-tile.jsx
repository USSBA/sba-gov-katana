import React from 'react'

import cornerLines from 'assets/images/corner-diagonal-lines-grey.png'
import s from './menu-tile.scss'
import sharedStyles from './menu-tile-shared.scss'
import { BasicLink } from 'atoms'

class MenuTile extends React.Component {
  render() {
    let smallTitleComponent = this.props.smallTitle ? (
      <h4
        className={
          sharedStyles.smallTitle +
          ' ' +
          (this.props.uppercaseFirstWord ? s.upperCase : '')
        }
      >
        {this.props.smallTitle}
      </h4>
    ) : (
      undefined
    )
    let tileClass =
      s.tileNormal + ' ' + (this.props.inverse ? s.tileInverse : '')
    let titleContainerClass =
      s.titleContainer + ' ' + (this.props.inverse ? s.titleInverse : '')
    let largeTitleClass =
      sharedStyles.largeTitle +
      ' ' +
      (this.props.uppercaseFirstWord ? s.upperCase : '')
    let lineClass = s.line + ' ' + (this.props.inverse ? s.lineInverse : '')
    let blurbClass = s.blurb + ' ' + (this.props.inverse ? s.blurbInverse : '')
    let iconSource = this.props.inverse ? this.props.iconWhite : this.props.icon
    return (
      <div id={this.props.id} className={tileClass}>
        <img
          id={this.props.id + '-icon'}
          className={s.icon}
          src={iconSource}
          alt=""
        />
        <div id={this.props.id + '-title'} className={titleContainerClass}>
          <h3 className={largeTitleClass}>{this.props.largeTitle}</h3>
          {smallTitleComponent}
        </div>
        <i className={s.rightArrow + ' fa fa-angle-right'} />
        <div className={lineClass} />
        <p id={this.props.id + '-blurb'} className={blurbClass}>
          {this.props.description}
        </p>
        <img className={s.cornerLines} src={cornerLines} alt="" />
      </div>
    )
  }
}

MenuTile.propTypes = {
  id: React.PropTypes.string,
  inverse: React.PropTypes.bool,
  largeTitle: React.PropTypes.string,
  smallTitle: React.PropTypes.string,
  uppercaseFirstWord: React.PropTypes.bool,
  icon: React.PropTypes.string,
  iconWhite: React.PropTypes.string,
  description: React.PropTypes.string
}

MenuTile.defaultProps = {}

export default MenuTile
