import React from 'react'
import path from 'path'
import { camelCase } from 'lodash'

import constants from '../../../services/constants.js'
import styles from './section-page.scss'
import { RemoveMainLoader, SimpleCta } from 'molecules'
import {
  MenuTileCollection,
  FundingProgramsTileCollection,
  FederalContractingTileCollection
} from 'organisms'

class SectionPage extends React.Component {
  equalsIgnoreCase(first, second) {
    return first.toUpperCase() === second.toUpperCase()
  }

  render() {
    if (this.props.sectionData) {
      const sectionData = this.props.sectionData
      const sectionName = this.props.sectionData.title

      let tenSteps
      if (sectionName === constants.sections.businessGuide) {
        tenSteps = (
          <SimpleCta
            id="business-guide-panel-10-steps-callout"
            actionText="Start your business in 10 steps"
            buttonText="SEE THE GUIDE"
            url={constants.routes.tenSteps}
            eventCategory="Ten Steps CTA"
            labelCategory="Small"
          />
        )
      }

      let tileCollection
      if (this.equalsIgnoreCase(sectionName, constants.sections.businessGuide)) {
        tileCollection = <MenuTileCollection data={sectionData.children} splitTitle />
      } else if (this.equalsIgnoreCase(sectionName, constants.sections.fundingPrograms)) {
        tileCollection = <FundingProgramsTileCollection sectionData={sectionData} />
      } else if (this.equalsIgnoreCase(sectionName, constants.sections.forPartners)) {
        tileCollection = <MenuTileCollection data={sectionData.children} />
      } else if (this.equalsIgnoreCase(sectionName, constants.sections.federalContracting)) {
        tileCollection = <FederalContractingTileCollection sectionData={sectionData} />
      } else {
        console.error('Unable to find matching section')
      }

      return (
        <div>
          <RemoveMainLoader />
          <div className={styles.tiles}>
            {tileCollection}
            {tenSteps}
          </div>
        </div>
      )
    }
    return <div>Loading....</div>
  }
}

SectionPage.defaultProps = {
  sectionData: []
}

export default SectionPage
