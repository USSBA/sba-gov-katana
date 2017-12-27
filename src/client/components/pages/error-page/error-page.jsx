import React from 'react'

import clientConfig from '../../../services/client-config.js'
import errorImg from 'assets/images/error-page/SBA_404.png'
import styles from './error-page.scss'
import { BasicLink, SmallIcon, TextInput } from 'atoms'
import { RemoveMainLoader } from 'molecules'

class ErrorPage extends React.Component {
  constructor(props) {
    super()
    this.state = {
      searchValue: ''
    }
  }

  handleSearchChange(e) {
    e.preventDefault()
    this.setState({ searchValue: e.target.value })
  }

  submitSearch(e) {
    e.preventDefault()
    let uri = encodeURI(clientConfig.search + this.state.searchValue)
    document.location = uri
  }
  render() {
    let text = clientConfig.moon
      ? "Just like a business on the moon, the page you're looking for doesn't exist."
      : "The page you're looking for doesn't exist.  Return to the home page, or search for what you're trying to find."
    return (
      <div className={styles.errorContainer}>
        <RemoveMainLoader />
        {clientConfig.moon ? <img src={errorImg} alt="Error Image" /> : undefined}
        <div className={styles.formContainer + ' ' + (clientConfig.moon ? styles.moon : styles.noMoon)}>
          <h1 className={styles.title}>404</h1>
          <h3 className={styles.subTitle}>{text}</h3>
          <p>
            Return to the <BasicLink url="/" text="home page" />, or search for what you're trying to find.
          </p>
          <form
            key={2}
            id="error-form"
            className={styles.errorPageSearch}
            onSubmit={this.submitSearch.bind(this)}
          >
            <TextInput
              aria-label="search sba.gov"
              id="error-page-search-input"
              placeholder="Search"
              onChange={this.handleSearchChange.bind(this)}
              autoFocus
            />
            <SmallIcon
              extraClassName={styles.errorPageSearchIcon}
              id="error-page-search-button"
              onClick={this.submitSearch.bind(this)}
              alt="error page search button"
              fontAwesomeIconClassName="search"
            />
          </form>
        </div>
      </div>
    )
  }
}

export default ErrorPage
