import React from 'react'
import s from "./bizguide-tile.scss"
import icon from "../../../../../public/assets/svg/business-guide-icon-color-plan.svg"
import backgroundLines from "../../../../../public/assets/svg/plan-background-lines.png"
import cornerLines from "../../../../../public/assets/images/corner-diagonal-lines-grey.png"

class BizguideTile extends React.Component {
    constructor(props) {
      super()
      this.state = {
        navMenuOpen: false  
      }
    }

  _formatLargeTitle(){
    return this.props.data.title.split(" ")[0]
  }

  _formatSmallTitle(){
    let arr = this.props.data.title.split(" ")
    arr.shift()
    return arr.join(" ")
  }

  _handleClick(){
    if(window.innerWidth <= 1080 && this.state.navMenuOpen === false) {
      this.setState({navMenuOpen: true})
    }
  }

  _handleClose(){
    console.log("oioioioioi")
    this.setState({navMenuOpen: false})
  }

  render() {
      return (
          <div id={this.props.iD} className={s.tile} onClick={() => {this._handleClick()}}>
            { this.state.navMenuOpen ? 
              <BizguideNavMenu 
                data={this.props.data}
                iconWhite={this.props.iconWhite}
                largeTitle={this._formatLargeTitle()} 
                smallTitle={this._formatSmallTitle()}
                handleClose={() => {this._handleClose()}}
              /> : null 
            }
            <BizguideTileHover 
              data={this.props.data} 
              iD={this.props.iD + '-hover'}
              largeTitle={this._formatLargeTitle()} 
              smallTitle={this._formatSmallTitle()}
              />
            <BizguideTileStatic 
              data={this.props.data} 
              iD={this.props.iD + '-static'}
              icon={this.props.icon} 
              largeTitle={this._formatLargeTitle()} 
              smallTitle={this._formatSmallTitle()}
              />
            <img className={s.backgroundLines} src={this.props.backgroundLines}/>
          </div>
      );
  }
}

class BizguideTileStatic extends React.Component {
  
  render() {
    return(
      <div id={this.props.iD} className={s.tileNormal}>
        <img id={this.props.iD + "-icon"} className={s.icon} src={this.props.icon}/>
          <div id={this.props.iD + "-title"} className={s.titleContainer}>
            <h2 className={s.largeTitle}>{this.props.largeTitle}</h2>
            <h4 className={s.smallTitle}>{this.props.smallTitle}</h4> 
          </div>
          <i className={s.rightArrow + " fa fa-angle-right"}></i>
          <div className={s.line}></div>
          <p id={this.props.iD + "-blurb"} className={s.blurb}>{this.props.data.description}</p>
          <img className={s.cornerLines} src={cornerLines}/>
      </div>
    );
  }
}

class BizguideTileHover extends React.Component {

  _handleClick(linkObject){
    document.location = linkObject.fullUrl
  }
  
  render() {
    return(
      <div id={this.props.iD} className={s.tileHover}>
        <h2 className={s.largeTitleHover}>{this.props.largeTitle}</h2>
        <h4 className={s.smallTitleHover}>{this.props.smallTitle}</h4> 
        <div className={s.topLine}></div>
        {
          this.props.data.children.map((object, index) => {
            return <HoverLink iD={this.props.iD + "-link-" + index } key={index} link={object} handleClick={this._handleClick}/>
          })
        }
      </div>
    );
  }
}

const HoverLink = (props) => 
  <div className={s.linkContainer} onClick={() => {props.handleClick(props.link)}}>
    <a id={props.iD} 
      className={s.link} 
      href={props.link.fullUrl}>
      {props.link.title}
    </a>
  </div>

class BizguideNavMenu extends React.Component {

  _handleClick(linkObject){
    document.location = linkObject.fullUrl
  }
  
  render() {
    return(
      <div className={s.navMenu}>
        <div className={s.navHeader} onClick={() => {this.props.handleClose()}}>
          <i className={s.navLeftArrow + " fa fa-angle-left"}></i>
          <img className={s.navIcon} src={this.props.iconWhite}/>
          <div className={s.navTitleContainer}>
            <h2 className={s.navLargeTitle}>{this.props.largeTitle}</h2>
            <h4 className={s.navSmallTitle}>{this.props.smallTitle}</h4> 
          </div>
        </div>
        <div className={s.navTopLine}></div>
        {
          this.props.data.children.map((linkObject, index) => {
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
    <i className={s.navRightArrow + " fa fa-angle-right"}></i>
  </div>

export default BizguideTile;

