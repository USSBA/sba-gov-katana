import React from 'react'
import path from 'path'

import { SECTIONS } from '../../../services/constants'
import styles from './section-page.scss'
import { Button } from 'atoms'
import { RemoveMainLoader } from 'molecules'
import { MenuTileCollection } from 'organisms'
import { getLanguageOverride } from '../../../services/utils'
import { TRANSLATIONS } from '../../../translations'

const { businessGuide, federalContracting, forPartners, fundingPrograms } = TRANSLATIONS

const equalsIgnoreCase = (first, second) => first.toUpperCase() === second.toUpperCase()

class SectionPage extends React.Component {
  render() {
    const { sectionData } = this.props
    if (sectionData) {
      const sectionName = sectionData.title
      const { headline, link, linkText } = TRANSLATIONS.tenStepsPanelCta[getLanguageOverride(true)]

      let tenSteps
      if (sectionName && equalsIgnoreCase(sectionName, SECTIONS.businessGuide.en.text)) {
        // TODO: This is basically styled like a call to action component, but
        // it will refactored in the design soon.
        tenSteps = (
          <div className={styles.callToAction} id="business-guide-panel-10-steps-callout">
            <h6>{headline}</h6>
            <Button alternate children={linkText} fullWidth primary url={link} />
          </div>
        )
      }

      let tileCollection
      if (sectionName) {
        if (
          equalsIgnoreCase(sectionName, SECTIONS.businessGuide.en.text) ||
          equalsIgnoreCase(sectionName, SECTIONS.businessGuide.es.text)
        ) {
          tileCollection = <MenuTileCollection data={sectionData.children} splitTitle />
        } else if (
          equalsIgnoreCase(sectionName, SECTIONS.fundingPrograms.en.text) ||
          equalsIgnoreCase(sectionName, SECTIONS.fundingPrograms.es.text)
        ) {
          tileCollection = (
            <MenuTileCollection data={sectionData.children} neverDisplayChildrenOnHoverOverride />
          )
        } else if (
          equalsIgnoreCase(sectionName, SECTIONS.forPartners.en.text) ||
          equalsIgnoreCase(sectionName, SECTIONS.forPartners.es.text) ||
          equalsIgnoreCase(sectionName, SECTIONS.federalContracting.en.text) ||
          equalsIgnoreCase(sectionName, SECTIONS.federalContracting.es.text)
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
