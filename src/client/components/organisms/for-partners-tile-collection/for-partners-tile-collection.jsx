import React from 'react'

import ForPartnersIcons from './icons.jsx'
import { TileCollection } from 'organisms'

class ForPartnersTileCollection extends React.Component {
  render() {
    if (!this.props.sectionData || !this.props.sectionData.children) {
      return <div />
    }
    return <TileCollection data={this.props.sectionData.children} icons={ForPartnersIcons} />
  }
}

ForPartnersTileCollection.defaultProps = {
  sectionData: []
}

export default ForPartnersTileCollection
