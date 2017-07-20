import React from 'react';
import MainLogo from "../../../atoms/main-logo/main-logo.jsx"
import MiniNav from "../mini-nav/mini-nav.jsx";
import MainMenu from "../main-menu/main-menu.jsx";
import styles from './desktop-nav.scss';


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

export default DesktopNav;
