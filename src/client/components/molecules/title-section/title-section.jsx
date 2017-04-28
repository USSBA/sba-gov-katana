import React from "react"
import styles from "./title-section.scss";


class TitleSection extends React.Component{

    makeTitleLinks(sectionHeaders) {
        let titleLinks = [];
        titleLinks = sectionHeaders.map(function(item, index) {
            return (
                <li ><a className={styles.titleLink} href={"#" + item.id}>{item.text}</a></li>
            );
        });
        return titleLinks;
    }

    render(){
        let titleLinks = this.makeTitleLinks(this.props.sectionHeaders);
        return (<div className={styles.titleSection}>
                    <h1 className={styles.title}>{this.props.title}</h1>
                    <p className={styles.summary}>{this.props.summary}</p>
                    <hr className={styles.lineCopy}/>
                    <p className={styles.content}>Content</p>
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