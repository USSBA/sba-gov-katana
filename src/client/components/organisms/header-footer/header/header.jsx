import React from 'react';

import DesktopNav from "../desktop-nav/desktop-nav.jsx";
import MobileNav from "../mobile-nav/mobile-nav.jsx";

import styles from './header.scss';

class Header extends React.Component {

  render() {
    return (
      <nav className={styles.navbar}>
          <MobileNav/>
          <DesktopNav/>
      </nav>
    );
  }
}

export default Header;
