import React from 'react';
import _ from "lodash";

import TextSection from "../molecules/text-section/text-section.jsx";
import SectionHeader from "../molecules/section-header/section-header.jsx";
import SubsectionHeader from "../molecules/subsection-header/subsection-header.jsx"
import ImageSection from "../molecules/image-section/image-section.jsx";
import TextReadMoreSection from "../molecules/text-readmore-section/text-readmore-section.jsx";
import Lookup from "../molecules/lookup/lookup.jsx"
import CallToAction from "../molecules/call-to-action/call-to-action.jsx"
import CardCollection from "../organisms/card-collection/card-collection.jsx";
import ParagraphPlaceholder from "../molecules/paragraph-placeholder/paragraph-placeholder.jsx";
import StyleGrayBackground from "../molecules/style-gray-background/style-gray-background.jsx";
import ReadMoreSection from "../molecules/readmore-section/readmore-section.jsx";

function makeParagraphs(paragraphData = [], optionalSectionHeaderFunction) {
  let paragraphs = [];
  let skipNextReadmore = false;
  paragraphs = paragraphData.map(function(item, index, paragraphArray) {
    let paragraph = (<ParagraphPlaceholder data={item} index={index}/>);
    let paragraphType = item.type;
    if (item && item.type) {
      if (item.type === "readMore") {
        if (skipNextReadmore) {
          skipNextReadmore = false;
          return null;
        } else {
          let readmoreProps = {
            parentId: "-read-more",
            readMoreSectionItem: item
          }
          paragraph = (<ReadMoreSection {...readmoreProps}/>);
        }
      } else if (item.type === "textSection") {
        let next = paragraphArray.length >= index + 1
          ? paragraphArray[index + 1]
          : null;
        if (next && next.type === "readMore") {
          paragraphType = "textReadMoreSection";
          paragraph = (<TextReadMoreSection parentId={"text-readmore-section-" + index} textSectionItem={item} readMoreSectionItem={next}/>);
          skipNextReadmore = true
        } else {
          paragraph = (<TextSection text={item.text}/>);
        }
      } else if (item.type === "sectionHeader") {
        let sectionHeaderFunction = optionalSectionHeaderFunction || makeSectionHeaderId;
        paragraph = (<SectionHeader refId={sectionHeaderFunction(index)} text={item.text}/>);
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
      } else if (item.type === "styleGrayBackground") {
        paragraph = (<StyleGrayBackground parentIndex={index} key={index} paragraphs={item.paragraphs}/>);
      }
    }
    return {type: paragraphType, paragraph: paragraph};
  });

  return _.compact(paragraphs);
}

function wrapParagraphs(paragraphsList, wrapperClassMapping) {
  return paragraphsList.map((item, index) => {
    let paragraphGridStyle = wrapperClassMapping[item.type];
    if (!paragraphGridStyle) {
      paragraphGridStyle = wrapperClassMapping["other"]
    }
    return (
      <div key={index} id={item.type + "-" + index} className={paragraphGridStyle}>{item.paragraph}</div>
    );
  });
}

function makeSectionHeaderId(index) {
  let sectionHeaderId = "section-header-" + index;
  return sectionHeaderId;
}

export {makeParagraphs, wrapParagraphs, makeSectionHeaderId};
