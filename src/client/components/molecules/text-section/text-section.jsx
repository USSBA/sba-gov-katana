import React from "react"
import styles from "./text-section.scss";
class TextSection extends React.Component{


    render(){
        let text = this.props.text || "";
        console.log(text)
        let cleaned = this.props.text.replace(/(<? *script)/gi, 'illegalscript');
        console.log(cleaned)
        return (<p dangerouslySetInnerHTML={{__html: cleaned}}/>);
    }
}

TextSection.propTypes ={
    text: React.PropTypes.string
}

export default TextSection;
