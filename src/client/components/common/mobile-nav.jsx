import React from 'react';
import sbaLogo from '../../../../public/assets/images/logo.png';
import hamburgerClose from '../../../../public/assets/svg/close.svg';
import hamburger from '../../../../public/assets/svg/hamburger.svg';
import styles from "./mobile-nav.scss";
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
              {/*HAMBURGER ICON*/}
              <div>
                <div className={styles.menuBtnTextNew}>MENU</div>
                <div>
                  <svg className={styles.menuIconHamburgerNew} width="15px" height="13px" viewBox="0 0 15 13">
                    <title>hamburger icon</title>
                    <desc>Created with Sketch.</desc>
                    <defs/>
                    <g id="Homepage" stroke="none" strokeWidth={1} fill="none" fillRule="evenodd">
                      <g id="alert-mobile" transform="translate(-337.000000, -128.000000)" fill="#0B97DD">
                        <g id="Rectangle-14-+-whitepaper-Copy-11" transform="translate(274.000000, 116.000000)">
                          <path className={styles.hamburgerIcon} d="M78,22.4318182 C78,22.0962358 77.7167969,21.8181818 77.375,21.8181818 L63.625,21.8181818 C63.2832031,21.8181818 63,22.0962358 63,22.4318182 L63,23.6590909 C63,23.9946733 63.2832031,24.2727273 63.625,24.2727273 L77.375,24.2727273 C77.7167969,24.2727273 78,23.9946733 78,23.6590909 L78,22.4318182 Z M78,17.5227273 C78,17.1871449 77.7167969,16.9090909 77.375,16.9090909 L63.625,16.9090909 C63.2832031,16.9090909 63,17.1871449 63,17.5227273 L63,18.75 C63,19.0855824 63.2832031,19.3636364 63.625,19.3636364 L77.375,19.3636364 C77.7167969,19.3636364 78,19.0855824 78,18.75 L78,17.5227273 Z M78,12.6136364 C78,12.278054 77.7167969,12 77.375,12 L63.625,12 C63.2832031,12 63,12.278054 63,12.6136364 L63,13.8409091 C63,14.1764915 63.2832031,14.4545455 63.625,14.4545455 L77.375,14.4545455 C77.7167969,14.4545455 78,14.1764915 78,13.8409091 L78,12.6136364 Z" id="hamburger-icon"/>
                        </g>
                      </g>
                    </g>
                  </svg>
                </div>
                {/*{CLOSE ICON}*/}
                <div>
                  <svg className={styles.menuIconCloseNew} width="27px" height="27px" viewBox="0 0 27 27" version="1.1">
                    <title>Close Button</title>
                    <desc>Created with Sketch.</desc>
                    <defs/>
                    <g id="Style-Guide" stroke="none" strokeWidth={1} fill="none" fill-rule="evenodd">
                      <g id="Close-Button" fill="#333333">
                        <g id="Group">
                          <rect className={styles.closeIcon} id="Rectangle-7" transform="translate(13.081475, 13.081475) rotate(45.000000) translate(-13.081475, -13.081475) " x="11.5814755" y="-3.91852455" width={3} height={34} rx={1}/>
                          <rect className={styles.closeIcon} id="Rectangle-7" transform="translate(13.081475, 13.081475) scale(-1, 1) rotate(45.000000) translate(-13.081475, -13.081475) " x="11.5814755" y="-3.91852455" width={3} height={34} rx={1}/>
                        </g>
                      </g>
                    </g>
                  </svg>
                </div>
                <img className={styles.menuIconCloseNew} alt="" src={hamburgerClose}/>
              </div>
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
