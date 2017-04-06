import React from 'react';
import sbaLogo from '../../../../public/assets/images/logo.png';
import styles from "./mobile-nav.scss";
import HamburgerIcon from "../atoms/hamburger-icon.jsx";
/* esfmt-ignore-start */
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
        <div className={styles.mobileMainHeaderNew + " " + styles[this.props.theme]}>
          <a href="/">
            <img className={styles.logoNew} alt="Small Business Administration" src={sbaLogo}/>
          </a>
          <span>
            <a className={styles.menuBtnNew} onClick={this.toggleNav.bind(this)}>
                <HamburgerIcon isOpen={this.state.expanded} />
            </a>
          </span>
        </div>
        <nav className={styles.mainNavNew + " " + (this.state.expanded
          ? styles.mainNavNewShow
          : "")}>
          <form className={styles.mobileSearchContainerNew}>
            <div className={styles.searchIconContainerNew}>
              <img className={styles.searchIconNew} alt="Search" src="/sites/all/themes/smallbizd7/search-icon.svg"/>
            </div>
            <input type="text" className={styles.searchInputFieldNew} placeholder="Search SBA.gov"></input>
          </form>
          <div>
            <a className={styles.navLinkNew} href="/starting-managing-business">Starting & Managing</a>
          </div>
          <div>
            <a className={styles.navLinkNew} href="/loans-grants">Loans & Grants</a>
          </div>
          <div>
            <a className={styles.navLinkNew} href="/contracting">Contracting</a>
          </div>
          <div>
            <a className={styles.navLinkNew} href="/tools/sba-learning-center/search/training">Learning Center</a>
          </div>
          <div>
            <a className={styles.navLinkNew} href="/tools/local-assistance">Local Assistance</a>
          </div>
          <div>
            <a className={styles.navLinkNew} href="/about-sba">About Us</a>
          </div>
          <div>
            <a className={styles.navLinkSpecialNew} href="/tools/local-assistance#locations-page">
              <img className={styles.navLinkNearIconNew} src="/sites/all/themes/smallbizd7/near-you.svg" alt=""/>
              SBA Near You
            </a>
          </div>
          <div>
            <a className={styles.navLinkSpecialNew} href="/tools/events#events-page">
              <img className={styles.navLinkCalendarIconNew} src="/sites/all/themes/smallbizd7/calendar.svg" alt=""/>
              Small Business Events
            </a>
          </div>
        </nav>
      </div>
    );
  }
}
/* esfmt-ignore-end */
export default MobileNav;
