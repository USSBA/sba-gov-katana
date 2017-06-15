import React from 'react'
import s from "./bizguide-tile-collection.scss";
import svg from "../../../../../public/assets/svg/business-guide-icon-color-plan.svg"
import png from "../../../../../public/assets/svg/plan-background-lines.png"

import BizguideTile from "./bizguide-tile.jsx"

class BizguideTileCollection extends React.Component {

  render() {
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