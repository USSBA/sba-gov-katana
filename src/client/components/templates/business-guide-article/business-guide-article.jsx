import React from 'react'
import styles from './business-guide-article.scss';
import TextSection from "../../molecules/text-section/text-section.jsx";
import SectionHeader from "../../molecules/section-header/section-header.jsx";
import ImageSection from "../../molecules/image-section/image-section.jsx";
import TitleSection from "../../molecules/title-section/title-section.jsx";

const ParagraphTypeToBeImplemented = ({data, index}) => {
  return (
    <p>{JSON.stringify(data)}</p>
  );
}

class BusinessGuideArticle extends React.Component {

  componentWillMount() {}

  makeParagraphs(paragraphData) {
    let paragraphs = [];
    paragraphs = paragraphData.map(function(item, index) {
      let paragraph = (<ParagraphTypeToBeImplemented key={index} data={item} index={index}/>);
      if (item && item.type) {
        if (item.type === "textSection") {
          // DOMPurify is loaded from a minimize script tag in the header due to issues with jsdom and webpack
          let cleaned = DOMPurify.sanitize(item.text);
          paragraph = (<TextSection key={index} text={cleaned}/>);
        } else if (item.type === "sectionHeader") {
          paragraph = (<SectionHeader key={index} text={item.text}/>);
        } else if (item.type === "image") {
          paragraph = (<ImageSection key={index} imageObj={item.image} captionText={item.captionText}/>)
        }
      }
      return (

        <div key={index} id={item.type + "-" + index}>{paragraph}</div>
      );
    });
    return paragraphs;
  }

  render() {
    let paragraphs = this.makeParagraphs(this.props.paragraphs);
    return (
      <div className={styles.container}>
          <TitleSection paragraphs={this.props.paragraphs} title={this.props.title} summary={this.props.summary}/>
          {paragraphs}
      </div>
    );
  }
}

export default BusinessGuideArticle;
