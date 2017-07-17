import React from 'react';
import styles from './program-page.scss';
import * as paragraphMapper from "../paragraph-mapper.jsx";

class ProgramPage extends React.Component {

  makeParagraphs(paragraphData) {
    let paragraphList = paragraphMapper.makeParagraphs(paragraphData);
    let wrapperClassMapping = {
      textSection: styles.textSection,
      textReadMoreSection: "",
      sectionHeader: styles.sectionHeader,
      image: styles.image,
      lookup: styles.lookup,
      callToAction: styles.callToAction,
      cardCollection: styles.textSection,
      styleGrayBackground: styles.textSection
    };
    let wrapped = paragraphMapper.wrapParagraphs(paragraphList, wrapperClassMapping)
    return wrapped;
  }

  render() {
    let paragraphs = this.makeParagraphs(this.props.paragraphs);
    console.log(paragraphs);
    return (
      <div className={styles.container}>
        {paragraphs}
      </div>
    );
  }
}

export default ProgramPage;
