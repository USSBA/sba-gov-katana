import React from 'react'
import s from "./mobile-nav.scss"
import * as ModalActions from '../../../../actions/show-modal.js'
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

class MobileNav extends React.Component {
  constructor(props) {
    super()
    this.state = {
      navMenu: "open"
    }
  }

   _formatLargeTitle(){
    return this.props.menuData.title.split(" ")[0]
  }

  _formatSmallTitle(){
    let arr = this.props.menuData.title.split(" ")
    arr.shift()
    return arr.join(" ")
  }

  _handleBackBtn(){
    this.props.actions.closeMobileNav()
  }

  _handleClick(linkObject){
    document.location = linkObject.fullUrl
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
      <div className={s.navMenuOpen}>
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
  <div className={s.navLinkContainer} onClick={() => {props.handleClick(props.link)}}>
    <a id={props.iD} 
      className={s.navLink} 
      href={props.link.fullUrl}>
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