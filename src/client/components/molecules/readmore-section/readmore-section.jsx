import React from "react"
import styles from "./readmore-section.scss";
import btnStyles from "../../atoms/small-secondary-button/small-secondary-button.scss";

class ReadMoreSection extends React.Component{
    constructor(props) {
        super();
        this.state = {
            expanded: false
        };
        this.handleClick = this.handleClick.bind(this);
    }
    handleClick(e){
        e.preventDefault();
        this.setState({expanded: !this.state.expanded});
    }
    render(){
        let btnText = this.state.expanded ? "CLOSE" :  "READ MORE";
        let expandedTextSection = this.state.expanded ? <p className={styles.expandedCopyText}>{this.props.expandedCopyText}</p> : "" ;

        return (<div className={styles.readMoreSection}>
            <h3 className={styles.title}>{this.props.titleText}</h3>
            <p className={styles.preview}>{this.props.preview}</p>
            {expandedTextSection}
            <button className={btnStyles.SmallSecondaryButton} href="#" onClick={this.handleClick}>{btnText}</button>
        </div>);
    }
}

ReadMoreSection.propTypes ={
    titleText: React.PropTypes.string.isRequired,
    preview: React.PropTypes.string.isRequired,
    expandedCopyText: React.PropTypes.string.isRequired
};

export default ReadMoreSection;