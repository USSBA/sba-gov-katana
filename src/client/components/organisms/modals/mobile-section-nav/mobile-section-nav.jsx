import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as ModalActions from '../../../../actions/show-modal.js'
import { navigateNow } from '../../../../services/navigation'
import s from './mobile-section-nav.scss'

class MobileNav extends React.Component {
  constructor(props) {
    super()
    this.state = {
      navMenu: 'open'
    }
    // this._formatLargeTitle = this._formatLargeTitle.bind(this)
    // this._formatSmallTitle = this._formatSmallTitle.bind(this)
    this._animationTimer = this._animationTimer.bind(this)
    this._handleBackBtn = this._handleBackBtn.bind(this)
    this._handleClick = this._handleClick.bind(this)
    this._navMenuClassname = this._navMenuClassname.bind(this)
  }

  // _formatLargeTitle() {
  //   return this.props.menuData.title.split(' ')[0]
  // }

  // _formatSmallTitle() {
  //   const arr = this.props.menuData.title.split(' ')
  //   arr.shift()
  //   return arr.join(' ')
  // }

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
    // this.props.actions.closeMobileNav();
    this.setState(
      {
        navMenu: 'close'
      },
      this._animationTimer
    )
    navigateNow(linkObject.fullUrl)
  }

  _navMenuClassname() {
    if (this.state.navMenu === 'open') {
      return s.navMenuOpen
    } else if (this.state.navMenu === 'close') {
      return s.navMenuClose
    }
  }

  render() {
    const children = this.props.menuData.children || []
    return (
      <div className={this._navMenuClassname()}>
        <div
          className={s.navHeader}
          onClick={() => {
            this._handleBackBtn()
          }}
        >
          <i className={s.navLeftArrow + ' fa fa-angle-left'} />
          <div className={s.navTitleContainer}>
            <h3 className={s.navTitle}>{this.props.menuData.title}</h3>
          </div>
        </div>
        <div className={s.navTopLine} />
        {children.map((linkObject, index) => {
          return <NavLink key={index} link={linkObject} handleClick={this._handleClick} />
        })}
      </div>
    )
  }
}

const NavLink = props => {
  return (
    <div
      className={s.navLinkContainer}
      onTouchTap={() => {
        props.handleClick(props.link)
      }}
    >
      <a
        id={props.iD}
        className={s.navLink}
        onTouchTap={() => {
          props.handleClick(props.link)
        }}
      >
        {props.link.title}
      </a>
      {/*<i className={s.navRightArrow + " fa fa-angle-right"}></i>*/}
    </div>
  )
}

function mapReduxStateToProps(reduxState) {
  return {}
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(ModalActions, dispatch)
  }
}

export default connect(mapReduxStateToProps, mapDispatchToProps)(MobileNav)

export { MobileNav }
