import React from "react";
import {Hero} from "organisms";
import * as paragraphMapper from "../paragraph-mapper.jsx";
import styles from "./program-page.scss";

class ProgramPage extends React.Component {

  makeParagraphs(paragraphData) {

    let paragraphList = paragraphMapper.makeParagraphs(paragraphData, null, this.props.lineage);
    let wrapperClassMapping = {
      other: styles.textSection,
      textSection: styles.textSection,
      readMore: styles.readMore,
      sectionHeader: styles.sectionHeader,
      image: styles.image,
      lookup: styles.lookup,
      callToAction: styles.callToAction,
      cardCollection: styles.cardCollection,
      styleGrayBackground: styles.styleGrayBackground,
      button: styles.button,
      quickLinks: styles.quickLinks,
      searchBox: styles.searchBox,
      childPageMenu:styles.childPageMenu
    };
    let wrapped = paragraphMapper.wrapParagraphs(paragraphList, wrapperClassMapping)
    return wrapped;
  }

  render() {

    let paragraphs = this.makeParagraphs(this.props.paragraphs);

    const { title, summary, buttons, bannerImage } = this.props.heroData
    const hasBannerImage = bannerImage.hasOwnProperty('image')

    const _formattedButtons = buttons === undefined ? [] : (
      buttons.map((button, index) => {
        return {
          url: button.url,
          btnText: button.title,
          btnType: index === 0 ? "LargeInversePrimaryButton" : "LargePrimaryButton",
          eventConfig: {category: "Program-Landing-CTA", action: button.title}
        };
      })
    )

    return (
      <div>
        { hasBannerImage &&
          <Hero
            title={title}
            message={summary}
            buttons={_formattedButtons}
            imageUrl={bannerImage.image.url}
            alt={bannerImage.image.alt}
          />
        }
        { !hasBannerImage &&
          <Hero
            title={title}
            message={summary}
            buttons={_formattedButtons}
          />
        }
        <div className={styles.container}>
          {paragraphs}
        </div>
      </div>
    );
  }
}

export default ProgramPage;
