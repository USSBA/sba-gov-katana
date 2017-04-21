import React from "react"
import styles from "./text-section.scss";

// const createDOMPurify = require('dompurify');
// const jsdom = require('jsdom');
// const window = jsdom.jsdom().defaultView;
// const DOMPurify = createDOMPurify(window);



class TextSection extends React.Component{
    render(){
        let dirty = this.props.text || "";
        let cleaned = dirty;
        // const clean = DOMPurify.sanitize(dirty);
        return (<p className={styles.textSection} dangerouslySetInnerHTML={{__html: cleaned}}/>);
    }
}

TextSection.propTypes ={
    text: React.PropTypes.string
}

export default TextSection;
