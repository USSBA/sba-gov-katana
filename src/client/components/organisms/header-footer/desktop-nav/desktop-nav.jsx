import React from "react";
import {MainLogo} from "atoms";
import MiniNav from "../mini-nav/mini-nav.jsx";
import MainMenu from "../main-menu/main-menu.jsx";
import styles from "./desktop-nav.scss";


class DesktopNav extends React.Component {

  render() {
    return (
      <div id="desktop-nav" className={styles.desktopNav}>
        <MainLogo/>
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
