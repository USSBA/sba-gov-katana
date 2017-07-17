import TextSection from "../../molecules/text-section/text-section.jsx";
import SectionHeader from "../../molecules/section-header/section-header.jsx";
import SubsectionHeader from "../../molecules/subsection-header/subsection-header.jsx"
import ImageSection from "../../molecules/image-section/image-section.jsx";
import FeedbackForm from "../../molecules/feedback-form/feedback-form.jsx";
import TextReadMoreSection from "../../molecules/text-readmore-section/text-readmore-section.jsx";
import Lookup from "../../molecules/lookup/lookup.jsx"
import CallToAction from "../../molecules/call-to-action/call-to-action.jsx"
import CardCollection from "../../molecules/card-collection/card-collection.jsx";

function makeParagraphs(paragraphData) {
  let paragraphs = [];
  paragraphs = paragraphData.map(function(item, index, paragraphArray) {
    let paragraph = (<ParagraphTypeToBeImplemented data={item} index={index}/>);
    let paragraphType = item.type;
    if (item && item.type) {
      if (item.type === "readMore") {
        return null
      } else if (item.type === "textSection") {
        let next = paragraphArray.length >= index + 1
          ? paragraphArray[index + 1];
        if (next && next.type === "readMore") {
          paragraphType = "textReadMoreSection";
          paragraph = (<TextReadMoreSection parentId={"text-readmore-section-" + index} textSectionItem={item} readMoreSectionItem={next}/>);
        } else {
          paragraph = (<TextSection text={item.text}/>);
        }
      } else if (item.type === "sectionHeader") {
        paragraph = (<SectionHeader refId={sectionHeaderId} text={item.text}/>);
      } else if (item.type === "subsectionHeader") {
        paragraph = (<SubsectionHeader text={item.text}/>);
      } else if (item.type === "image") {
        paragraph = (<ImageSection imageObj={item.image} captionText={item.captionText}/>);
      } else if (item.type === "lookup") {
        paragraph = (<Lookup title={item.sectionHeaderText} type="contacts" subtype={item.contactCategory} display={item.display}/>);
      } else if (item.type === "callToAction") {
        paragraph = (<CallToAction size={item.style} headline={item.headline} blurb={item.blurb} image={item.image} imageAlt={item.imageAlt} btnTitle={item.btnTitle} btnUrl={item.btnUrl} title={item.title}/>)
      } else if (item.type === "cardCollection") {
        paragraph = (<CardCollection parentIndex={index} cards={item.cards}/>);
      }
    }
    return {type: paragraphType, paragraph: paragraph};
  };

  return paragraphs;
}

function wrapParagraph(paragraphsList, wrapperClassMapping) {
  return paragraphsList.map((item, index) => {
    let paragraphGridStyle = wrapperClassMapping[item.type];
    return (
      <div key={index} id={item.type + "-" + index} className={paragraphGridStyle}>{item.paragraph}</div>
    );
  });
}

export {makeParagraphs, wrapParagraphs};
