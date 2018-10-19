import React from 'react'
import path from 'path'

import constants from '../../../services/constants'
import styles from './section-page.scss'
import { Button } from 'atoms'
import { RemoveMainLoader } from 'molecules'
import { MenuTileCollection } from 'organisms'
import { getLanguageOverride } from '../../../services/utils'
import { TEN_STEPS_CALLOUTS_TRANSLATIONS } from '../../../translations'

class SectionPage extends React.Component {
  equalsIgnoreCase(first, second) {
    return first.toUpperCase() === second.toUpperCase()
  }

  render() {
    const { sectionData } = this.props
    if (sectionData) {
      const sectionName = sectionData.title

      const { headline, linkText } = TEN_STEPS_CALLOUTS_TRANSLATIONS['panel'][getLanguageOverride(true)]

      let tenSteps
      if (sectionName === constants.sections.businessGuide) {
        // TODO: This is basically styled like a call to action component, but
        // it will refactored in the design soon.
        tenSteps = (
          <div className={styles.callToAction} id="business-guide-panel-10-steps-callout">
            <h6>{headline}</h6>
            <Button alternate children={linkText} fullWidth primary url={constants.routes.tenSteps} />
          </div>
        )
      }

      let tileCollection
      if (sectionName) {
        if (
          this.equalsIgnoreCase(sectionName, constants.sections.businessGuide) ||
          this.equalsIgnoreCase(sectionName, constants.sections.guiaDeNegocios)
        ) {
          tileCollection = <MenuTileCollection data={sectionData.children} splitTitle />
        } else if (
          this.equalsIgnoreCase(sectionName, constants.sections.fundingPrograms) ||
          this.equalsIgnoreCase(sectionName, constants.sections.programasDeFinanciamiento)
        ) {
          tileCollection = (
            <MenuTileCollection data={sectionData.children} neverDisplayChildrenOnHoverOverride />
          )
        } else if (
          this.equalsIgnoreCase(sectionName, constants.sections.forPartners) ||
          this.equalsIgnoreCase(sectionName, constants.sections.federalContracting) ||
          this.equalsIgnoreCase(sectionName, constants.sections.paraSocios) ||
          this.equalsIgnoreCase(sectionName, constants.sections.contratacionFederal)
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
