import React from 'react';
import * as DisplayActions from "../../../actions/display.js"
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {getTheme} from "./themes.js"

class Themer extends React.Component {

  componentWillMount() {
    let theme = getTheme();
    this.props.actions.updateTheme(theme);
  }
  render() {
    let theme = this.props.theme;
    if (document.body.className && document.body.className.indexOf(theme) === -1) {
      document.body.className = document.body.className + " " + theme;
    }
    return (
      <div className={theme}>
        {this.props.children}
      </div>
    );
  }
}

Themer.defaultProps = {
  theme: "sba-blue"
}

function mapReduxStateToProps(reduxState, ownProps) {
  return {
    theme: reduxState.display.theme
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(DisplayActions, dispatch)
  }
}

export default connect(mapReduxStateToProps, mapDispatchToProps)(Themer);
