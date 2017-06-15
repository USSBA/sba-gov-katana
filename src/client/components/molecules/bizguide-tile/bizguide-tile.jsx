import React from 'react'
import s from "./bizguide-tile.scss";
import svg from "../../../../../public/assets/svg/business-guide-icon-color-plan.svg"
import png from "../../../../../public/assets/svg/plan-background-lines.png"

class BizguideTile extends React.Component {

  render() {
      return (
        <div className={s.tile}>
        	<img className={s.icon} src={svg}/>
        	<h2 className={s.largeTitle}>plan</h2>
        	<h4 className={s.smallTitle}>your business</h4>
        	<div className={s.line}></div>
        	<p className={s.blurb}>You've got a great idea. Now make a plan to turn it into a great business. Add a few more words here.</p>
        	<img className={s.backgroundLines} src={png}/>
        </div>
      );
  }
}

export default BizguideTile;