import React from "react";
import {
  HamburgerIcon,
  MainLogo,
  SectionLink
} from "atoms";

import searchIcon from "../../../../../../public/assets/svg/mobile-menu/search-icon.svg";
import nearyouIcon from "../../../../../../public/assets/svg/mobile-menu/near-you-icon.svg";
import calendarIcon from "../../../../../../public/assets/svg/mobile-menu/calendar-icon.svg";
import styles from "./mobile-nav.scss";

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
      let menuItems = [];
      if (this.props.mainMenuData) {
          menuItems = this.props.mainMenuData.map((item, index) => {
              return <div key={index} className={styles.menuLinkSection}><SectionLink id={"main-menu-link-" + index} url={item.link} text={item.linkTitle}/></div>
          });
      } else {
          menuItems.push(
              <div key={1}></div>
          );
      }
    return (
      <div>
        <div className={styles.mobileHeader}>
          <MainLogo />
          <span>
            <a id="mobile-navigation-button" className={this.state.expanded ? styles.menuButtonOpen :  styles.menuButtonClosed} onClick={this.toggleNav.bind(this)}>
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
            {menuItems}
          <div className={styles.menuLinkSection}>
            <a id="mobile-nav-near-you" className={styles.navLinkSpecialNew} href="/tools/local-assistance#locations-page">
              <img className={styles.linkIcon} src={nearyouIcon} alt=""/>
              SBA Near You
            </a>
          </div>
          <div className={styles.menuLinkSection}>
            <a id="mobile-nav-events"  className={styles.navLinkSpecialNew} href="/tools/events#events-page">
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
