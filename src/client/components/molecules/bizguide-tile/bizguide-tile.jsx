import React from 'react'
import s from "./bizguide-tile.scss";
import icon from "../../../../../public/assets/svg/business-guide-icon-color-plan.svg"
import backgroundLines from "../../../../../public/assets/svg/plan-background-lines.png"
import cornerLines from "../../../../../public/assets/images/corner-diagonal-lines-grey.png"



class BizguideTile extends React.Component {

  _formatLargeTitle(){
    return this.props.data.title.split(" ")[0]
  }

  _formatSmallTitle(){
    let arr = this.props.data.title.split(" ")
    arr.shift()
    return arr.join(" ")
  }

  _handleClick(){
    document.location = this.props.data.fullUrl
  }

  render() {
      return (
        <div className={s.tile} onClick={() => {this._handleClick()}}>
        	<img className={s.icon} src={this.props.icon}/>
          <div className={s.titleContainer}>
            <h2 className={s.largeTitle}>{this._formatLargeTitle()}</h2>
            <h4 className={s.smallTitle}>{this._formatSmallTitle()}</h4> 
          </div>
          <i className={s.rightArrow + " fa fa-angle-right"}></i>
        	<div className={s.line}></div>
        	<p className={s.blurb}>{this.props.data.description}</p>
        	<img className={s.backgroundLines} src={this.props.backgroundLines}/>
          <img className={s.cornerLines} src={cornerLines}/>
        </div>
      );
  }
}

export default BizguideTile;