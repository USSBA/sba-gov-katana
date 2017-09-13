import React from "react";
import {createNavigation} from "../../../services/navigation";
import _ from "lodash";

class BasicLink extends React.Component {

  componentDidMount() {
    if (this.props.autoFocus && this.me.focus) {
      this.me.focus();
    }
  }

  createKeypressHandler(onClick){
    return (event) => {
      if (event.key === "Enter") {
        onClick();
      }
    };
  }

  render() {
    const linkProps = _.omit(this.props, ["onClick", "url", "text", "myClassName", "htmlElement"]);
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
      return (<button {...linkProps} ref={(me) => {
        this.me = me;
      }}>{this.props.text}</button>);
    } else {
      if(this.props.htmlElement !== "a"){
        console.log("WARNING: BasicLink told to render an unexpected element with htmlElement prop. Rendering <a instead");
      }
      return (<a {...linkProps} ref={(me) => {
        this.me = me;
      }}>{this.props.text || this.props.children}</a>);
    }
  }
}

BasicLink.propTypes = {
  url: React.PropTypes.string,
  onClick: React.PropTypes.func,
  tabIndex: React.PropTypes.string,
  text: React.PropTypes.string,
  myClassName: React.PropTypes.string,
  htmlElement: React.PropTypes.string,
  autoFocus: React.PropTypes.bool
};

BasicLink.defaultProps = {
  tabIndex: "0",
  text: "",
  htmlElement: "a",
  myClassName: "",
  autoFocus: false
};

export default BasicLink;
