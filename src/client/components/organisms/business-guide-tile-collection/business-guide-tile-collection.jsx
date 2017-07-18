import React from 'react'
import BusinessGuideIcons from "./icons.jsx";
import TileCollection from "../../molecules/tile-collection/tile-collection.jsx";

class BusinessGuideTileCollection extends React.Component {

  render() {
    if (!this.props.sectionData || !this.props.sectionData.children) {
      return <div/>
    }
    return (<TileCollection data={this.props.sectionData.children} icons={BusinessGuideIcons}/>);
  }
}

BusinessGuideTileCollection.defaultProps = {
  sectionData: []
}

export default BusinessGuideTileCollection;
