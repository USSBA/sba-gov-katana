import React from 'react';
import styles from './style-gray-background.scss';
import TextSection from "../../molecules/text-section/text-section.jsx";
import SectionHeader from "../../molecules/section-header/section-header.jsx";
import CardCollection from "../../molecules/card-collection/card-collection.jsx";

const ParagraphTypeToBeImplemented = ({data, index}) => {
    return (
        <p>{JSON.stringify(data)}</p>
    );
};

class StyleGrayBackground extends React.Component {

    componentWillMount() {}

    sectionHeaders = [];

    makeParagraphs(paragraphData) {
        let paragraphs = [];
        this.sectionHeaders = [];
        let parentIndex = this.props.parentIndex;
        paragraphs = paragraphData.map(function(item, index) {
            let paragraphGridStyle = styles.textSection;
            let paragraph = (<ParagraphTypeToBeImplemented key={index} data={item} index={index}/>);
            if (item && item.type) {
                if (item.type === "textSection") {
                    paragraphGridStyle = styles.textSection;
                    // DOMPurify is loaded from a minimize script tag in the header due to issues with jsdom and webpack
                    let cleaned = DOMPurify.sanitize(item.text);
                    paragraph = (<TextSection key={index} text={cleaned}/>);
                } else if (item.type === "sectionHeader") {
                    let sectionHeaderId = "grey-section-header-" + index;
                    paragraphGridStyle = styles.sectionHeader;
                    paragraph = (<SectionHeader key={index} refId={sectionHeaderId} text={item.text}/>);
                    this.sectionHeaders.push({id: sectionHeaderId, text: item.text});
                } else if(item.type === "cardCollection"){
                    paragraph = (<CardCollection parentIndex={index} key={index} cards={item.cards}/>);
                }
            }
            return (
                <div key={index} id={item.type + "-" + parentIndex + "-" + index} className={paragraphGridStyle}>{paragraph}</div>
            );
        }.bind(this));

        return paragraphs;
    }

    render() {
        let paragraphs = this.makeParagraphs(this.props.paragraphs);

        return (
            <div className={styles.greyParagraph}>
                {paragraphs}
            </div>
        );
    }
}

StyleGrayBackground.propTypes = {
    parentIndex: React.PropTypes.number
};

StyleGrayBackground.defaultProps = {
    parentIndex: -1
};

export default StyleGrayBackground;
