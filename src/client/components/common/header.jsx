import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { isEmpty, includes } from "lodash";

import styles from './header.scss';
import sbaLogo from '../../../../public/assets/images/logo.png';
import hamburgerClose from '../../../../public/assets/svg/close.svg';
import hamburger from '../../../../public/assets/svg/hamburger.svg';
import * as ContentActions from '../../actions/content.js';

class Header extends React.Component {

  menuHtml = [];
  renderNextMenu = false;

  constructor(props) {
    super();
    this.state = {
      expanded: false,
      searchExpanded: false,
      translate: false,
      searchValue: "",
      tabbedIndex: -1,
      tabbedSubSubMenuIndex: -1,
      tabbedSubMenuIndex: -1,
      goToNextSectionFocus: true,
      nextMenuItem: -1,
      currentMenuItem: -1
    };
  }

  toggleNav(e) {
    e.preventDefault();
    this.setState({
      expanded: !this.state.expanded
    });
  }

  handleSearchToggle(e) {
    e.preventDefault();
    this.setState({
      searchExpanded: !this.state.searchExpanded
    });
  }

  handleSearchChange(e) {
    event.preventDefault();
    console.log(event.target);
    this.setState({
      searchValue: e.target.value
    });
  }

  handleGoogleTranslateClick(e) {
    event.preventDefault();
    this.setState({
      translate: !this.state.translate
    });
  }

  submitSearch(e) {
    e.preventDefault();
    let uri = encodeURI("/tools/search-result-page?search=" + this.state.searchValue);
    document.location = uri;
  }

  componentWillMount() {
    this.props.actions.fetchContentIfNeeded('mainMenu', 'main-menu');
  }

  handleKeyUp(event, linkIndex) {
    let code = (event.keyCode
      ? event.keyCode
      : event.which);
    if (code === 9) {
      this.setState({
        tabbedIndex: linkIndex
      });
    }
  }

  handleSubSubMenuKeyUp(event, subMenuLinkIndex) {
    let code = (event.keyCode
      ? event.keyCode
      : event.which);
    if (code === 9) {
      this.setState({
        tabbedSubSubMenuIndex: subMenuLinkIndex
      });
    }
  }

  handleSubMenuKeyUp(event, subMenuLinkIndex) {
    let code = (event.keyCode
      ? event.keyCode
      : event.which);
    if (code === 9) {
      this.setState({
        tabbedSubMenuIndex: subMenuLinkIndex
      });

    }
  }

  handleSkipLinkKeyDown(event, menuIndex) {
    let code = (event.keyCode
      ? event.keyCode
      : event.which);
    if (code === 13) {
      if (menuIndex < this.menuHtml.length - 1) {
        this.menuHtml[menuIndex + 1].focus();
        this.setState({
          nextMenuItem: menuIndex + 1
        });
        this.renderNextMenu = true;
      }
      console.log("inside on key up.");
    }
  }

  makeFeaturedCalled(featuredCallout) {
    return (
      <ul className={ styles.columnNew }>
        <div className={ styles.menuCallToAction }>
          <a href={ featuredCallout.target } title={ featuredCallout.title }>
            <img src={ featuredCallout.image } alt={ featuredCallout.text } title={ featuredCallout.title } />
            <p>
              { featuredCallout.text }
            </p>
          </a>
        </div>
      </ul>
      );
  }

