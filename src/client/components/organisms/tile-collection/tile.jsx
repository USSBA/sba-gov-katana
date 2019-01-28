import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import styles from './tile.scss'
import * as ModalActions from '../../../actions/show-modal.js'
import { Link } from 'atoms'
import { MenuTile, MenuTileWithLinks } from 'molecules'
import { navigateNow } from '../../../services/navigation.js'
import { determineMenuTileData, getLanguageOverride } from '../../../services/utils.js'

const _formatLargeTitle = title => title.split(' ')[0]
const _formatSmallTitle = title => {
  const arr = title.split(' ')
  arr.shift()
  return arr.join(' ')
}

class Tile extends React.Component {
  _openNavMenu(pixelBreakpoint, fullUrl) {
    if (!this.isLinkToPage() && window.innerWidth <= pixelBreakpoint) {
      this.props.actions.showMobileSectionNav(this.props.data, this.props.iconWhite, false)
    } else if (this.isLinkToPage()) {
      navigateNow(fullUrl, {
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
      return styles.tabChangeTileBackground
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
    // eslint-disable-next-line no-magic-numbers
    if (code === 9 && event.shiftKey) {
      this.props.onTabBackwards(this.props.enteringInReverse)
    }
  }

  handleTileKeyDown(event) {
    const code = event.keyCode ? event.keyCode : event.which
    // eslint-disable-next-line no-magic-numbers
    if (code === 13) {
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

    const langCode = getLanguageOverride()
    const titleDescriptionUrlData = determineMenuTileData(langCode, data)
    const { description, title, fullUrl } = titleDescriptionUrlData

    const baseTileData = {
      link: fullUrl,
      children: data.children,
      description: description,
      icon: icon,
      iconWhite: iconWhite,
      langCode,
      largeTitle: splitTitle ? _formatLargeTitle(title) : title,
      smallTitle: splitTitle ? _formatSmallTitle(title) : '',
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
    /* eslint-disable no-magic-numbers */
    if (size === 3 && !pathname) {
      widthStyle = styles.tileThree
    } else if (size === 4 && !pathname) {
      widthStyle = styles.tileFour
    } else if (size === 5 && !pathname) {
      widthStyle = styles.tileFive
    } else if (size === 4 && pathname === '/') {
      widthStyle = styles.homePageTileFour
    }
    /* eslint-enable no-magic-numbers */

    // eslint-disable-next-line no-magic-numbers
    const breakpointLarge = parseInt(styles.breakpointLarge.slice(0, -2), 10)

    const toggleMenuLink = (
      <Link
        className={styles.tabDisplayMenu}
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
        className={styles.tile + ' ' + widthStyle}
        onClick={this._openNavMenu.bind(this, breakpointLarge, fullUrl)}
        onMouseEnter={this._mouseEnterTile.bind(this, breakpointLarge)}
        onMouseLeave={this._mouseExitTile.bind(this, breakpointLarge)}
        onKeyDown={this.handleTileKeyDown.bind(this)}
      >
        {toggleMenuLink}
        {showHover ? hoverTile : <MenuTile id={id + '-static'} pathname={pathname} {...baseTileData} />}
        {backgroundLines ? <img className={styles.backgroundLines} src={backgroundLines} alt="" /> : null}
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

export default connect(
  mapReduxStateToProps,
  mapDispatchToProps
)(Tile)
