import React from "react";
import {TileCollection} from "molecules";
import icons from "./icons.jsx";
import s from "./disaster-tile-collection.scss"

class DisasterTileCollection extends React.Component {

  render() {
    if (!this.props.sectionData || !this.props.sectionData.children) {
      return <div/>
    }
    return (<TileCollection data={this.props.sectionData.children} icons={icons} hoverShowsInverseOnly topLevelLinks/>);
  }
}

DisasterTileCollection.defaultProps = {
  sectionData: []
}

export default DisasterTileCollection;
