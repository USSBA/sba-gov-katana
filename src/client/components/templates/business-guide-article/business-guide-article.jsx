import React from 'react'
import styles from './business-guide-article.scss';
import TextSection from "../../molecules/text-section/text-section.jsx";
import SectionHeader from "../../molecules/section-header/section-header.jsx"
import ImageSection from "../../molecules/image-section/image-section.jsx"

const ParagraphTypeToBeImplemented = ({ data}) => {
  return (
    <p>{JSON.stringify(data)}</p>
  );
}

class BusinessGuideArticle extends React.Component {

  componentWillMount() {}

  makeParagraphs(paragraphData) {
    let paragraphs = [];
    paragraphs = paragraphData.map(function(item, i) {
      if (item && item.type) {
        if (item.type === "textSection") {
            // DOMPurify is loaded from a minimize script tag in the header due to issues with jsdom and webpack
            let cleaned = DOMPurify.sanitize(item.text);
            return (<TextSection key={i} text={cleaned}/>);
        } else if (item.type === "sectionHeader") {
            return (<SectionHeader key={i} index={i} text={item.text}/>);
        } else if (item.type === "image") {
          return (<ImageSection key={i} index={i} imageObj={item.image} captionText={item.captionText}/>)
        }
      } else {
        return (<ParagraphTypeToBeImplemented key={i} data={item}/>);
      }
    });
    return paragraphs;
  }

  render() {
    let paragraphs = this.makeParagraphs(this.props.paragraphs);
    return (
      <div className={styles.container}>{paragraphs}</div>
    );
  }
}

export default BusinessGuideArticle;
