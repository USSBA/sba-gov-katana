import React from 'react';
import styles from './program-page.scss';
import * as paragraphMapper from "../paragraph-mapper.jsx";
import Hero from '../../organisms/hero/hero.jsx';

class ProgramPage extends React.Component {

  makeParagraphs(paragraphData) {
    let paragraphList = paragraphMapper.makeParagraphs(paragraphData);
    let wrapperClassMapping = {
      other: styles.textSection,
      textSection: styles.textSection,
      readMore: styles.readMore,
      sectionHeader: styles.sectionHeader,
      image: styles.image,
      lookup: styles.lookup,
      callToAction: styles.callToAction,
      cardCollection: styles.cardCollection,
      styleGrayBackground: styles.styleGrayBackground
    };
    let wrapped = paragraphMapper.wrapParagraphs(paragraphList, wrapperClassMapping)
    return wrapped;
  }

  render() {

    let paragraphs = this.makeParagraphs(this.props.paragraphs);
    
    const { title, summary, buttons, bannerImage } = this.props.heroData
    const hasBannerImage = bannerImage.hasOwnProperty('image')

    return (
      <div>
        { hasBannerImage &&
          <Hero
            title={title}
            message={summary}
            buttons={buttons}
            imageUrl={bannerImage.image.url}
            alt={bannerImage.image.alt}
          />
        }
        { !hasBannerImage &&
          <Hero
            title={title}
            message={summary}
            buttons={buttons}
            alt={bannerImage.image.alt}
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
