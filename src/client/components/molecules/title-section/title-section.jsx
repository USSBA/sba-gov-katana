import React from "react"
import styles from "./title-section.scss";


class TitleSection extends React.Component{

    makeTitleLinks(paragraphData) {
        let titleLinks = [];
        titleLinks = paragraphData.map(function(item, index) {
            return (
            (item && item.type === "sectionHeader") ? <li><a href={"#section-header" + "-" + index}>{item.text}</a></li> : ""
            );
        });
        return titleLinks;
    }

    render(){
        let titleLinks = this.makeTitleLinks(this.props.paragraphs);
        return (<div className={styles.titleSection}>
                    <h1>{this.props.title}</h1>
                    <p>{this.props.summary}</p>
                    <hr/>
                    <p>Content</p>
                    <ul>{titleLinks}</ul>
                </div>);
    }
}

TitleSection.propTypes ={
    title: React.PropTypes.string.isRequired,
    summary: React.PropTypes.string.isRequired
};

export default TitleSection;