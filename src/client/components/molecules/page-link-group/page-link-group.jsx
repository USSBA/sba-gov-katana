import React from "react";
import styles from "./page-link-group.scss"
import PageLink from "../../atoms/page-link/page-link.jsx";

class PageLinkGroup extends React.Component {

  makePageLink(item, index) {
    return (<PageLink key={index+1} text={item.text} url={item.url} onBlur={this.props.onBlur}/>);
  }
  render() {
    let header = this.props.title
      ? (
        <li key={0}>
            <a tabIndex="0" href={this.props.titleLink} onBlur={this.props.onBlur}>{this.props.title}</a>
        </li>
      )
      : undefined;
    let links = this.props.links.map(this.makePageLink.bind(this));
    return (
      <ul className={styles.pageLinkGroup}>
        {header}
        {links}
      </ul>
    );
  }
}

PageLinkGroup.propTypes = {
  title: React.PropTypes.string,
  titleLink: React.PropTypes.string,
  links: React.PropTypes.array.isRequired,
  onBlur: React.PropTypes.func
}

export default PageLinkGroup;
