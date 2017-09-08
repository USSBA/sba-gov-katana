import React from "react";
import styles from "./title-section.scss";


class TitleSection extends React.Component{

    makeTitleLinks(sectionHeaders) {
        let titleLinks = [];
        titleLinks = sectionHeaders.map(function(item, index) {
            return (
                <li id={"titleSectionLinkId" + index} key={index}><a className={styles.titleLink} href={"#" + item.id}>{item.text}</a></li>
            );
        });
        return titleLinks;
    }

    render(){
        let titleLinks = this.makeTitleLinks(this.props.sectionHeaders);
        return (<div id="titleSectionId" className={styles.titleSection + " " + this.props.gridClass}>
                    <h1 id="titleSectionTitleId" className={styles.title}>{this.props.title}</h1>
                    <h5 id="titleSectionSummaryId" className={styles.summary}>{this.props.summary}</h5>
                    <hr className={styles.lineCopy}/>
                    <p id="titleSectionContentId" className={styles.content}>Content</p>
                    <ul>{titleLinks}</ul>
                    <hr className={styles.hrLine}/>
                </div>);
    }
}

TitleSection.propTypes ={
    title: React.PropTypes.string.isRequired,
    summary: React.PropTypes.string.isRequired
};

export default TitleSection;
