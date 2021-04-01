import React from 'react'
import PropTypes from 'prop-types'
import { isEmpty } from 'lodash'

import styles from './program-page.scss'
import * as paragraphMapper from '../paragraph-mapper.jsx'
import { Hero } from 'organisms'

class ProgramPage extends React.Component {
  makeParagraphs(paragraphData) {
    const paragraphEventConfig = {
      callToAction: { category: 'Program-Page-Paragraph-CTA' },
      button: { category: 'Program-Page-Paragraph-ButtonCTA' },
      childPageMenu: { category: 'Program-Details-Learn-More' }
    }

    const paragraphList = paragraphMapper.makeParagraphs(
      paragraphData,
      null,
      this.props.lineage,
      paragraphEventConfig
    )

    return paragraphMapper.wrapParagraphs(paragraphList, {})
  }

  render() {
    const paragraphs = this.makeParagraphs(this.props.paragraphs)

    const { title, summary, buttons, bannerImage, zipCodeSearch } = this.props.heroData
    const hasBannerImage = bannerImage && bannerImage.hasOwnProperty('image')

    const _formattedButtons =
      !buttons || isEmpty(buttons)
        ? []
        : buttons.map((button, index) => {
            return {
              url: button.url,
              btnText: button.title
            }
          })

    return (
      <div>
        {hasBannerImage && (
          <Hero
            title={title}
            message={summary}
            buttons={_formattedButtons}
            imageUrl={bannerImage.image.url}
            alt={bannerImage.image.alt}
            zipCodeSearch={zipCodeSearch}
          />
        )}
        {!hasBannerImage && <Hero title={title} message={summary} buttons={_formattedButtons} />}
        <div className={styles.container}>{paragraphs}</div>
      </div>
    )
  }
}

React.defaultProps = {
  lineage: [],
  heroData: {},
  paragraphs: []
}

ProgramPage.propTypes = {
  lineage: PropTypes.array,
  heroData: PropTypes.object,
  paragraphs: PropTypes.array
}

export default ProgramPage
