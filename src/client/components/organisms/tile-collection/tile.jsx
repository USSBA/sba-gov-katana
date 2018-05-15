import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import s from './tile.scss'
import * as ModalActions from '../../../actions/show-modal.js'
import { Link } from 'atoms'
import { MenuTile, MenuTileWithLinks } from 'molecules'
import { navigateNow } from '../../../services/navigation.js'

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

  _openNavMenu(pixelBreakpoint) {
    console.log(pixelBreakpoint)
    if (!this.isLinkToPage() && window.innerWidth <= pixelBreakpoint) {
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

  _mouseEnterTile(pixelBreakpoint) {
    if (window.innerWidth >= pixelBreakpoint) {
      this.props.onFocus()
    }
  }

  _mouseExitTile(pixelBreakpoint) {
    if (window.innerWidth >= pixelBreakpoint) {
      this.props.onMouseExit()
    }
  }

  handleBlur(pixelBreakpoint) {
    if (window.innerWidth >= pixelBreakpoint && this.isLinkToPage()) {
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
    const {
      backgroundLines,
      data,
      enteringInReverse,
      icon,
      iconWhite,
      id,
      pathname,
      showHover,
      size,
      splitTitle,
      locationActions,
      uppercaseFirstWord
    } = this.props
    const baseTileData = {
      link: data.fullUrl,
      children: data.children,
      description: data.description,
      icon: icon,
      iconWhite: iconWhite,
      largeTitle: splitTitle ? this._formatLargeTitle() : this.props.data.title,
      smallTitle: splitTitle ? this._formatSmallTitle() : '',
      uppercaseFirstWord: uppercaseFirstWord
    }

    const hoverTile = this.isLinkToPage() ? (
      <MenuTile {...baseTileData} inverse id={id + '-hover'} />
    ) : (
      <MenuTileWithLinks
        {...baseTileData}
        id={id + '-hover'}
        locationActions={locationActions}
        autoFocusOnLast={enteringInReverse}
      />
    )

    let widthStyle = null
    if (size === 3 && pathname === undefined) {
      widthStyle = s.tileThree
    } else if (size === 4 && pathname === undefined) {
      widthStyle = s.tileFour
    } else if (size === 5 && pathname === undefined) {
      widthStyle = s.tileFive
    } else if (size === 4 && pathname === '/') {
      widthStyle = s.homePageTileFour
    }

    const breakpointLarge = parseInt(s.breakpointLarge.slice(0, -2), 10)

    const toggleMenuLink = (
      <Link
        className={s.tabDisplayMenu}
        onClick={e => {
          e ? e.preventDefault() : ''
        }}
        onFocus={this._mouseEnterTile.bind(this)}
        onBlur={this.handleBlur.bind(this, breakpointLarge)}
        onKeyDown={this.handleKeyDown.bind(this)}
      >
        toggle {data.title} menu
      </Link>
    )

    return (
      <div
        id={id}
        className={s.tile + ' ' + widthStyle}
        onClick={this._openNavMenu.bind(this, breakpointLarge)}
        onMouseEnter={this._mouseEnterTile.bind(this, breakpointLarge)}
        onMouseLeave={this._mouseExitTile.bind(this, breakpointLarge)}
        onKeyDown={this.handleTileKeyDown.bind(this)}
      >
        {toggleMenuLink}
        {showHover ? hoverTile : <MenuTile id={id + '-static'} pathname={pathname} {...baseTileData} />}
        {backgroundLines ? <img className={s.backgroundLines} src={backgroundLines} alt="" /> : undefined}
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
