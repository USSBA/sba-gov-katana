import React from 'react'
import s from "./bizguide-tile.scss";
import icon from "../../../../../public/assets/svg/business-guide-icon-color-plan.svg"
import backgroundLines from "../../../../../public/assets/svg/plan-background-lines.png"
import cornerLines from "../../../../../public/assets/images/corner-diagonal-lines-grey.png"



class BizguideTile extends React.Component {

  render() {
      return (
        <div className={s.tile}>
        	<img className={s.icon} src={icon}/>
          <div className={s.titleContainer}>
            <h2 className={s.largeTitle}>plan</h2>
            <h4 className={s.smallTitle}>your business</h4> 
          </div>
          <i className={s.rightArrow + " fa fa-angle-right"}></i>
        	<div className={s.line}></div>
        	<p className={s.blurb}>You've got a great idea. Now make a plan to turn it into a great business. Add a few more words here.</p>
        	<img className={s.backgroundLines} src={backgroundLines}/>
          <img className={s.cornerLines} src={cornerLines}/>
        </div>
      );
  }
}

export default BizguideTile;