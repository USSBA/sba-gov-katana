import React from 'react';
import styles from "./utility-link.scss"

class UtilityLink extends React.Component {

  render() {
    let anchorClass = styles.link + " " + (this.props.visible
      ? ""
      : styles.hidden)
    return (
      <li className={styles.UtilityLink}>
        <a href={this.props.url} tabIndex="0" className={anchorClass} id={this.props.id} onClick={this.props.onClick} onBlur={this.props.onBlur} onFocus={this.props.onFocus} onKeyDown={this.props.onKeyDown}>
          {this.props.text}
        </a>
      </li>
    )
  }
}

UtilityLink.defaultProps = {
  url: "#",
  visible: true
}

// either url or onClick should be set
UtilityLink.propTypes = {
  text: React.PropTypes.string.isRequired,
  id: React.PropTypes.string,
  url: React.PropTypes.string,
  onClick: React.PropTypes.func,
  visible: React.PropTypes.bool,
  onKeyDown: React.PropTypes.func,
  onFocus: React.PropTypes.func,
  onBlur: React.PropTypes.func
};

export default UtilityLink;
