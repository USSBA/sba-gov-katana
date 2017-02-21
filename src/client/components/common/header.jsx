import React from 'react';
import { Grid, Navbar, Nav, NavItem, NavDropdown, MenuItem, Row, Col, Image, Button, Glyphicon, FormGroup, FormControl, InputGroup } from 'react-bootstrap';
import styles from '../../styles/header/header.scss';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import sbaLogo from '../../../../public/assets/images/logo.png';
import sbaLogoMobile from '../../../../public/assets/svg/sba-logo-mobile.svg';
import hamburgerClose from '../../../../public/assets/svg/close.svg';
import hamburger from '../../../../public/assets/svg/hamburger.svg';
import *  as MainMenuActions from '../../actions/main-menu.js';
import { isEmpty } from "lodash";


class Header extends React.Component {
  constructor(props) {
    super();
    this.state = {
      expanded: false,
      searchValue: ""
    }
  }

  toggleNav() {
    this.setState({
      expanded: !this.state.expanded
    })
  }

  handleSearchChange(e) {
    console.log(this.state.searchValue);
    this.setState({
      searchValue: e.target.value
    })
  }

  submitSearch(e) {
    e.preventDefault();
    let uri = encodeURI("/tools/search-result-page?search=" + this.state.searchValue);
    document.location = uri
  }

  componentWillMount() {
    this.props.actions.fetchMainMenu();
  }

  render() {
    let menuContainer = [];
    let fetchedMenuArray = [];
    if (this.props.mainMenuData.fetched === true) {
      fetchedMenuArray = this.props.mainMenuData.fetchedMainMenu;
      fetchedMenuArray.forEach((mainMenu, index) => {
        console.log(mainMenu.link_title);
        let subMenuContainer = [];
        if( (mainMenu.isParent) ) {
          mainMenu.children.forEach((subMenu, subMenuIndex) => {
            console.log("    " + subMenu.link_title);
            let subSubMenuContainer = [];
            if (subMenu.isParent) {
              subMenu.children.forEach((subSubMenu, subSubMenuIndex) => {
                console.log("        " + subSubMenu.link_title);
                subSubMenuContainer.push(
                  <li key={ subSubMenuIndex }>
                    <a tabIndex="0" href={ subSubMenu.link }>
                      { subSubMenu.link_title }
                    </a>
                  </li>);
              });
            }
            subMenuContainer.push(
              <ul key={ subMenuIndex } className={ styles.columnNew }>
                <li>
                  <h2><a tabIndex="0" href={ subMenu.link }>{ subMenu.link_title }</a></h2>
                </li>
                { subSubMenuContainer }
              </ul>
            );
          });
        }
        menuContainer.push(
          <li key={ index }>
            <a tabIndex="0" aria-haspopup="true" title={ mainMenu.link_title } className={ styles.mainBtnNew + " " + styles.normalizeMenuItemNew } href={ mainMenu.link }>
              <span>{ mainMenu.link_title }</span>
              <div className={ styles.triangleNew }></div>
            </a>
            <ul aria-label="submenu" className={ styles.mainMenuNew }>
              <li className={ styles.normalizeMenuItemNew }>
                { subMenuContainer }
              </li>
            </ul>
          </li>);
      });
    } else {
      menuContainer.push(<div></div>);
    }

    return (
      <div>
        <header className={ styles.headerNew }>
          <div className={ styles.navbarNew }>
            <a href="/"><img className={ styles.logoNew } alt="Small Business Administration" src={ sbaLogo } /></a>
            <nav role="navigation" aria-label="mini navigation" className={ styles.miniNavNew }>
              <div id={ styles.googleTranslateElement }></div>
              <a tabIndex="0" id="translate-toggle-new" className={ styles.miniNavLinkNew } href="#">Translate</a>
              <a tabIndex="0" className={ styles.miniNavLinkNew } href="https://es.sba.gov/">SBA En Espaol</a>
              <a tabIndex="0" className={ styles.miniNavLinkNew } href="/for-lenders">For Lenders</a>
              <a tabIndex="0" className={ styles.miniNavLinkNew } href="/about-sba/sba-newsroom">Newsroom</a>
              <a tabIndex="0" className={ styles.miniNavLinkNew } href="/about-sba/what-we-do/contact-sba">Contact Us</a>
              <a tabIndex="0" className={ styles.miniNavLinkNew } href="/user/register">Register</a>
              <a tabIndex="0" className={ styles.miniNavLinkNew } href="/user/login?destination=about-sba%2Fwhat-we-do%2Fcontact-sba">Log In</a>
              <a id="search-toggle-link" tabIndex="0" href="#"><i id="search-toggle" className={ styles.searchIconNew + " fa fa-search" } aria-hidden="true"></i></a>
              <form id={ styles.searchBarNew }>
                <input id={ styles.searchInputNew } type='text' placeholder='Search'></input><i id="search-btn-new" tabIndex="0" className={ styles.searchIconNew + " fa fa-search" } aria-hidden="true"></i>
              </form>
            </nav>
            <br/>
            <nav role="menubar" aria-label="main navigation bar with dropdown submenus" className={ styles.mainNavNew }>
              <ul className="reverse-ul">
                { menuContainer }
              </ul>
            </nav>
          </div>
        </header>
        <div className={ styles.mobileHeaderContainerNew }>
          <div className={ styles.mobileMainHeaderNew }>
            <a href="/">
              <img className={ styles.logoNew } alt="Small Business Administration" src={ sbaLogo } />
            </a>
            <a href="" className={ styles.menuBtnNew }>
              <div>
                <div className={ styles.menuBtnTextNew }>MENU</div>
                <img className={ styles.menuIconHamburgerNew } alt="" src={ hamburger } />
                <img className={ styles.menuIconCloseNew } alt="" src={ hamburgerClose } />
              </div>
            </a>
          </div>
          <nav className={ styles.mainNavNew }>
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
      );
  }
}


function mapStateToProps(state) {
  return {
    mainMenuData: state.mainMenuReducer
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(MainMenuActions, dispatch)
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Header);



