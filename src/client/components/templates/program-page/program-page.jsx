import React from 'react'
import { Hero } from 'organisms'
import * as paragraphMapper from '../paragraph-mapper.jsx'
import styles from './program-page.scss'

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
    let paragraphs = this.makeParagraphs(this.props.paragraphs)

    const { title, summary, buttons, bannerImage } = this.props.heroData
    const hasBannerImage = bannerImage.hasOwnProperty('image')

    const _formattedButtons =
      buttons === undefined
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
          />
        )}
        {!hasBannerImage && <Hero title={title} message={summary} buttons={_formattedButtons} />}
        <div className={styles.contentContainer}>{paragraphs}</div>
      </div>
    )
  }
}

export default ProgramPage
