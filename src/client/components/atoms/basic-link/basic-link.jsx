import React from "react";
import {createNavigation} from "../../../services/navigation";
import _ from "lodash";

class BasicLink extends React.Component {

  createKeypressHandler(onClick){
    return (event) => {
      if (event.key === "Enter") {
        onClick();
      }
    };
  }

  render() {
    const linkProps = _.omit(this.props, ["onClick", "url", "content", "myClassName", "htmlElement"]);
    if (this.props.onClick) {
      _.merge(linkProps, {
        onTouchTap: this.props.onClick,
        onKeyPress: this.createKeypressHandler(this.props.onClick)
      });
    } else {
      _.merge(linkProps, {
        onTouchTap: createNavigation(this.props.url),
        onKeyPress: this.createKeypressHandler(createNavigation(this.props.url))
      });
    }
    _.merge(linkProps, {className: this.props.myClassName});
    if(this.props.htmlElement === "button"){
      return (<button {...linkProps}>{this.props.content}</button>);
    } else {
      if(this.props.htmlElement !== "a"){
        console.log("WARNING: BasicLink told to render an unexpected element with htmlElement prop. Rendering <a instead");
      }
      return (<a {...linkProps}>{this.props.content}</a>);
    }
  }
}

BasicLink.propTypes = {
  url: React.PropTypes.string,
  onClick: React.PropTypes.func,
  tabIndex: React.PropTypes.string,
  content: React.PropTypes.string,
  myClassName: React.PropTypes.string,
  htmlElement: React.PropTypes.string
};

BasicLink.defaultProps = {
  tabIndex: "0",
  content: "",
  htmlElement: "a",
  myClassName: ""
};

export default BasicLink;