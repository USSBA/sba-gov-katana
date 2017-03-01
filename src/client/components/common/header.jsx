import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { isEmpty, includes } from "lodash";


import styles from './header.scss';
import sbaLogo from '../../../../public/assets/images/logo.png';
import hamburgerClose from '../../../../public/assets/svg/close.svg';
import hamburger from '../../../../public/assets/svg/hamburger.svg';
import *  as ContentActions from '../../actions/content.js';


class Header extends React.Component {
  constructor(props) {
    super();
    this.state = {
      expanded: false,
      searchExpanded: false,
      translate: false,
      searchValue: ""
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
    this.setState({
      searchValue: e.target.value
    });
  }

    handleGoogleTranslateClick(e) {
        event.preventDefault();
        console.log(this.googleTranslateHtml);
        this.googleTranslateHtml.isVisible = true;
    }

  submitSearch(e) {
    e.preventDefault();
    let uri = encodeURI("/tools/search-result-page?search=" + this.state.searchValue);
    document.location = uri;
  }

  componentWillMount() {
    this.props.actions.fetchContentIfNeeded('mainMenu', 'main-menu');
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
    const endColumnLinks = ['starting-business', 'managing-business',
      'loans-grants/connect-sba-lenders', 'loans-grants/find-other-sources-financing',
      'contracting/resources-small-businesses', 'contracting/government-contracting-programs', 'contracting/contracting-officials',
      'tools/local-assistance',
      'about-sba/sba-performance', 'about-sba/oversight-advocacy'];

    menuData.forEach((mainMenu, index) => {
      let subMenuContainer = [];
      if (mainMenu.children && !isEmpty(mainMenu.children)) {
        let subSubMenuContainer = [];
        mainMenu.children.forEach((subMenu, subMenuIndex) => {
          subSubMenuContainer.push(
            <li>
              <h2><a tabIndex="0" href={ subMenu.link }>{ subMenu.linkTitle }</a></h2>
            </li>
          );
          if (subMenu.children && !isEmpty(subMenu.children)) {
            subMenu.children.forEach((subSubMenu, subSubMenuIndex) => {
              if (!subSubMenu.invisble) {
                subSubMenuContainer.push(
                  <li key={ index + "-" + subMenuIndex + "-" + subSubMenuIndex }>
                    <a tabIndex="0" href={ subSubMenu.link }>
                      { subSubMenu.linkTitle }
                    </a>
                  </li>);
              }
            });
          }
          let endColumn = includes(endColumnLinks, subMenu.link) || (subMenuIndex === mainMenu.children.length - 1);
          if (endColumn) {
            subMenuContainer.push(
              <ul key={ index + "-" + subMenuIndex } className={ styles.columnNew }>
                { subSubMenuContainer }
              </ul>
            );
            subSubMenuContainer = [];
          }


        });
      }
      let featuredCallout = mainMenu.featuredCallout ? this.makeFeaturedCalled(mainMenu.featuredCallout) : undefined;
      if (featuredCallout) {
        subMenuContainer.push(featuredCallout);
      }
      const subMenu = isEmpty(subMenuContainer) ? "" :
        (<ul aria-label="submenu" className={ styles.mainMenuNew }>
           <li className={ styles.normalizeMenuItemNew }>
             { subMenuContainer }
           </li>
         </ul>
        );

      const triangleMarker = isEmpty(subMenuContainer) ? "" : (<div className={ styles.triangleNew }></div>);
      menuContainer.push(
        <li key={ index }>
          <a tabIndex="0" aria-haspopup="true" title={ mainMenu.linkTitle } className={ styles.mainBtnNew + " " + styles.normalizeMenuItemNew } href={ mainMenu.link }>
            <span>{ mainMenu.linkTitle }</span>
            { triangleMarker }
          </a>
          { subMenu }
        </li>);
    });
    return menuContainer;
  }

  render() {
    let menuContainer = [];
    if (this.props.mainMenuData) {
      menuContainer = this.buildMenu(this.props.mainMenuData);
    } else {
      menuContainer.push(<div></div>);
    }

    const searchBar = this.state.searchExpanded ? (
      <form id={ styles.searchBarNew } onBlur={this.handleSearchToggle.bind(this)}>
        <input autoFocus id={ styles.searchInputNew }  type='text' placeholder='Search' onChange={ this.handleSearchChange.bind(this) }></input>
        <i id="search-btn-new" tabIndex="0" className={ styles.searchIconNew + " fa fa-search" } aria-hidden="true" onMouseDown={ this.submitSearch.bind(this) }></i>
      </form>)
      : (<a id="search-toggle-link" tabIndex="0" onClick={ this.handleSearchToggle.bind(this) }>
           <i id="search-toggle" className={ styles.searchIconNew + " fa fa-search" } aria-hidden="true"></i></a>);
    let googleTranslateBtn = this.state.translate ? "" : <a tabIndex="0" id="translate-toggle-new" className={ styles.miniNavLinkNew } onClick={this.handleGoogleTranslateClick.bind(this)} href="#">Translate</a>;
    return (
      <div>
        <div className="hidden-xs hidden-sm">
          <header className={ styles.headerNew }>
            <div className={ styles.navbarNew }>
              <a href="/"><img className={ styles.logoNew } alt="Small Business Administration" src={ sbaLogo } /></a>
              <nav role="navigation" aria-label="mini navigation" className={ styles.miniNavNew }>
                <div className={ styles.googleTranslateElement } id="google_translate_element" ref={(translateHtml)=>{this.googleTranslateHtml = translateHtml;}}></div>
                  {googleTranslateBtn}
                <a tabIndex="0" className={ styles.miniNavLinkNew } href="https://es.sba.gov/">SBA En Espaol</a>
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
          <div className={ this.props.disaster.visible ? styles.mobileHeaderContainerNewWithDisasterCallout : styles.mobileHeaderContainerNew }>
            <div className={ styles.mobileMainHeaderNew }>
              <a href="/">
                <img className={ styles.logoNew } alt="Small Business Administration" src={ sbaLogo } />
              </a>
              /*esfmt-ignore-start*/
              <span>
                <a className={ styles.menuBtnNew }  onClick={ this.toggleNav.bind(this) }>
                    <div>
                        <div className={ styles.menuBtnTextNew }>MENU</div>
                        <img className={ styles.menuIconHamburgerNew } alt="" src={ hamburger } />
                        <img className={ styles.menuIconCloseNew } alt="" src={ hamburgerClose } />
                    </div>
                </a>
              </span>
              /*esfmt-ignore-end*/
            </div>
            <nav className={ styles.mainNavNew + " " + (this.state.expanded ? styles.mainNavNewShow : "") }>
              <form className={ styles.mobileSearchContainerNew }>
                <div className={ styles.searchIconContainerNew }>
                  <img className={ styles.searchIconNew } alt="Search" src="/sites/all/themes/smallbizd7/search-icon.svg" />
                </div>
                <input type="text" className={ styles.searchInputFieldNew } placeholder="Search SBA.gov"></input>
              </form>
              <div><a className={ styles.navLinkNew } href="/starting-managing-business">Starting & Managing</a></div>
              <div><a className={ styles.navLinkNew } href="/loans-grants">Loans & Grants</a></div>
              <div><a className={ styles.navLinkNew } href="/contracting">Contracting</a></div>
              <div><a className={ styles.navLinkNew } href="/tools/sba-learning-center/search/training">Learning Center</a></div>
              <div><a className={ styles.navLinkNew } href="/tools/local-assistance">Local Assistance</a></div>
              <div><a className={ styles.navLinkNew } href="/about-sba">About Us</a></div>
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

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Header);
