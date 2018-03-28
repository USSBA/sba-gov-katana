import React from 'react'
import path from 'path'

import constants from '../../../services/constants.js'
import styles from './section-page.scss'
import { RemoveMainLoader, SimpleCta } from 'molecules'
import {
  MenuTileCollection,
  ForPartnersTileCollection,
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
          <div className={styles.nineStepsCtaContainer}>
            <SimpleCta
              id="business-guide-panel-10-steps-callout"
              actionText="Start your business in 10 steps"
              buttonText="SEE THE GUIDE"
              url={constants.routes.tenSteps}
              eventCategory="Ten Steps CTA"
              labelCategory="Small"
            />
          </div>
        )
      }

      let tileCollection
      if (this.equalsIgnoreCase(sectionName, constants.sections.businessGuide)) {
        tileCollection = <MenuTileCollection data={sectionData.children} />
      } else if (this.equalsIgnoreCase(sectionName, constants.sections.fundingPrograms)) {
        tileCollection = <FundingProgramsTileCollection sectionData={sectionData} />
      } else if (this.equalsIgnoreCase(sectionName, constants.sections.forPartners)) {
        tileCollection = <ForPartnersTileCollection sectionData={sectionData} />
      } else if (this.equalsIgnoreCase(sectionName, constants.sections.federalContracting)) {
        tileCollection = <FederalContractingTileCollection sectionData={sectionData} />
      } else {
        console.error('Unable to find matching section')
      }

      return (
        <div className={styles.container}>
          <RemoveMainLoader />
          <div className={styles.tiles}>{tileCollection}</div>
          {tenSteps}
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
