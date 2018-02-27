import React from 'react'
import s from './tile.scss'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as ModalActions from '../../../actions/show-modal.js'
import { navigateNow } from '../../../services/navigation.js'
import { BasicLink } from 'atoms'
import { MenuTile, MenuTileWithLinks } from 'molecules'

class Tile extends React.Component {
  constructor() {
    super()
  }

  _formatLargeTitle() {
    return this.props.data.title.split(' ')[0]
  }

  _formatSmallTitle() {
    const arr = this.props.data.title.split(' ')
    arr.shift()
    return arr.join(' ')
  }

  _openNavMenu() {
    if (!this.isLinkToPage() && window.innerWidth <= 1080) {
      this.props.actions.showMobileSectionNav(this.props.data, this.props.iconWhite, false)
    } else if (this.isLinkToPage()) {
      navigateNow(this.props.data.fullUrl, {
        category: 'Main-Menu',
        action: this.props.data.title,
        label: document.location.pathname
      })
    }
  }

  _toggleTileClassOnTab() {
    if (this.state.displayMenuOnFocus === false) {
      return ''
    } else if (this.state.displayMenuOnFocus === true) {
      return s.tabChangeTileBackground
    }
  }

  _mouseEnterTile() {
    if (window.innerWidth >= 1080) {
      this.props.onFocus()
    }
  }

  _mouseExitTile() {
    if (window.innerWidth >= 1080) {
      this.props.onMouseExit()
    }
  }

  handleBlur() {
    if (window.innerWidth >= 1080 && this.isLinkToPage()) {
      this.props.onBlur()
    }
  }

  handleKeyDown(event) {
    const code = event.keyCode ? event.keyCode : event.which
    if (code == 9 && event.shiftKey) {
      this.props.onTabBackwards(this.props.enteringInReverse)
    }
  }

  handleTileKeyDown(event) {
    const code = event.keyCode ? event.keyCode : event.which
    if (code == 13) {
      this._openNavMenu()
    }
  }

  isLinkToPage() {
    return !this.props.data.children || this.props.neverDisplayChildrenOnHoverOverride
  }

  render() {
    const baseTileData = {
      link: this.props.data.fullUrl,
      children: this.props.data.children,
      description: this.props.data.description,
      icon: this.props.icon,
      iconWhite: this.props.iconWhite,
      largeTitle: this.props.splitTitle ? this._formatLargeTitle() : this.props.data.title,
      smallTitle: this.props.splitTitle ? this._formatSmallTitle() : '',
      uppercaseFirstWord: this.props.uppercaseFirstWord
    }

    const hoverTile = this.isLinkToPage() ? (
      <MenuTile {...baseTileData} inverse id={this.props.id + '-hover'} />
    ) : (
      <MenuTileWithLinks
        {...baseTileData}
        id={this.props.id + '-hover'}
        locationActions={this.props.locationActions}
        autoFocusOnLast={this.props.enteringInReverse}
      />
    )

    // let widthStyle = null
    // switch (this.props.size && this.props.pathname) {
    //   case 3 && undefined:
    //   console.log('info', this.props.size, this.props.pathname)
    //     widthStyle = s.tileThree
    //     break
    //   case 4 && undefined:
    //     widthStyle = s.tileFour
    //     break
    //   case 5 && undefined:
    //     widthStyle = s.tileFive
    //     break
    //   case 4 && '/':
    //     widthStyle = s.homePageTileFour
    // }

    let widthStyle = null
    if (this.props.size === 3 && this.props.pathname === undefined) {
      widthStyle = s.tileThree
    } else if (this.props.size === 4 && this.props.pathname === undefined) {
      widthStyle = s.tileFour
    } else if (this.props.size === 5 && this.props.pathname === undefined) {
      widthStyle = s.tileFive
    } else if (this.props.size === 4 && this.props.pathname === '/') {
      widthStyle = s.homePageTileFour
    }

    const toggleMenuLink = (
      <BasicLink
        text={`toggle ${this.props.data.title} menu`}
        myClassName={s.tabDisplayMenu}
        onClick={e => {
          e ? e.preventDefault() : ''
        }}
        onFocus={this._mouseEnterTile.bind(this)}
        onBlur={this.handleBlur.bind(this)}
        onKeyDown={this.handleKeyDown.bind(this)}
      />
    )

    return (
      <div
        id={this.props.id}
        className={s.tile + ' ' + widthStyle}
        onClick={this._openNavMenu.bind(this)}
        onMouseEnter={this._mouseEnterTile.bind(this)}
        onMouseLeave={this._mouseExitTile.bind(this)}
        onKeyDown={this.handleTileKeyDown.bind(this)}
      >
        {toggleMenuLink}
        {this.props.showHover ? (
          hoverTile
        ) : (
          <MenuTile id={this.props.id + '-static'} pathname={this.props.pathname} {...baseTileData} />
        )}
        {this.props.backgroundLines ? (
          <img className={s.backgroundLines} src={this.props.backgroundLines} alt="" />
        ) : (
          undefined
        )}
      </div>
    )
  }
}

function mapReduxStateToProps(reduxState) {
  return {}
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(ModalActions, dispatch)
  }
}
export default connect(mapReduxStateToProps, mapDispatchToProps)(Tile)
