import React from 'react'

import styles from './menu-tile.scss'
import sharedStyles from './menu-tile-shared.scss'
import scrollIcon from 'assets/svg/scroll.svg'

class MenuTile extends React.Component {
  render() {
    let tileStyle = styles.tileNormal
    if (this.props.pathname === '/') {
      tileStyle = styles.homepageTile
    }

    const smallTitleComponent = this.props.smallTitle ? (
      <span
        className={sharedStyles.smallTitle + ' ' + (this.props.uppercaseFirstWord ? styles.upperCase : '')}
      >
        {this.props.smallTitle}
      </span>
    ) : null

    const tileClass = tileStyle + ' ' + (this.props.inverse ? styles.tileInverse : '')
    const titleContainerClass =
      styles.titleContainer + ' ' + (this.props.inverse ? styles.titleInverse : '')
    const largeTitleClass =
      sharedStyles.largeTitle + ' ' + (this.props.uppercaseFirstWord ? styles.upperCase : '')
    const lineClass = styles.line + ' ' + (this.props.inverse ? styles.lineInverse : '')
    const blurbClass = styles.blurb + ' ' + (this.props.inverse ? styles.blurbInverse : '')
    const iconSource = this.props.inverse ? this.props.iconWhite : this.props.icon
    return (
      <div id={this.props.id} className={tileClass}>
        <img id={this.props.id + '-icon'} className={styles.icon} src={iconSource} alt="" />
        <div id={this.props.id + '-title'} className={titleContainerClass}>
          <h3 className={largeTitleClass}>
            {this.props.largeTitle}
            <br />
            {smallTitleComponent}
          </h3>
        </div>
        <img className={styles.rightArrow} src={scrollIcon} />
        <div className={lineClass} />
        <p id={this.props.id + '-blurb'} className={blurbClass}>
          {this.props.description}
        </p>
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
  description: React.PropTypes.string,
  pathname: React.PropTypes.string
}

MenuTile.defaultProps = {}

export default MenuTile
