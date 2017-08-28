import React from 'react';

import * as NavigationActions from "../../../actions/navigation.js";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";

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
          ? this.props.onClick
          : () => {this.props.actions.locationChange(this.props.URL || this.props.url);}
      }
    ;
    return (
      <button {...buttonProps}>{this.props.text}</button>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(NavigationActions, dispatch)
  };
}

export default connect(null, mapDispatchToProps)(ButtonBase);
