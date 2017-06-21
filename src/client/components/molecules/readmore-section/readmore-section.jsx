import React from "react"
import styles from "./readmore-section.scss";
import {SmallSecondaryButton} from "../../atoms";

class ReadMoreSection extends React.Component{

    handleClick(e){
        e.preventDefault();
        this.props.readMoreStatus(!this.props.expanded);
    }
    render(){
        let btnText = this.props.expanded ? "CLOSE" :  "READ MORE";
        let expandedTextSection = this.props.expanded ? <p className={styles.expandedCopyText}>{this.props.readMoreSectionItem.expandedCopyText}</p> : "" ;
        let expandedHr = this.props.expanded ? <hr className={styles.lineCopy}/> : "";
        return (<div className={styles.readMoreSection}>
            <h3 id={this.props.iD + "-title"} className={styles.title}>{this.props.readMoreSectionItem.titleText}</h3>
            <p id={this.props.iD + "-preview"} className={styles.preview}>{this.props.readMoreSectionItem.preview}</p>
            {expandedHr}
            {expandedTextSection}
            <SmallSecondaryButton id={this.props.iD + "-btn"} extraClassName={styles.readMore} text={btnText} onClick={this.handleClick.bind(this)}/>
        </div>);
    }
}

ReadMoreSection.propTypes ={
    readMoreSectionItem: React.PropTypes.object.isRequired,
    expanded: React.PropTypes.bool.isRequired,
    readMoreStatus: React.PropTypes.func.isRequired
};

export default ReadMoreSection;
