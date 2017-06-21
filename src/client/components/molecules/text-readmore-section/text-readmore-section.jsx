import React from "react"
import styles from "./text-readmore-section.scss";
import TextSection from "../text-section/text-section.jsx";
import ReadMoreSection from "../readmore-section/readmore-section.jsx";

class TextReadMoreSection extends React.Component {

  constructor(props) {
    super();
    this.state = {
      readMoreExpanded: false
    };

    this.handleReadMoreStatus = this.handleReadMoreStatus.bind(this);
  }

  handleReadMoreStatus(readMoreStatus) {
    this.setState({readMoreExpanded: readMoreStatus});
  }
  makeTextSection(divStyle) {
    return (
      <div id={this.props.iD + "-text-section"} className={styles.textSectionSectionMobile}><TextSection text={cleaned}/></div>
    );
  }

  makeReadMoreSection(divStyle) {
    return (
      <div className={divStyle}><ReadMoreSection iD={this.props.iD + "-read-more"} readMoreStatus={this.handleReadMoreStatus} expanded={this.state.readMoreExpanded} readMoreSectionItem={this.props.readMoreSectionItem}/></div>
    );
  }

  render() {
    let cleaned = DOMPurify.sanitize(this.props.textSectionItem.text);
    let textReadMoreSection = this.state.readMoreExpanded
      ? (
        <div id={this.props.iD} className={styles.textReadMoreSection}>
          {this.makeReadMoreSection(styles.readMoreSectionExpanded)}
          {this.makeTextSection(styles.textSectionExpanded)}
        </div>
      )
      : (
        <div id={this.props.iD} className={styles.textReadMoreSection}>
          {this.makeTextSection(styles.textSectionClosed)}
          {this.makeReadMoreSection(styles.readMoreSectionClosed)}
        </div>
      );

    let textReadMoreSectionMobile = (
      <div className={styles.textReadMoreSection}>
        {this.makeReadMoreSection(styles.readMoreSectionMobile)}
        {this.makeTextSection(styles.textSectionSectionMobile)}
      </div>
    );

    return (
      <div>
        {textReadMoreSection}
        {textReadMoreSectionMobile}
      </div>
    );
  }
}

TextReadMoreSection.propTypes = {
  textSectionItem: React.PropTypes.object.isRequired,
  readMoreSectionItem: React.PropTypes.object.isRequired
};

export default TextReadMoreSection;
