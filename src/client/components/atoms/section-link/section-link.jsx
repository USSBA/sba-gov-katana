import React from 'react';
import styles from "./section-link.scss";

class SectionLink extends React.Component {
  render() {
    return (
      <span className={styles.link} onMouseOver={this.props.onMouseOver} onMouseOut={this.props.onMouseOut}>
        <a className={styles.sectionLink} href={this.props.url} onKeyDown={this.props.onKeyDown}>{this.props.text}</a>
        {this.props.children}
        {this.props.showTriangleMarker
          ? (
            <div className={styles.triangle}></div>
          )
          : undefined}
      </span>
    )
  }
}

SectionLink.defaultProps = {
  showTriangleMarker: false
}

SectionLink.propTypes = {
  text: React.PropTypes.string.isRequired,
  url: React.PropTypes.string.isRequired,
  showTriangleMarker: React.PropTypes.bool,
  onKeyDown: React.PropTypes.func
};

export default SectionLink;
