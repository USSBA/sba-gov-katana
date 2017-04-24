import React from "react"
import styles from "./text-section.scss";


class TextSection extends React.Component{
    render(){
        return (<p className={styles.textSection} dangerouslySetInnerHTML={{__html: this.props.text}}/>);
    }
}

TextSection.propTypes ={
    text: React.PropTypes.string.isRequired
}

export default TextSection;
