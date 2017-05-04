import React from 'react'
import styles from './business-guide-article.scss';
import TextSection from "../../molecules/text-section/text-section.jsx";
import SectionHeader from "../../molecules/section-header/section-header.jsx";
import ImageSection from "../../molecules/image-section/image-section.jsx";
import TitleSection from "../../molecules/title-section/title-section.jsx";
import FeedbackForm from "../../molecules/feedback-form/feedback-form.jsx";
import TextReadMoreSection from "../../molecules/text-readmore-section/text-readmore-section.jsx";
import Lookup from "../../molecules/lookup/lookup.jsx"

const ParagraphTypeToBeImplemented = ({data, index}) => {
  return (
    <p>{JSON.stringify(data)}</p>
  );
}

class BusinessGuideArticle extends React.Component {

  componentWillMount() {}

  sectionHeaders = [];

  makeParagraphs(paragraphData) {
    let paragraphs = [];
    this.sectionHeaders = [];
    paragraphs = paragraphData.map(function(item, index, paragraphArray) {
      let paragraph = (<ParagraphTypeToBeImplemented key={index} data={item} index={index}/>);
      if (item && item.type) {
        if (item.type === "readMore") {
          paragraph = (
            <div></div>
          )
        } else if (item.type === "textSection") {
          if (paragraphArray[index + 1] && paragraphArray[index + 1].type === "readMore") {
            paragraph = (<TextReadMoreSection key={index} textSectionItem={item} readMoreSectionItem={paragraphArray[index + 1]}/>);
          } else {
            // DOMPurify is loaded from a minimize script tag in the header due to issues with jsdom and webpack
            let cleaned = DOMPurify.sanitize(item.text);
            paragraph = (<TextSection key={index} text={cleaned}/>);
          }
        } else if (item.type === "sectionHeader") {
          let sectionHeaderId = "section-header-" + index;
          paragraph = (<SectionHeader key={index} refId={sectionHeaderId} text={item.text}/>);
          this.sectionHeaders.push({id: sectionHeaderId, text: item.text});
        } else if (item.type === "image") {
          paragraph = (<ImageSection key={index} imageObj={item.image} captionText={item.captionText}/>);
        } else if (item.type === "lookup") {
          paragraph = (<Lookup key={index} title={item.sectionHeaderText} type={item.contactCategory} display={item.display}/>);
        }
      }
      return (
        <div key={index} id={item.type + "-" + index}>{paragraph}</div>
      );
    }.bind(this));

    return paragraphs;
  }

  render() {
    let paragraphs = this.makeParagraphs(this.props.paragraphs);
    return (
      <div className={styles.container}>
        <TitleSection sectionHeaders={this.sectionHeaders} title={this.props.title} summary={this.props.summary}/> {paragraphs}
        <FeedbackForm/>
      </div>
    );
  }
}

export default BusinessGuideArticle;
