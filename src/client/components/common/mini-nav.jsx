import React from 'react';
import styles from './mini-nav.scss';

class MiniNav extends React.Component {
  constructor(props) {
    super();
    this.state = {
      searchIsExpanded: false,
      translateIsExpanded: false,
      searchValue: ""
    };
  }

  handleSearchToggle(e) {
    e.preventDefault();
    this.setState({
      searchIsExpanded: !this.state.searchIsExpanded
    });
  }

  handleSearchChange(e) {
    event.preventDefault();
    this.setState({searchValue: e.target.value});
  }

  handleGoogleTranslateClick(e) {
    event.preventDefault();
    this.setState({
      translateIsExpanded: !this.state.translateIsExpanded
    });
  }

  submitSearch(e) {
    e.preventDefault();
    let uri = encodeURI("/tools/search-result-page?search=" + this.state.searchValue);
    document.location = uri;
  }

  render() {
    const searchBar = this.state.searchIsExpanded
      ? (
        <form id={styles.searchBarNew} onBlur={this.handleSearchToggle.bind(this)} onSubmit={this.submitSearch.bind(this)}>
          <input autoFocus id={styles.searchInputNew} type='text' placeholder='Search' onChange={this.handleSearchChange.bind(this)} onKeyPress={this.handleKeyPressOnSearch}></input>
          <i id="search-btn-new" tabIndex="0" alt="search button" className={styles.searchIconNew + " fa fa-search"} aria-hidden="true" onMouseDown={this.submitSearch.bind(this)}></i>
        </form>
      )
      : (
        <a id="search-toggle-link" tabIndex="0" onClick={this.handleSearchToggle.bind(this)}>
          <i id="search-toggle" alt="search icon" className={styles.searchIconNew + " fa fa-search"} aria-hidden="true"></i>
        </a>
      );

    let googleTranslateBtn = this.state.translateIsExpanded
      ? ""
      : <a tabIndex="0" id="translate-toggle-new" className={styles.miniNavLinkNew} onClick={this.handleGoogleTranslateClick.bind(this)} href="#">Translate</a>;

    return (
      <nav role="navigation" aria-label="mini navigation" className={styles.miniNavNew}>
        <div className={this.state.translateIsExpanded
          ? styles.googleTranslateElementVisible
          : styles.googleTranslateElement} id="google_translate_element"></div>
        {googleTranslateBtn}
        <a tabIndex="0" className={styles.miniNavLinkNew} href="https://es.sba.gov/">SBA en español</a>
        <a tabIndex="0" className={styles.miniNavLinkNew} href="/for-lenders">For Lenders</a>
        <a tabIndex="0" className={styles.miniNavLinkNew} href="/about-sba/sba-newsroom">Newsroom</a>
        <a tabIndex="0" className={styles.miniNavLinkNew} href="/about-sba/what-we-do/contact-sba">Contact Us</a>
        <a tabIndex="0" className={styles.miniNavLinkNew} href="/user/register">Register</a>
        <a tabIndex="0" className={styles.miniNavLinkNew} href="/user/login">Log In</a>
        {searchBar}
      </nav>
    );
  }
}

export default MiniNav;
