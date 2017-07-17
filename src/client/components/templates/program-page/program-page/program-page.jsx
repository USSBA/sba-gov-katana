import React from 'react';
import styles from './funding-programs-page.scss';
import TextSection from "../../molecules/text-section/text-section.jsx";
import SectionHeader from "../../molecules/section-header/section-header.jsx";
import ImageSection from "../../molecules/image-section/image-section.jsx";
import TextReadMoreSection from "../../molecules/text-readmore-section/text-readmore-section.jsx";
import Lookup from "../../molecules/lookup/lookup.jsx";
import CallToAction from "../../molecules/call-to-action/call-to-action.jsx";
import CardCollection from "../../molecules/card-collection/card-collection.jsx";
import StyleGrayBackground from "../../molecules/style-gray-background/style-gray-background.jsx";

const ParagraphTypeToBeImplemented = ({data, index}) => {
    return (
        <p>{JSON.stringify(data)}</p>
    );
};

class FundingProgramsPage extends React.Component {

    componentWillMount() {}

    sectionHeaders = [];

    makeParagraphs(paragraphData) {
        let paragraphs = [];
        this.sectionHeaders = [];
        paragraphs = paragraphData.map(function(item, index, paragraphArray) {
            let paragraphGridStyle = styles.textSection;
            let paragraph = (<ParagraphTypeToBeImplemented key={index} data={item} index={index}/>);
            if (item && item.type) {
                if (item.type === "readMore") {
                    paragraph = (
                        <div></div>
                    )
                } else if (item.type === "textSection") {
                    if (paragraphArray[index + 1] && paragraphArray[index + 1].type === "readMore") {
                        paragraphGridStyle = styles.textSection;
                        paragraph = (<TextReadMoreSection key={index} textSectionItem={item} readMoreSectionItem={paragraphArray[index + 1]}/>);
                    } else {
                        paragraphGridStyle = styles.textSection;
                        // DOMPurify is loaded from a minimize script tag in the header due to issues with jsdom and webpack
                        let cleaned = DOMPurify.sanitize(item.text);
                        paragraph = (<TextSection key={index} text={cleaned}/>);
                    }
                } else if (item.type === "sectionHeader") {
                    let sectionHeaderId = "section-header-" + index;
                    paragraphGridStyle = styles.sectionHeader;
                    paragraph = (<SectionHeader key={index} refId={sectionHeaderId} text={item.text}/>);
                    this.sectionHeaders.push({id: sectionHeaderId, text: item.text});
                } else if (item.type === "image") {
                    paragraphGridStyle = styles.image;
                    paragraph = (<ImageSection key={index} imageObj={item.image} captionText={item.captionText}/>);
                } else if (item.type === "lookup") {
                    paragraphGridStyle = styles.lookup;
                    paragraph = (<Lookup key={index} title={item.sectionHeaderText} type="contacts" subtype={item.contactCategory} display={item.display}/>);
                } else if (item.type === "callToAction") {
                    paragraphGridStyle = styles.callToAction;
                    paragraph = (<CallToAction key={index}
                                               size={item.style}
                                               headline={item.headline}
                                               blurb={item.blurb}
                                               image={item.image}
                                               imageAlt={item.imageAlt}
                                               btnTitle={item.btnTitle}
                                               btnUrl={item.btnUrl} />)
                } else if(item.type === "cardCollection"){
                    paragraph = (<CardCollection parentIndex={index} key={index} cards={item.cards}/>);
                } else if(item.type === "styleGrayBackground"){
                    paragraph = (<StyleGrayBackground parentIndex={index} key={index} paragraphs={item.paragraphs}/>);
                }
            }
            return (
                <div key={index} id={item.type + "-" + index} className={paragraphGridStyle}>{paragraph}</div>
            );
        }.bind(this));

        return paragraphs;
    }


    render() {
        let paragraphs = this.makeParagraphs(this.props.paragraphs);

        return (
            <div className={styles.container}>
                 {paragraphs}
            </div>
        );
    }
}

export default FundingProgramsPage;
