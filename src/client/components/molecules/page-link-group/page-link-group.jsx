import React from "react";
import {PageLink} from "atoms";
import styles from "./page-link-group.scss";
import {BasicLink} from "../../atoms";

class PageLinkGroup extends React.Component {

  makePageLink(item, index) {
    return (<PageLink id={this.props.id+"-"+index} key={index+1} text={item.text} url={item.url} onBlur={this.props.onBlur} indent={this.props.indent}/>);
  }
  render() {
    let header = this.props.title
      ? (
        <li key={0}>
            <BasicLink url={this.props.titleLink}  onBlur={this.props.onBlur} id={this.props.id+"-title"} text={this.props.title}/>
        </li>
      )
      : undefined;
    let links = this.props.links.map(this.makePageLink.bind(this));
    return (
      <ul id={this.props.id} className={styles.pageLinkGroup}>
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
