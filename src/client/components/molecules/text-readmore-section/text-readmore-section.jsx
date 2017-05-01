import React from "react"
import styles from "./text-readmore-section.scss";
import readMoreSectionStyles from "../readmore-section/readmore-section.scss";
import textSectionStyles from "../text-section/text-section.scss";
import TextSection from "../text-section/text-section.jsx";
import ReadMoreSection from "../readmore-section/readmore-section.jsx";

class TextReadMoreSection extends React.Component{

    render(){
        let cleaned = DOMPurify.sanitize(this.props.textSectionItem.text);
        return (<div className={styles.textReadMoreSection}>
            <div className={textSectionStyles.readMoreSectionClosed}><TextSection text={cleaned}/></div>
            <div className={readMoreSectionStyles.readMoreSectionClosed}><ReadMoreSection readMoreSectionItem={this.props.readMoreSectionItem}/></div>
        </div>);
    }
}

TextReadMoreSection.propTypes ={
    textSectionItem: React.PropTypes.object.isRequired,
    readMoreSectionItem: React.PropTypes.object.isRequired
};

export default TextReadMoreSection;