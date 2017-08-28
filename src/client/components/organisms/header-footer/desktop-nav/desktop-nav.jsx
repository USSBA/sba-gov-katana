import React from "react";
import {MainLogo} from "atoms";
import MiniNav from "../mini-nav/mini-nav.jsx";
import MainMenu from "../main-menu/main-menu.jsx";
import styles from "./desktop-nav.scss";

import * as NavigationActions from "../../../../actions/navigation.js";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import {navigate} from "../../../../services/navigation";

class DesktopNav extends React.Component {

  render() {
    return (
      <div id="desktop-nav" className={styles.desktopNav}>
        <div className={ styles.logoNew } >
          <a tabIndex="-1" onTouchTap={navigate("/", this)}><img alt="Small Business Administration" src={ sbaLogo } /></a>
        </div>
        <MiniNav/>
        <MainMenu data={this.props.mainMenuData}/>
      </div>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(NavigationActions, dispatch)
  };
}

export default connect(null, mapDispatchToProps)(DesktopNav);
