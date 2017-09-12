import React from "react";
import {TileCollection} from "molecules";
import ForPartnersIcons from "./icons.jsx";

class ForPartnersTileCollection extends React.Component {

  render() {
    if (!this.props.sectionData || !this.props.sectionData.children) {
      return <div/>
    }
    return (<TileCollection data={this.props.sectionData.children} icons={ForPartnersIcons} topLevelLinks/>);
  }
}

ForPartnersTileCollection.defaultProps = {
  sectionData: []
}

export default ForPartnersTileCollection;
