import React from 'react'
import s from "./tile.scss"
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as ModalActions from '../../../actions/show-modal.js'
import * as LocationChangeActions from '../../../actions/navigation.js';
import {BasicLink} from "../../atoms";

import cornerLines from "../../../../../public/assets/images/corner-diagonal-lines-grey.png"

class Tile extends React.Component {
  constructor() {
    super()
  }

  _formatLargeTitle() {
    return this.props.data.title.split(" ")[0]
  }

  _formatSmallTitle() {
    let arr = this.props.data.title.split(" ")
    arr.shift()
    return arr.join(" ")
  }

  _openNavMenu() {
    if (window.innerWidth <= 1080) {
      this.props.actions.showMobileSectionNav(this.props.data, this.props.iconWhite, false)
    } else if (this.props.topLevelLinks) {
      this.props.locationActions.locationChange(this.props.data.fullUrl, {
        action: "Landing Page Panel Pushed",
        label: document.location.pathname
      });
    }

  }

  _toggleTileClassOnTab() {
    if (this.state.displayMenuOnFocus === false) {
      return ""
    } else if (this.state.displayMenuOnFocus === true) {
      return s.tabChangeTileBackground
    }
  }

  _mouseEnterTile() {
    if (window.innerWidth >= 1080) {
      this.props.onFocus();
    }
  }

  _mouseExitTile() {
    if (window.innerWidth >= 1080) {
      this.props.onMouseExit();
    }
  }

  handleBlur(){
      if (window.innerWidth >= 1080 && this.props.hoverShowsInverseOnly) { // this hoverShowsInverseOnly is a hack to make this work on Funding Programs, but to continue to be broken in BG
        this.props.onBlur();
      }
  }

  handleKeyDown(event) {
    let code = (event.keyCode
      ? event.keyCode
      : event.which);
    if (code == 9 && event.shiftKey) {
      this.props.onTabBackwards(this.props.enteringInReverse);
    }
  }


  render() {
    let baseTileData = {
      data: this.props.data,
      icon: this.props.icon,
      iconWhite: this.props.iconWhite,
      largeTitle: this.props.splitTitle
        ? this._formatLargeTitle()
        : this.props.data.title,
      smallTitle: this.props.splitTitle
        ? this._formatSmallTitle()
        : "",
      uppercaseFirstWord: this.props.uppercaseFirstWord,
      onOpen: this._openNavMenu.bind(this)
    };

    let hoverTile = this.props.hoverShowsInverseOnly
      ? (<StaticTile {...baseTileData} inverse id={this.props.id + '-hover'}/>)
      : (<HoverTileWithHoverLinks {...baseTileData} id={this.props.id + '-hover'} locationActions={this.props.locationActions} autoFocusOnLast={this.props.enteringInReverse}/>);


    let widthStyle = null;
    switch(this.props.size){
        case 3: widthStyle = s.tileThree; break;
        case 5:widthStyle = s.tileFive; break;
        default: widthStyle = s.tileFour;
    }

    return (
      <div id={this.props.id} className={s.tile + " " + widthStyle} onClick={this._openNavMenu.bind(this)} onMouseEnter={this._mouseEnterTile.bind(this)} onMouseLeave={this._mouseExitTile.bind(this)}>
      <BasicLink text={`toggle ${this.props.data.title} menu`} myClassName={s.tabDisplayMenu} onClick={(e) => {
        e? e.preventDefault() : ""
      }} onFocus={this._mouseEnterTile.bind(this)} onBlur={this.handleBlur.bind(this)} onKeyDown={this.handleKeyDown.bind(this)}/>
        {this.props.showHover
          ? hoverTile
          : (<StaticTile id={this.props.id + '-static'} {...baseTileData}/>)}
        {this.props.backgroundLines
          ? <img className={s.backgroundLines} src={this.props.backgroundLines} alt=""/>
          : undefined}
      </div>
    );
  }
}

class StaticTile extends React.Component {

    onKeyDown(event){
        console.log(event)
        let code = (event.keyCode
          ? event.keyCode
          : event.which);
        if (code == 13) {
          this.props.onOpen();
        }
    }

  render() {
    let smallTitleComponent = this.props.smallTitle
      ? (
        <h4 className={s.smallTitle + " " + (this.props.uppercaseFirstWord
          ? s.upperCase
          : "")}>{this.props.smallTitle}</h4>
      )
      : undefined;
    return (
      <div id={this.props.id} className={s.tileNormal + " " + (this.props.inverse
        ? s.tileInverse
        : "")} tabIndex="0" onKeyDown={this.onKeyDown.bind(this)}>
        <img id={this.props.id + "-icon"} className={s.icon} src={this.props.inverse
          ? this.props.iconWhite
          : this.props.icon} alt=""/>
        <div id={this.props.id + "-title"} className={s.titleContainer + " " + (this.props.inverse
          ? s.titleInverse
          : "")}>
          <h2 className={s.largeTitle + " " + (this.props.uppercaseFirstWord
            ? s.upperCase
            : "")}>{this.props.largeTitle}</h2>
          {smallTitleComponent}
        </div>
        <i className={s.rightArrow + " fa fa-angle-right"}></i>
        <div className={s.line + " " + (this.props.inverse
          ? s.lineInverse
          : "")}></div>
        <p id={this.props.id + "-blurb"} className={s.blurb + " " + (this.props.inverse
          ? s.blurbInverse
          : "")}>{this.props.data.description}</p>
        <img className={s.cornerLines} src={cornerLines} alt=""/>
      </div>
    );
  }
}

class HoverTileWithHoverLinks extends React.Component {

  _handleClick(linkObject) {
    this.props.locationActions.locationChange(linkObject.fullUrl, {
      action: "Landing Page Link Pushed",
      label: document.location.pathname
    });
  }


  render() {
    return (
      <div id={this.props.id} className={s.tileHover}>
        <h2 className={s.largeTitleHover}>{this.props.largeTitle}</h2>
        <h4 className={s.smallTitleHover}>{this.props.smallTitle}</h4>
        <div className={s.topLine}></div>
        {this.props.data.children ? this.props.data.children.map((object, index) => {
          let autoFocusOnMe = this.props.autoFocusOnLast && index === (this.props.data.children.length - 1);

          return <HoverLink id={this.props.id + "-link-" + index} key={index} link={object} handleClick={this._handleClick.bind(this)}  autoFocus={autoFocusOnMe}/>
        })
: null}
      </div>
    );
  }
}

class HoverLink extends React.Component {
  componentDidMount() {
    if (this.props.autoFocus && this.me.focus) {
      this.me.focus();
    }
  }

  _handleKeyDown(e){
      if (e.keyCode == 13) {
        this.props.handleClick(this.props.link)
      }
  }

  render() {
    return (
      <div className={s.linkContainer} onClick={() => {
        this.props.handleClick(this.props.link)
      }}>
        <BasicLink text={this.props.link.title} id={this.props.id} myClassName={s.link} onKeyDown={this._handleKeyDown.bind(this)} ref={(me) => {
          this.me = me;
        }} />
      </div>
    );
  }
}

function mapReduxStateToProps(reduxState) {
  return {};
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(ModalActions, dispatch),
    locationActions: bindActionCreators(LocationChangeActions, dispatch)
  }
}
export default connect(mapReduxStateToProps, mapDispatchToProps)(Tile);
