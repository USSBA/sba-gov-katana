import React from "react"
import styles from "./text-section.scss";
class TextSection extends React.Component{


    render(){
        let text = this.props.text || "";
        return (<p dangerouslySetInnerHTML={{__html: this.props.text.replace(/(<? *script)/gi, 'illegalscript')}}/>);
    }
}

TextSection.propTypes ={
    text: React.PropTypes.string
}

export default TextSection;
