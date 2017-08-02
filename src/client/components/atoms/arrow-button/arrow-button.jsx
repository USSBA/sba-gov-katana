import React from 'react';
import s from "./arrow-button.scss";

class ArrowButton extends React.Component {

  onKeyDown(e) {
    if (e.keyCode == 13 && !this.props.disabled) {
      this.props.onActivate()
    }
  }

  onClick(e) {
    if (!this.props.disabled) {
      this.props.onActivate()
    }
  }

  render() {
    let iconName = this.props.isBack
      ? "left"
      : "right";
    let altText = this.props.isBack
      ? "previous page"
      : "next page";
    return (
      <a className={s.ArrowButton + " " + (this.props.noLeftBorder
        ? s.noLeftBorder
        : "")} id={this.props.id} tabIndex="0" onClick={this.onClick.bind(this)} onKeyDown={this.onKeyDown.bind(this)}>
        <i alt={altText} className={" fa fa-chevron-" + iconName} aria-hidden="true"></i>
      </a>
    )
  }
}

ArrowButton.propTypes = {
  id: React.PropTypes.string,
  isBack: React.PropTypes.bool,
  onActivate: React.PropTypes.func,
  disabled: React.PropTypes.bool
};

export default ArrowButton;
