import React from 'react'

import FederalContractingIcons from './icons.jsx'
import { TileCollection } from 'organisms'

class FederalContractingTileCollection extends React.Component {
  render() {
    if (!this.props.sectionData || !this.props.sectionData.children) {
      return <div />
    }
    return <TileCollection data={this.props.sectionData.children} icons={FederalContractingIcons} />
  }
}

FederalContractingTileCollection.defaultProps = {
  sectionData: []
}

export default FederalContractingTileCollection
