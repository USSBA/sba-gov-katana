import React from 'react'
import PropTypes from 'prop-types'

import s from './menu-tile.scss'
import sharedStyles from './menu-tile-shared.scss'
import scrollIcon from 'assets/svg/scroll.svg'

class MenuTile extends React.Component {
  render() {
    let tileStyle = s.tileNormal
    if (this.props.pathname === '/') {
      tileStyle = s.homepageTile
    }

    const smallTitleComponent = this.props.smallTitle ? (
      <span className={sharedStyles.smallTitle + ' ' + (this.props.uppercaseFirstWord ? s.upperCase : '')}>
        {this.props.smallTitle}
      </span>
    ) : (
      undefined
    )
    const tileClass = tileStyle + ' ' + (this.props.inverse ? s.tileInverse : '')
    const titleContainerClass = s.titleContainer + ' ' + (this.props.inverse ? s.titleInverse : '')
    const largeTitleClass =
      sharedStyles.largeTitle + ' ' + (this.props.uppercaseFirstWord ? s.upperCase : '')
    const lineClass = s.line + ' ' + (this.props.inverse ? s.lineInverse : '')
    const blurbClass = s.blurb + ' ' + (this.props.inverse ? s.blurbInverse : '')
    const iconSource = this.props.inverse ? this.props.iconWhite : this.props.icon
    return (
      <div id={this.props.id} className={tileClass}>
        <img id={this.props.id + '-icon'} className={s.icon} src={iconSource} alt="" />
        <div id={this.props.id + '-title'} className={titleContainerClass}>
          <h3 className={largeTitleClass}>
            {this.props.largeTitle}
            <br />
            {smallTitleComponent}
          </h3>
        </div>
        <img className={s.rightArrow} src={scrollIcon} />
        <div className={lineClass} />
        <p id={this.props.id + '-blurb'} className={blurbClass}>
          {this.props.description}
        </p>
      </div>
    )
  }
}

MenuTile.propTypes = {
  id: PropTypes.string,
  inverse: PropTypes.bool,
  largeTitle: PropTypes.string,
  smallTitle: PropTypes.string,
  uppercaseFirstWord: PropTypes.bool,
  icon: PropTypes.string,
  iconWhite: PropTypes.string,
  description: PropTypes.string,
  pathname: PropTypes.string
}

MenuTile.defaultProps = {}

export default MenuTile
