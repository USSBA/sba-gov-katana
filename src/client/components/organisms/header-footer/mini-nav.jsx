import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as ContentActions from "../../../actions/content.js";
import clientConfig from "../../../services/client-config.js";

import styles from './mini-nav.scss';
import cookie from 'react-cookie';

export class MiniNav extends React.Component {
  constructor(props) {
    super();
    this.state = {
      searchIsExpanded: false,
      translateIsExpanded: false,
      searchValue: "",
      userId: "",
      userLoggedOn: false
    };
  }

  handleSearchToggle(e) {
    e.preventDefault();
    this.setState({
      searchIsExpanded: !this.state.searchIsExpanded
    });
  }

  handleSearchKeypress(e){
      if(e.keyCode === 13){
          this.handleSearchToggle(e);
      }
  }

  handleSearchChange(e) {
    event.preventDefault();
    this.setState({
      searchValue: e.target.value
    });
  }

  handleGoogleTranslateClick(e) {
    event.preventDefault();
    this.setState({
      translateIsExpanded: !this.state.translateIsExpanded
    });
  }

  componentWillMount() {
    this.setState({
      userId: cookie.load('DRUPAL_UID'),
      userLoggedOn: clientConfig.isUserLoggedIn
    });
  }

  componentDidMount() {
    this.props.actions.fetchContentIfNeeded("userRoles", this.state.userId, {});
  }

  submitSearch(e) {
    e.preventDefault();
    let uri = encodeURI("/tools/search-result-page?search=" + this.state.searchValue);
    document.location = uri;
  }

  render() {
    let adminWidget = "";
    if (this.props.userRoles) {
      if (this.props.userRoles.length > 0) {
        adminWidget = (<a tabIndex="0" className={ styles.miniNavLinkNew } href="/admintool">Admin Tool</a>);
      }
    }

    const loggedInUser = this.state.userLoggedOn ?
      (<div key={ 1 } className={ styles.loggedInUser }>
         { adminWidget }
         <a tabIndex="0" className={ styles.miniNavLinkNew } href={ "/user/" + this.state.userId + "/edit" }>My Account</a>
         <a tabIndex="0" className={ styles.miniNavLinkNew } href="/user/logout">Log Out</a>
       </div>) :
      [(<a key={ 5 } tabIndex="0" className={ styles.miniNavLinkNew } href="/user/register">Register</a>),(<a key={ 6 } tabIndex="0" className={ styles.miniNavLinkNew } href="/user/login">Log In</a>)];
    const searchBar = this.state.searchIsExpanded
      ? (
      <form key={ 2 } id={ styles.searchBarNew } onBlur={ this.handleSearchToggle.bind(this) } onSubmit={ this.submitSearch.bind(this) }>
        <input id="search-input" autoFocus id={ styles.searchInputNew } type='text' placeholder='Search' onChange={ this.handleSearchChange.bind(this) } onKeyDown={ this.handleKeyPressOnSearch }></input>
        <i id="search-btn-new" tabIndex="0" alt="search button" className={ styles.searchIconNew + " fa fa-search" } aria-hidden="true" onMouseDown={ this.submitSearch.bind(this) }></i>
      </form>
      )
      : (
      <a key={ 3 } id="search-toggle-link" tabIndex="0" onClick={ this.handleSearchToggle.bind(this) } onKeyDown={ this.handleSearchKeypress.bind(this) }>
        <i id="search-toggle" alt="search icon" className={ styles.searchIconNew + " fa fa-search" } aria-hidden="true"></i>
      </a>
      );

    let googleTranslateBtn = this.state.translateIsExpanded
      ? ""
      : <a tabIndex="0" id="translate-toggle-new" className={ styles.miniNavLinkNew } onClick={ this.handleGoogleTranslateClick.bind(this) } href="#">Translate</a>;

    return (
      <nav role="navigation" aria-label="mini navigation" className={ styles.miniNavNew }>
        <div key={ 0 } className={ this.state.translateIsExpanded
                                   ? styles.googleTranslateElementVisible
                                   : styles.googleTranslateElement } id="google_translate_element"></div>
        { googleTranslateBtn }
        <a key={ 10 } tabIndex="0" className={ styles.miniNavLinkNew } href="https://es.sba.gov/">SBA en español</a>
        <a key={ 11 } tabIndex="0" className={ styles.miniNavLinkNew } href="/for-lenders">For Lenders</a>
        <a key={ 12 } tabIndex="0" className={ styles.miniNavLinkNew } href="/about-sba/sba-newsroom">Newsroom</a>
        <a key={ 13 } tabIndex="0" className={ styles.miniNavLinkNew } href="/about-sba/what-we-do/contact-sba">Contact Us</a>
        { loggedInUser }
        { searchBar }
      </nav>
      );
  }
}

function mapReduxStateToProps(reduxState) {
  return {
    userRoles: reduxState.contentReducer["userRoles"]
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(ContentActions, dispatch)
  };
}
export default connect(mapReduxStateToProps, mapDispatchToProps)(MiniNav);
