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

    const _formattedButtons = buttons === undefined ? [] : (
        buttons.map((button) => {
           return {
            onClickHandler: function(e) {
              e.preventDefault()
              window.location.href = button.url
            },
            btnText: button.title,
            btnType: "LargeInversePrimaryButton"
          }
        })
      )

      const previousVersionsMockData = [{
        'version': 'Version 2',
        'date': 'Oct 17, 2015',
        'url': '#'
      }, {
        'version': 'Version 1',
        'date': 'Oct 24, 2014',
        'url': '#'
      }]

      const previousVersionsList = previousVersionsMockData.map(o => {
        return (
            <li><strong>{o.version}</strong> <strong>|</strong> Effective: {o.date}. <a href={o.url}>Download PDF <i className="fa fa-file-pdf-o" aria-hidden="true" /></a></li>
          )
      })

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
          <div>
            <h3>Previous versions</h3>
            <ul className={styles.previousVersionsList}>
              {previousVersionsList}
            </ul>
          </div>
          {paragraphs}
        </div>
      </div>
    );
  }
}

export default ProgramPage;
