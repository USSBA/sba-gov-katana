import React from 'react';
import {navigateOnClick} from "../../../services/navigation";

class ButtonBase extends React.Component {
  render() {
    const buttonProps = {
        id: this.props.id,
        className: this.props.buttonClassName + " " + (this.props.extraClassName
          ? this.props.extraClassName
          : "") + " " + (this.props.className
          ? this.props.className
          : ""),
        disabled: this.props.disabled,
        formTarget: this.props.newWindow
          ? "_blank"
          : "_self",
        onTouchTap: navigateOnClick(this.props.url)
      }
    ;
    return (
      <button {...buttonProps}>{this.props.text}</button>
    );
  }
}

ButtonBase.propTypes = {
  url: React.PropTypes.string.isRequired
  //TODO: Require one or the other of url or onClick
}

export default ButtonBase;