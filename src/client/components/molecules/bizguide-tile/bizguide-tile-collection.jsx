import React from 'react'
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import _ from 'lodash';
import * as ContentActions from "../../../actions/content.js";
import s from "./bizguide-tile-collection.scss";
import svg from "../../../../../public/assets/svg/business-guide-icon-color-plan.svg"
import png from "../../../../../public/assets/svg/plan-background-lines.png"


import BizguideTile from "./bizguide-tile.jsx"

class BizguideTileCollection extends React.Component {

  _mapSection(){
    this.props.sectionData.children.map((value) => {
      console.log(value)
    })
  }

  render() {
    this._mapSection()
      return (
        <div>
          <BizguideTile />
          <BizguideTile />
          <BizguideTile />
          <BizguideTile />
        </div>
      );
  }
}

BizguideTileCollection.defaultProps = {
  sectionData: []
}

export default BizguideTileCollection;