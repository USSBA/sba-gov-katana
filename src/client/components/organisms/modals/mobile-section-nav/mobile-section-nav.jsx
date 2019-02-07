import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import style from './mobile-section-nav.scss'
import * as ModalActions from '../../../../actions/show-modal.js'
import { Link } from 'atoms'
import { navigateNow } from '../../../../services/navigation'
import { getLanguageOverride } from '../../../../services/utils.js'

class MobileNav extends React.Component {
  constructor(props) {
    super()
    this.state = {
      navMenu: 'open'
    }
    this._animationTimer = this._animationTimer.bind(this)
    this._handleBackBtn = this._handleBackBtn.bind(this)
    this._handleClick = this._handleClick.bind(this)
    this._navMenuClassname = this._navMenuClassname.bind(this)
  }

  _animationTimer() {
    setTimeout(() => {
      this.props.actions.closeMobileNav()
    }, 1000)
  }

  _handleBackBtn() {
    if (this.props.backUrl !== false) {
      this.props.actions.closeMobileNav()
      navigateNow(this.props.backUrl)
    } else {
      this.setState(
        {
          navMenu: 'close'
        },
        this._animationTimer
      )
    }
  }

  _handleClick(linkObject) {
    this.setState(
      {
        navMenu: 'close'
      },
      this._animationTimer
    )
    // navigateNow(linkObject.fullUrl)
  }

  _navMenuClassname() {
    if (this.state.navMenu === 'open') {
      return style.navMenuOpen
    } else if (this.state.navMenu === 'close') {
      return style.navMenuClose
    }
  }

  render() {
    const { menuData } = this.props
    const children = menuData.children || []
    const langCode = getLanguageOverride()
    let menuTitle
    if (menuData.spanishTranslation && langCode === 'es') {
      menuTitle = menuData.spanishTranslation.title
    } else {
      menuTitle = menuData.title
    }

    return (
      <div className={this._navMenuClassname()}>
        <div
          className={style.navHeader}
          onClick={() => {
            this._handleBackBtn()
          }}
        >
          <i className={style.navLeftArrow + ' fa fa-angle-left'} />
          <div className={style.navTitleContainer}>
            <h3 className={style.navTitle}>{menuTitle}</h3>
          </div>
        </div>
        <div className={style.navTopLine} />
        {children.map((linkObject, index) => {
          return (
            <NavLink key={index} link={linkObject} handleClick={this._handleClick} langCode={langCode} />
          )
        })}
      </div>
    )
  }
}

const NavLink = props => {
  const { link, langCode } = props
  let fullUrl
  let title
  if (props.link.spanishTranslation && langCode === 'es') {
    fullUrl = link.spanishTranslation.fullUrl
    title = link.spanishTranslation.title
  } else {
    fullUrl = link.fullUrl
    title = link.title
  }

  return (
    <Link
      className={style.navLink}
      id={props.iD}
      to={fullUrl}
      onMouseUp={() => {
        props.handleClick(link)
      }}
    >
      {/* <a */}
      {/*   id={props.iD} */}
      {/*   className={style.navLink} */}
      {/* > */}
      {title}
      {/* </a> */}
    </Link>
  )
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(ModalActions, dispatch)
  }
}

export default connect(
  null,
  mapDispatchToProps
)(MobileNav)

export { MobileNav }
