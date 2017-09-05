import React from 'react';
import {BasicLink} from "../../atoms";

class ButtonBase extends React.Component {
  render() {
    const buttonProps = {
        id: this.props.id,
        myClassName: this.props.buttonClassName + " " + (this.props.extraClassName
          ? this.props.extraClassName
          : "") + " " + (this.props.className
          ? this.props.className
          : ""),
        disabled: this.props.disabled,
        formTarget: this.props.newWindow
          ? "_blank"
          : "_self",
        onClick: this.props.onClick,
        url: this.props.url,
        text: this.props.text,
        htmlElement: "button",
      }
    ;
    return (
      <BasicLink {...buttonProps} />
    );
  }
}

ButtonBase.propTypes = {
  url: React.PropTypes.string,
  onClick: React.PropTypes.func
};

export default ButtonBase;