  buildMenu(menuData) {
    let menuContainer = [];
    let menuChildrenArray = [];
    let subMenuChildrenArray = [];
    const endColumnLinks = [
      'starting-business',
      'managing-business',
      'loans-grants/connect-sba-lenders',
      'loans-grants/find-other-sources-financing',
      'contracting/resources-small-businesses',
      'contracting/government-contracting-programs',
      'contracting/contracting-officials',
      'tools/local-assistance',
      'about-sba/sba-performance',
      'about-sba/oversight-advocacy'
    ];

    menuData.forEach((mainMenu, index) => {
      let subMenuContainer = [];

      if (mainMenu.children && !isEmpty(mainMenu.children)) {
        let subSubMenuContainer = [];
        menuChildrenArray = mainMenu.children.slice();
        mainMenu.children.forEach((subMenu, subMenuIndex) => {
          subSubMenuContainer.push(
            <li>
              <h2>
                                        <a tabIndex="0" href={ subMenu.link }>{ subMenu.linkTitle }</a>
                                      </h2>
            </li>
          );
          if (subMenu.children && !isEmpty(subMenu.children)) {
            subMenuChildrenArray = subMenu.children.slice();
            subMenu.children.forEach((subSubMenu, subSubMenuIndex) => {

              if (!subSubMenu.invisble) {
                subSubMenuContainer.push(
                  <li key={ index + "-" + subMenuIndex + "-" + subSubMenuIndex } onKeyUp={ (event) => this.handleSubSubMenuKeyUp(event, subSubMenuIndex) }>
                    <a tabIndex="0" href={ subSubMenu.link }>
                      { subSubMenu.linkTitle }
                    </a>
                  </li>
                );
              }
            });

          }

          let endColumn = includes(endColumnLinks, subMenu.link) || (subMenuIndex === mainMenu.children.length - 1);
          if (endColumn) {
            subMenuContainer.push(
              <ul key={ index + "-" + subMenuIndex } className={ styles.columnNew } onKeyUp={ (event) => this.handleSubMenuKeyUp(event, subMenuIndex) }>
                { subSubMenuContainer }
              </ul>
            );
            subSubMenuContainer = [];
          }

        });
      }
      let featuredCallout = mainMenu.featuredCallout
        ? this.makeFeaturedCalled(mainMenu.featuredCallout)
        : undefined;
      if (featuredCallout) {
        subMenuContainer.push(featuredCallout);
      }

      let subMenu = "";

      if (!isEmpty(subMenuContainer)) {
        if (this.state.tabbedIndex !== -1 && this.state.tabbedIndex === index) {
          if (this.state.tabbedIndex === menuData.length - 1) {
            subMenu = (
              <ul aria-label="submenu" className={ styles.mainMenuNew + " " + styles.show }>
                <li className={ styles.normalizeMenuItemNew }>
                  { subMenuContainer }
                </li>
              </ul>
            );
          } else {
            subMenu = (
              <ul aria-label="submenu" className={ styles.mainMenuNew + " " + styles.show }>
                <li className={ styles.skipLink } onKeyDown={ (event) => this.handleSkipLinkKeyDown(event, index) }>
                  <a tabIndex="0">Go to Next Section</a>
                </li>
                <li className={ styles.normalizeMenuItemNew }>
                  { subMenuContainer }
                </li>
              </ul>
            );
          }
        } else if (this.state.nextMenuItem === index && this.renderNextMenu) {
          subMenu = (
            <ul aria-label="submenu" className={ styles.mainMenuNew + " " + styles.show }>
              <li className={ styles.skipLink } onKeyDown={ (event) => this.handleSkipLinkKeyDown(event, index) }>
                <a tabIndex="0">Go to Next Section</a>
              </li>
              <li className={ styles.normalizeMenuItemNew }>
                { subMenuContainer }
              </li>
            </ul>
          );
          console.log("next menu index. = " + this.state.nextMenuItem);
          this.renderNextMenu = false;
        } else {
          subMenu = (
            <ul aria-label="submenu" className={ styles.mainMenuNew + " " + styles.hide }>
              <li className={ styles.normalizeMenuItemNew }>
                { subMenuContainer }
              </li>
            </ul>
          );
        }
      }

      if ( (this.state.tabbedIndex === menuData.length - 1) ) {
        if (this.state.tabbedSubMenuIndex === menuChildrenArray.length - 1) {
          let noChildren = isEmpty(menuChildrenArray.children);
          if (noChildren || this.state.tabbedSubSubMenuIndex === subMenuChildrenArray.length - 1) {

            subMenu = (
              <ul aria-label="submenu" className={ styles.mainMenuNew + " " + styles.hide }>
                <li className={ styles.normalizeMenuItemNew }>
                  { subMenuContainer }
                </li>
              </ul>
            );

          }
        }
      }
      const triangleMarker = isEmpty(subMenuContainer)
        ? ""
        : (
        <div className={ styles.triangleNew }></div>
        );
      menuContainer.push(
        <li key={ index } onKeyUp={ (event) => this.handleKeyUp(event, index) }>
          <a tabIndex="0" aria-haspopup="true" title={ mainMenu.linkTitle } ref={ (htmlMenu) => {
                                                                                    this.menuHtml[index] = htmlMenu
                                                                                  } } className={ styles.mainBtnNew + " " + styles.normalizeMenuItemNew } href={ mainMenu.link }>
            <span>{ mainMenu.linkTitle }</span>
            { triangleMarker }
          </a>
          { subMenu }
        </li>
      );

    });
    return menuContainer;
  }

