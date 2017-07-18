import React from 'react'
import s from "./tile.scss"
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as ModalActions from '../../../actions/show-modal.js'

import cornerLines from "../../../../../public/assets/images/corner-diagonal-lines-grey.png"

class Tile extends React.Component {
  constructor() {
    super()
    this.state = {
      displayHoverMenu: false
    }
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
      this.setState({displayHoverMenu: true})
    }
  }

  _mouseExitTile() {
    if (window.innerWidth >= 1080) {
      this.setState({displayHoverMenu: false})
    }
  }

  _tabFocusTile() {
    this.setState({
      displayHoverMenu: !this.state.displayHoverMenu
    })
  }

  render() {
    let baseTileData = {
      data: this.props.data,
      icon: this.props.icon,
      iconWhite: this.props.iconWhite,
      largeTitle: this._formatLargeTitle(),
      smallTitle: this._formatSmallTitle()
    };

    let hoverTile = this.props.hoverShowsInverseOnly
      ? (<StaticTile {...baseTileData} inverse id={this.props.id + '-hover'}/>)
      : (<HoverTileWithHoverLinks {...baseTileData} id={this.props.id + '-hover'}/>);

    return (
      <div id={this.props.id} className={s.tile} onClick={() => {
        this._openNavMenu()
      }} onMouseEnter={() => {
        this._mouseEnterTile()
      }} onMouseLeave={() => {
        this._mouseExitTile()
      }}>
        <a className={s.tabDisplayMenu} href="" onClick={(e) => {
          e.preventDefault()
        }} onFocus={() => {
          this._mouseEnterTile()
        }}>toggle {this.props.data.title}
          menu</a>
        {this.state.displayHoverMenu
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

  render() {
    return (
      <div id={this.props.id} className={s.tileNormal + " " + (this.props.inverse
        ? s.tileInverse
        : "")}>
        <img id={this.props.id + "-icon"} className={s.icon} src={this.props.inverse
          ? this.props.iconWhite
          : this.props.icon} alt=""/>
        <div id={this.props.id + "-title"} className={s.titleContainer+ " " + (this.props.inverse
          ? s.titleInverse
          : "")}>
          <h2 className={s.largeTitle}>{this.props.largeTitle}</h2>
          <h4 className={s.smallTitle}>{this.props.smallTitle}</h4>
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
    document.location = linkObject.fullUrl
  }

  render() {
    return (
      <div id={this.props.id} className={s.tileHover}>
        <h2 className={s.largeTitleHover}>{this.props.largeTitle}</h2>
        <h4 className={s.smallTitleHover}>{this.props.smallTitle}</h4>
        <div className={s.topLine}></div>
        {this.props.data.children.map((object, index) => {
          return <HoverLink id={this.props.id + "-link-" + index} key={index} link={object} handleClick={this._handleClick}/>
        })
}
      </div>
    );
  }
}

const HoverLink = (props) => <div className={s.linkContainer} onClick={() => {
  props.handleClick(props.link)
}}>
  <a id={props.id} className={s.link} href={props.link.fullUrl}>
    {props.link.title}
  </a>
</div>

function mapReduxStateToProps(reduxState) {
  return {};
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(ModalActions, dispatch)
  }
}
export default connect(mapReduxStateToProps, mapDispatchToProps)(Tile);
