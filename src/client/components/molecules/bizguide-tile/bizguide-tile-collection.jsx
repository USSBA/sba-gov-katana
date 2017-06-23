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
import iconPlan from "../../../../../public/assets/images/business-guide/business-guide-icon-color-plan.png"
import iconLaunch from "../../../../../public/assets/images/business-guide/business-guide-icon-color-launch.png"
import iconManage from "../../../../../public/assets/images/business-guide/business-guide-icon-color-manage.png"
import iconGrow from "../../../../../public/assets/images/business-guide/business-guide-icon-color-grow.png"
// import iconPlan from "!!file-loader?name=img/img-[hash:6].[ext]!../../../../../public/assets/svg/business-guide-icon-color-plan.svg"
// import iconLaunch from "!!file-loader?name=img/img-[hash:6].[ext]!../../../../../public/assets/svg/business-guide-icon-color-launch.svg"
// import iconManage from "!!file-loader?name=img/img-[hash:6].[ext]!../../../../../public/assets/svg/business-guide-icon-color-manage.svg"
// import iconGrow from "!!file-loader?name=img/img-[hash:6].[ext]!../../../../../public/assets/svg/business-guide-icon-color-grow.svg"
import iconWhitePlan from "../../../../../public/assets/svg/business-guide-icon-white-plan.svg"
import iconWhiteLaunch from "../../../../../public/assets/svg/business-guide-icon-white-launch.svg"
import iconWhiteManage from "../../../../../public/assets/svg/business-guide-icon-white-manage.svg"
import iconWhiteGrow from "../../../../../public/assets/svg/business-guide-icon-white-grow.svg"


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
      iconWhite: iconWhitePlan,
      background: backgroundPlan
    }, {
      icon: iconLaunch,
      iconWhite: iconWhiteLaunch,
      background: backgroundLaunch
    }, {
      icon: iconManage,
      iconWhite: iconWhiteManage,
      background: backgroundManage
    }, {
      icon: iconGrow,
      iconWhite: iconWhiteGrow,
      background: backgroundGrow
    }, ]

      return (
        <div>
          { this.props.sectionData.children ?
              this.props.sectionData.children.map((object, index) => {
                return <BizguideTile iD={'tile-' + index} key={index} data={object} icon={assetArr[index].icon} backgroundLines={assetArr[index].background} iconWhite={assetArr[index].iconWhite}/>
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
