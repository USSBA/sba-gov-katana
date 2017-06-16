import React from 'react'
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import _ from 'lodash';
import * as ContentActions from "../../../actions/content.js";
import s from "./bizguide-tile-collection.scss";

import backgroundPlan from "../../../../../public/assets/svg/plan-background-lines.png"
import backgroundLaunch from "../../../../../public/assets/svg/launch-background-lines.png"
import backgroundManage from "../../../../../public/assets/svg/manage-background-lines.png"
import backgroundGrow from "../../../../../public/assets/svg/grow-background-lines.png"
import iconPlan from "../../../../../public/assets/svg/business-guide-icon-color-plan.svg"
import iconLaunch from "../../../../../public/assets/svg/business-guide-icon-color-launch.svg"
import iconManage from "../../../../../public/assets/svg/business-guide-icon-color-manage.svg"
import iconGrow from "../../../../../public/assets/svg/business-guide-icon-color-grow.svg"


import BizguideTile from "./bizguide-tile.jsx"

class BizguideTileCollection extends React.Component {

  _mapSection(){
    this.props.sectionData.children.map((value) => {
      console.log(value)
    })
  }

  render() {
    let assetArr = [{
      icon: iconPlan,
      hoverIcon: "",
      background: backgroundPlan
    }, {
      icon: iconLaunch,
      hoverIcon: "",
      background: backgroundLaunch
    }, {
      icon: iconManage,
      hoverIcon: "",
      background: backgroundManage
    }, {
      icon: iconGrow,
      hoverIcon: "",
      background: backgroundGrow
    }, ]

      return (
        <div>
          { this.props.sectionData.children ? 
              this.props.sectionData.children.map((object, index) => {
                return <BizguideTile key={index} data={object} icon={assetArr[index].icon} backgroundLines={assetArr[index].background} hoverIcon={assetArr[index].hoverIcon}/>
              }) : null
          }
        </div>
      );
  }
}

BizguideTileCollection.defaultProps = {
  sectionData: []
}

export default BizguideTileCollection;