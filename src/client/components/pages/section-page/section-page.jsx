import React from 'react'
import path from 'path'

import constants from '../../../services/constants.js'
import styles from './section-page.scss'
import { Button } from 'atoms'
import { RemoveMainLoader } from 'molecules'
import { MenuTileCollection } from 'organisms'

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
        // TODO: This is basically styled like a call to action component, but
        // it will refactored in the design soon.
        tenSteps = (
          <div className={styles.callToAction} id="business-guide-panel-10-steps-callout">
            <h6>Start your business in 10 steps</h6>
            <Button alternate children="See the guide" fullWidth primary url={constants.routes.tenSteps} />
          </div>
        )
      }

      let tileCollection
      if (sectionName) {
        if (this.equalsIgnoreCase(sectionName, constants.sections.businessGuide)) {
          tileCollection = <MenuTileCollection data={sectionData.children} splitTitle />
        } else if (this.equalsIgnoreCase(sectionName, constants.sections.fundingPrograms)) {
          tileCollection = (
            <MenuTileCollection data={sectionData.children} neverDisplayChildrenOnHoverOverride />
          )
        } else if (
          this.equalsIgnoreCase(sectionName, constants.sections.forPartners) ||
          this.equalsIgnoreCase(sectionName, constants.sections.federalContracting)
        ) {
          tileCollection = <MenuTileCollection data={sectionData.children} />
        } else {
          console.error('Unable to find matching section')
        }
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
