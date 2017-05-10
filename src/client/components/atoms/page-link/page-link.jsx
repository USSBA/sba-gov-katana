import React from 'react';
import styles from "./page-link.scss"

class PageLink extends React.Component {

  render() {
    let anchorClass = styles.link + " " + (this.props.visible
      ? ""
      : styles.hidden)
    return (
      <li className={ styles.pageLink }>
        <a href={this.props.url} tabIndex="0" className={anchorClass} id={this.props.id} onClick={this.props.onClick} onBlur={this.props.onBlur} >
          {this.props.text}
        </a>
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
  onBlur: React.PropTypes.func
};

export default PageLink;
