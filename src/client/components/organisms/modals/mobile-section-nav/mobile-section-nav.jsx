import React from 'react'
import s from "./mobile-section-nav.scss"
import * as ModalActions from '../../../../actions/show-modal.js'
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {
  navigateNow
} from "../../../../services/navigation";

class MobileNav extends React.Component {
  constructor(props) {
    super()
    this.state = {
      navMenu: "open"
    }
    this._formatLargeTitle = this._formatLargeTitle.bind(this);
    this._formatSmallTitle = this._formatSmallTitle.bind(this);
    this._animationTimer = this._animationTimer.bind(this);
    this._handleBackBtn = this._handleBackBtn.bind(this);
    this._handleClick = this._handleClick.bind(this);
    this._navMenuClassname = this._navMenuClassname.bind(this);
  }

   _formatLargeTitle(){
    return this.props.menuData.title.split(" ")[0]
  }

  _formatSmallTitle(){
    let arr = this.props.menuData.title.split(" ")
    arr.shift()
    return arr.join(" ")
  }

  _animationTimer() {
    setTimeout(() => {
      this.props.actions.closeMobileNav()
    }, 1000)
  }

  _handleBackBtn() {
    if (this.props.backUrl !== false) {
      this.props.actions.closeMobileNav()
      navigateNow(this.props.backUrl);
    } else {
      this.setState({
        navMenu: "close"
      }, this._animationTimer);
    }
  }

  _handleClick(linkObject){
    // this.props.actions.closeMobileNav();
    this.setState({
      navMenu: "close"
    }, this._animationTimer);
    navigateNow(linkObject.fullUrl);
  }

  _navMenuClassname(){
    if(this.state.navMenu === "open"){
      return s.navMenuOpen
    } else if(this.state.navMenu === "close"){
      return s.navMenuClose
    }
  }
  
  render() {
    return(
      <div className={this._navMenuClassname()}>
        <div className={s.navHeader} onClick={() => {this._handleBackBtn()}}>
          <i className={s.navLeftArrow + " fa fa-angle-left"}></i>
          <img className={s.navIcon} src={this.props.icon} alt=""/>
          <div className={s.navTitleContainer}>
            <h2 className={s.navLargeTitle}>{this._formatLargeTitle()}</h2>
            <h4 className={s.navSmallTitle}>{this._formatSmallTitle()}</h4> 
          </div>
        </div>
        <div className={s.navTopLine}></div>
        {
          this.props.menuData.children.map((linkObject, index) => {
            return <NavLink key={index} link={linkObject} handleClick={this._handleClick}/>
          })
        }
     </div>
    );
  }
}

const NavLink = (props) =>
  <div className={s.navLinkContainer} onTouchTap={() => {props.handleClick(props.link)}}>
    <a id={props.iD}
      className={s.navLink}
       onTouchTap={() => {props.handleClick(props.link)}}>
      {props.link.title}
    </a>
    {/*<i className={s.navRightArrow + " fa fa-angle-right"}></i>*/}
  </div>

function mapReduxStateToProps(reduxState) {
  return {};
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(ModalActions, dispatch)
  }
}

export default connect(mapReduxStateToProps, mapDispatchToProps)(MobileNav);