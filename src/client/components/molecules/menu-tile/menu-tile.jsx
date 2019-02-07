import React from 'react'
import PropTypes from 'prop-types'

import style from './menu-tile.scss'
import sharedStyles from './menu-tile-shared.scss'
import scrollIcon from 'assets/svg/scroll.svg'

class MenuTile extends React.Component {
  render() {
    let tileStyle = style.tileNormal
    if (this.props.pathname === '/') {
      tileStyle = style.homepageTile
    }

    const smallTitleComponent = this.props.smallTitle ? (
      <span
        className={sharedStyles.smallTitle + ' ' + (this.props.uppercaseFirstWord ? style.upperCase : '')}
      >
        {this.props.smallTitle}
      </span>
    ) : null

    const tileClass = tileStyle + ' ' + (this.props.inverse ? style.tileInverse : '')
    const titleContainerClass = style.titleContainer + ' ' + (this.props.inverse ? style.titleInverse : '')
    const largeTitleClass =
      sharedStyles.largeTitle + ' ' + (this.props.uppercaseFirstWord ? style.upperCase : '')
    const lineClass = style.line + ' ' + (this.props.inverse ? style.lineInverse : '')
    const blurbClass = style.blurb + ' ' + (this.props.inverse ? style.blurbInverse : '')
    const iconSource = this.props.inverse ? this.props.iconWhite : this.props.icon
    return (
      <div id={this.props.id} className={tileClass}>
        <img id={this.props.id + '-icon'} className={style.icon} src={iconSource} alt="" />
        <div id={this.props.id + '-title'} className={titleContainerClass}>
          <h3 className={largeTitleClass}>
            {this.props.largeTitle}
            <br />
            {smallTitleComponent}
          </h3>
        </div>
        <img className={style.rightArrow} src={scrollIcon} />
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
