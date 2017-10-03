import React from "react";
import {
  HamburgerIcon,
  MainLogo,
  SectionLink
} from "atoms";

import clientConfig from "../../../../services/client-config.js"
import searchIcon from "../../../../../../public/assets/svg/mobile-menu/search-icon.svg";
import nearyouIcon from "../../../../../../public/assets/svg/mobile-menu/near-you-icon.svg";
import calendarIcon from "../../../../../../public/assets/svg/mobile-menu/calendar-icon.svg";
import styles from "./mobile-nav.scss";

class MobileNav extends React.Component {
  constructor(props) {
    super();
    this.state = {
      expanded: false,
      navHeight: 450
    };
    this.updateNavHeight = this.updateNavHeight.bind(this);
  }
  toggleNav(e) {
    e.preventDefault();
    this.setState({
      expanded: !this.state.expanded
    });
  }

  updateNavHeight() {
    const heightOffset = 130 + this.props.additionalMenuOffset;
    const newHeight = window.innerHeight - heightOffset;
    this.setState({ navHeight: newHeight });
  }

  componentDidMount() {
    this.updateNavHeight();
    window.addEventListener('resize', this.updateNavHeight);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.updateNavHeight);
  }

  createMenuItems() {
    let menuItems = [];
    let me = this;
    if (this.props.mainMenuData) {
      menuItems = this.props.mainMenuData.map((item, index) => {
        return (
          <div key={index} className={"mobile-nav-menu-item " +styles.mobileNavMenuLink} onClick={me.toggleNav.bind(me)}>
            <SectionLink id={"main-menu-link-" + index} url={item.link} text={item.linkTitle}/>
          </div>
        );
      });
    } else {
      menuItems.push(
        <div key={1}></div>
      );
    }

console.log("clientConfig",clientConfig)
    if(clientConfig.forPartners){
        menuItems.push(
          <div key={this.props.mainMenuData.length+1} className={"mobile-nav-menu-item " +styles.mobileNavMenuLink}>
            <a className={styles.navLinkSpecialNew} href="/partners">
              For Partners
            </a>
          </div>
        );
    }
    menuItems.push(
      <div key={this.props.mainMenuData.length+2} className={"mobile-nav-menu-item " +styles.mobileNavMenuLink}>
        <a id="mobile-nav-near-you" className={styles.navLinkSpecialNew} href="/tools/local-assistance#locations-page">
          <img className={styles.linkIcon} src={nearyouIcon} alt=""/>
          SBA Near You
        </a>
      </div>
    );
    menuItems.push(
      <div key={this.props.mainMenuData.length+3} className={"mobile-nav-menu-item " +styles.mobileNavMenuLink}>
        <a id="mobile-nav-events" className={styles.navLinkSpecialNew} href="/tools/events#events-page">
          <img className={styles.linkIcon} src={calendarIcon} alt=""/>
          Small Business Events
        </a>
      </div>
    );
    return menuItems;
  }

  render() {
    const menuItems = this.createMenuItems();
    const menuMaxHeight = menuItems.length * 78;
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
          <div className={styles.mobileNavMenuLinks} style={{height: this.state.navHeight, maxHeight: menuMaxHeight }}>
            {menuItems}
          </div>
        </div>
      </div>
    );
  }
}

MobileNav.defaultProps = {
  additionalMenuOffset: 0,
  mainMenuData: []
};

export default MobileNav;
