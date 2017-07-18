import React from 'react'
import FundingProgramsIcons from "./icons.jsx";
import TileCollection from "../../molecules/tile-collection/tile-collection.jsx";

class FundingProgramsTileCollection extends React.Component {

  render() {
    if (!this.props.sectionData || !this.props.sectionData.children) {
      return <div/>
    }
    return (<TileCollection data={this.props.sectionData.children} icons={FundingProgramsIcons} hoverShowsInverseOnly />);
  }
}

FundingProgramsTileCollection.defaultProps = {
  sectionData: []
}

export default FundingProgramsTileCollection;
