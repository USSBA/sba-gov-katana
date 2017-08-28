import React from 'react';

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
        onTouchTap: this.props.onClick
      }
    ;
    return (
      <button {...buttonProps}>{this.props.text}</button>
    );
  }
}

ButtonBase.propTypes = {
  onClick: React.PropTypes.func.isRequired
}

export default ButtonBase;