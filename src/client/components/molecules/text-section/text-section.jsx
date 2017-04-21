import React from "react"
import styles from "./text-section.scss";


class TextSection extends React.Component{
    render(){
        let dirty = this.props.text || "";
        // DOMPurify is loaded from a minimize script tag in the header due to issues with jsdom and webpack
        let cleaned = DOMPurify.sanitize(dirty);
        return (<p className={styles.textSection} dangerouslySetInnerHTML={{__html: cleaned}}/>);
    }
}

TextSection.propTypes ={
    text: React.PropTypes.string
}

export default TextSection;
