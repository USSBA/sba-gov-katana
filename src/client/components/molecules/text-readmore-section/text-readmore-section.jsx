import React from "react"
import styles from "./text-readmore-section.scss";
import readMoreSectionStyles from "../readmore-section/readmore-section.scss";
import textSectionStyles from "../text-section/text-section.scss";
import TextSection from "../text-section/text-section.jsx";
import ReadMoreSection from "../readmore-section/readmore-section.jsx";

class TextReadMoreSection extends React.Component{

    constructor(props) {
        super();
        this.state = {
            readMoreExpanded: false
        };

        this.handleReadMoreStatus = this.handleReadMoreStatus.bind(this);
    }

    handleReadMoreStatus(readMoreStatus){
        this.setState({readMoreExpanded: readMoreStatus});
    }

    render(){
        let cleaned = DOMPurify.sanitize(this.props.textSectionItem.text);
        let textReadMoreSection = this.state.readMoreExpanded ? (
            <div className={styles.textReadMoreSection}>
                <div className={readMoreSectionStyles.readMoreSectionExpanded}><ReadMoreSection readMoreStatus={this.handleReadMoreStatus} expanded={this.state.readMoreExpanded} readMoreSectionItem={this.props.readMoreSectionItem}/></div>
                <div className={textSectionStyles.readMoreSectionExpanded}><TextSection text={cleaned}/></div>
           </div>
        ) :
            (<div className={styles.textReadMoreSection}>
                <div className={textSectionStyles.readMoreSectionClosed}><TextSection text={cleaned}/></div>
                <div className={readMoreSectionStyles.readMoreSectionClosed}><ReadMoreSection readMoreStatus={this.handleReadMoreStatus} expanded={this.state.readMoreExpanded}  readMoreSectionItem={this.props.readMoreSectionItem}/></div>
            </div>);
        return textReadMoreSection;
    }
}

TextReadMoreSection.propTypes ={
    textSectionItem: React.PropTypes.object.isRequired,
    readMoreSectionItem: React.PropTypes.object.isRequired
};

export default TextReadMoreSection;