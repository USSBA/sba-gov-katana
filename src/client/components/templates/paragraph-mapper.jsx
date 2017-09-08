import React from "react";
import _ from "lodash";
import {
  TextSection,
  SectionHeader,
  SubsectionHeader,
  ImageSection,
  TextReadMoreSection,
  Lookup,
  CallToAction,
  ParagraphPlaceholder,
  StyleGrayBackground,
  ReadMoreSection,
  ButtonCta,
  QuickLinks
} from "molecules";

import {
  CardCollection,
  SearchBox,
  ProgramDetailsCardCollection
} from "organisms";

function makeParagraphs(paragraphData = [], optionalSectionHeaderFunction, lineage) {

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
      } else if (item.type === "button") {
        paragraph = (<ButtonCta key={index} url={item.link.url} title={item.link.title}/>)
      } else if (item.type === "quickLinks") {
        paragraph = (<QuickLinks data={item}/>)
      } else if (item.type === "searchBox") {

          const {
            documentActivity,
            documentProgram,
            documentType,
            sectionHeaderText
          } = item.searchType[0];

          const searchBoxProps = {
            documentActivity,
            documentProgram,
            documentType,
            sectionHeaderText
          };

          paragraph = <SearchBox {...searchBoxProps} />;
          
      } else if (item.type === "childPageMenu" && item.pagesInclude === "All child pages") {

        const cards = lineage[0].children;
        paragraph = <ProgramDetailsCardCollection cards={cards} />;

      }
    }
    return {
      type: paragraphType,
      paragraph: paragraph
    };
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
      <div key={index} id={item.type + "-" + index} className={paragraphGridStyle}><div id={"paragraph-"+ (index+1)}>{item.paragraph}</div></div>
    );
  });
}

function makeSectionHeaderId(index) {
  let sectionHeaderId = "section-header-" + index;
  return sectionHeaderId;
}

export {makeParagraphs, wrapParagraphs, makeSectionHeaderId};
