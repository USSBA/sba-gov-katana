import React from 'react';
import MainLogo from "../../../atoms/main-logo/main-logo.jsx"
import MiniNav from "../mini-nav/mini-nav.jsx";
import MainMenu from "../main-menu/main-menu.jsx";
import styles from './desktop-nav.scss';


class DesktopNav extends React.Component {

  render() {
   // TODO generalize this with a constant mapping, maybe from the themer or redux state
   let activeIndex = -1;
   if(this.props.theme === "byzantine"){
       activeIndex = 0;
   }

    return (
      <div id="desktop-nav" className={styles.desktopNav}>
        <MainLogo/>
        <MiniNav/>
        <MainMenu data={this.props.mainMenuData} activeIndex={activeIndex}/>
      </div>
    );
  }
}

export default DesktopNav;
