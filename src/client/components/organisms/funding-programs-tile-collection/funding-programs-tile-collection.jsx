import React from "react";
import {TileCollection} from "organisms";
import FundingProgramsIcons from "./icons.jsx";

class FundingProgramsTileCollection extends React.Component {

  render() {
    if (!this.props.sectionData || !this.props.sectionData.children) {
      return <div/>
    }
    return (<TileCollection data={this.props.sectionData.children} icons={FundingProgramsIcons} neverDisplayChildrenOnHoverOverride/>);
  }
}

FundingProgramsTileCollection.defaultProps = {
  sectionData: []
}

export default FundingProgramsTileCollection;
