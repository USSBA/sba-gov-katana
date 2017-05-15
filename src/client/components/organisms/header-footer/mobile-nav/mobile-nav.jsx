import React from 'react';
import styles from "./mobile-nav.scss";
import HamburgerIcon from "../../../atoms/hamburger-icon.jsx";
import MainLogo from "../../../atoms/main-logo/main-logo.jsx";
import SectionLink from "../../../atoms/section-link/section-link.jsx";

import searchIcon from '../../../../../../public/assets/svg/mobile-menu/search-icon.svg';
import nearyouIcon from '../../../../../../public/assets/svg/mobile-menu/near-you-icon.svg';
import calendarIcon from '../../../../../../public/assets/svg/mobile-menu/calendar-icon.svg';

class MobileNav extends React.Component {
  constructor(props) {
    super();
    this.state = {
      expanded: false
    };
  }
  toggleNav(e) {
    e.preventDefault();
    this.setState({
      expanded: !this.state.expanded
    });
  }
  render() {
    return (
      <div>
        <div className={styles.mobileHeader}>
          <MainLogo />
          <span>
            <a className={styles.menuBtnNew} onClick={this.toggleNav.bind(this)}>
                <HamburgerIcon isOpen={this.state.expanded} />
            </a>
          </span>
        </div>
        <div className={styles.mainNavNew + " " + (this.state.expanded
          ? styles.mainNavNewShow
          : "")}>
          <form className={styles.mobileSearchContainerNew}>
            <div className={styles.searchIconContainerNew}>
              <img className={styles.searchIconNew} alt="Search" src={searchIcon}/>
            </div>
            <input type="text" className={styles.searchInputFieldNew} placeholder="Search SBA.gov"></input>
          </form>
          <div className={styles.menuLinkSection}>
            <SectionLink url="/starting-managing-business" text="Starting & Managing" />
          </div>
          <div className={styles.menuLinkSection}>
            <SectionLink url="/loans-grants" text="Loans & Grants" />
          </div>
          <div className={styles.menuLinkSection}>
            <SectionLink url="/contracting" text="Contracting" />
          </div>
          <div className={styles.menuLinkSection}>
            <SectionLink url="/tools/sba-learning-center/search/training" text="Learning Center" />
          </div>
          <div className={styles.menuLinkSection}>
            <SectionLink url="/tools/local-assistance" text="Local Assistance" />
          </div>
          <div className={styles.menuLinkSection}>
            <SectionLink url="/about-sba" text="About Us" />
          </div>
          <div className={styles.menuLinkSection}>
            <a className={styles.navLinkSpecialNew} href="/tools/local-assistance#locations-page">
              <img className={styles.linkIcon} src={nearyouIcon} alt=""/>
              SBA Near You
            </a>
          </div>
          <div className={styles.menuLinkSection}>
            <a className={styles.navLinkSpecialNew} href="/tools/events#events-page">
              <img className={styles.linkIcon} src={calendarIcon} alt=""/>
              Small Business Events
            </a>
          </div>
        </div>
      </div>
    );
  }
}
export default MobileNav;
