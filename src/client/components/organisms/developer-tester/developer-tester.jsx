import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import styles from "./developer-tester.scss"

import DesktopNav from "../header-footer/desktop-nav/desktop-nav.jsx";

export class DeveloperTester extends React.Component {
  render() {
    return (
      <div className={ styles.container }>
          <DesktopNav />
      </div>
    );
  }
}

function mapReduxStateToProps(reduxState) {
  return {
  };
}

function mapDispatchToProps(dispatch) {
  return {
  };
}
export default connect(mapReduxStateToProps, mapDispatchToProps)(DeveloperTester);
