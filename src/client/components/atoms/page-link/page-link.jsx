import React from 'react';
import styles from "./page-link.scss"
import {BasicLink} from "atoms"

class PageLink extends React.Component {

  render() {
    let anchorClass = styles.link + " " + (this.props.visible
      ? ""
      : styles.hidden)
    const picked = (({id, text, url, onClick, onBlur}) => ({id, text, url, onClick, onBlur}))(this.props);
    return (
      <li className={styles.pageLink + " " + (this.props.indent
        ? styles.indent
        : "")}>
        <BasicLink {...picked} myClassName={anchorClass}/>
      </li>
    )
  }
}

PageLink.defaultProps = {
  url: "#",
  visible: true
}

// either url or onClick should be set
PageLink.propTypes = {
  text: React.PropTypes.string.isRequired,
  id: React.PropTypes.string,
  url: React.PropTypes.string,
  onClick: React.PropTypes.func,
  visible: React.PropTypes.bool,
  onBlur: React.PropTypes.func,
  indent: React.PropTypes.bool
};

export default PageLink;
