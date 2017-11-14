import React from 'react'
import { TileCollection } from 'organisms'
import BusinessGuideIcons from './icons.jsx'

class BusinessGuideTileCollection extends React.Component {
  render() {
    if (!this.props.sectionData || !this.props.sectionData.children) {
      return <div />
    }
    return (
      <TileCollection
        data={this.props.sectionData.children}
        icons={BusinessGuideIcons}
        splitTitle
      />
    )
  }
}

BusinessGuideTileCollection.defaultProps = {
  sectionData: []
}

export default BusinessGuideTileCollection