  render() {
    let menuContainer = [];
    if (this.props.mainMenuData) {
      menuContainer = this.buildMenu(this.props.mainMenuData);
    } else {
      menuContainer.push(
        <div></div>
      );
    }

    const searchBar = this.state.searchExpanded
      ? (
      <form id={ styles.searchBarNew } onBlur={ this.handleSearchToggle.bind(this) } onSubmit={ this.submitSearch.bind(this) }>
        <input autoFocus id={ styles.searchInputNew } type='text' placeholder='Search' onChange={ this.handleSearchChange.bind(this) } onKeyPress={ this.handleKeyPressOnSearch }></input>
        <i id="search-btn-new" tabIndex="0" alt="search button" className={ styles.searchIconNew + " fa fa-search" } aria-hidden="true" onMouseDown={ this.submitSearch.bind(this) }></i>
      </form>
      )
      : (
      <a id="search-toggle-link" tabIndex="0" onClick={ this.handleSearchToggle.bind(this) }>
        <i id="search-toggle" alt="search icon" className={ styles.searchIconNew + " fa fa-search" } aria-hidden="true"></i>
      </a>
      );

    let googleTranslateBtn = this.state.translate
      ? ""
      : <a tabIndex="0" id="translate-toggle-new" className={ styles.miniNavLinkNew } onClick={ this.handleGoogleTranslateClick.bind(this) } href="#">Translate</a>;
    return (
      <div>
        <div className="hidden-xs hidden-sm">
          <header className={ styles.headerNew }>
            <div className={ styles.navbarNew }>
              <a tabIndex="-1" href="/"><img className={ styles.logoNew } alt="Small Business Administration" src={ sbaLogo } /></a>
              <nav role="navigation" aria-label="mini navigation" className={ styles.miniNavNew }>
                <div className={ this.state.translate
                                 ? styles.googleTranslateElementVisible
                                 : styles.googleTranslateElement } id="google_translate_element"></div>
                { googleTranslateBtn }
                <a tabIndex="0" className={ styles.miniNavLinkNew } href="https://es.sba.gov/">SBA en español</a>
                <a tabIndex="0" className={ styles.miniNavLinkNew } href="/for-lenders">For Lenders</a>
                <a tabIndex="0" className={ styles.miniNavLinkNew } href="/about-sba/sba-newsroom">Newsroom</a>
                <a tabIndex="0" className={ styles.miniNavLinkNew } href="/about-sba/what-we-do/contact-sba">Contact Us</a>
                <a tabIndex="0" className={ styles.miniNavLinkNew } href="/user/register">Register</a>
                <a tabIndex="0" className={ styles.miniNavLinkNew } href="/user/login?destination=about-sba%2Fwhat-we-do%2Fcontact-sba">Log In</a>
                { searchBar }
              </nav>
              <br/>
              <nav role="menubar" aria-label="main navigation bar with dropdown submenus" className={ styles.mainNavNew }>
                <ul className="reverse-ul">
                  { menuContainer }
                </ul>
              </nav>
            </div>
          </header>
        </div>
        <div className="hidden-md hidden-lg">
          <div className={ this.props.disaster.visible
                           ? styles.mobileHeaderContainerNewWithDisasterCallout
                           : styles.mobileHeaderContainerNew }>
            <div className={ styles.mobileMainHeaderNew }>
              <a href="/">
                <img className={ styles.logoNew } alt="Small Business Administration" src={ sbaLogo } />
              </a>
              { /*esfmt-ignore-start*/}
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
                        <defs />
                        <g id="Style-Guide" stroke="none" stroke-width={1} fill="none" fill-rule="evenodd">
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
              {/*esfmt-ignore-end*/ }
            </div>
            <nav className={ styles.mainNavNew + " " + (this.state.expanded
                               ? styles.mainNavNewShow
                               : "") }>
              <form className={ styles.mobileSearchContainerNew }>
                <div className={ styles.searchIconContainerNew }>
                  <img className={ styles.searchIconNew } alt="Search" src="/sites/all/themes/smallbizd7/search-icon.svg" />
                </div>
                <input type="text" className={ styles.searchInputFieldNew } placeholder="Search SBA.gov"></input>
              </form>
              <div>
                <a className={ styles.navLinkNew } href="/starting-managing-business">Starting & Managing</a>
              </div>
              <div>
                <a className={ styles.navLinkNew } href="/loans-grants">Loans & Grants</a>
              </div>
              <div>
                <a className={ styles.navLinkNew } href="/contracting">Contracting</a>
              </div>
              <div>
                <a className={ styles.navLinkNew } href="/tools/sba-learning-center/search/training">Learning Center</a>
              </div>
              <div>
                <a className={ styles.navLinkNew } href="/tools/local-assistance">Local Assistance</a>
              </div>
              <div>
                <a className={ styles.navLinkNew } href="/about-sba">About Us</a>
              </div>
              <div>
                <a className={ styles.navLinkSpecialNew } href="/tools/local-assistance#locations-page">
                  <img className={ styles.navLinkNearIconNew } src="/sites/all/themes/smallbizd7/near-you.svg" alt="" /> SBA Near You
                </a>
              </div>
              <div>
                <a className={ styles.navLinkSpecialNew } href="/tools/events#events-page">
                  <img className={ styles.navLinkCalendarIconNew } src="/sites/all/themes/smallbizd7/calendar.svg" alt="" /> Small Business Events
                </a>
              </div>
            </nav>
          </div>
        </div>
      </div>
      );
  }
}

Header.defaultProps = {
  disaster: {
    visible: false
  },
  mainMenuData: null
};

function mapStateToProps(reduxState) {
  return {
    mainMenuData: reduxState.contentReducer["mainMenu"],
    disaster: reduxState.contentReducer["disaster"]
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(ContentActions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Header);
