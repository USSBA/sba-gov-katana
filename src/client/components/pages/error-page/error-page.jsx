import React from 'react'

import clientConfig from '../../../services/client-config.js'
import errorImage from 'assets/images/error-page/moon.png'
import styles from './error-page.scss'
import { Link, Button, DecorativeDash, TextInput } from 'atoms'
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
    let uri = encodeURI(clientConfig.searchUrl + this.state.searchValue)
    document.location = uri
  }
  render() {
    const text = clientConfig.moon
      ? "Just like a business on the moon, the page you're looking for doesn't exist."
      : "The page you're looking for doesn't exist."

    return (
      <div className={styles.errorPage}>
        <RemoveMainLoader />
        <div className={clientConfig.moon && styles.container}>
          {clientConfig.moon && <img src={errorImage} alt="error image" />}
          <div className={`${styles.content} ${!clientConfig.moon && styles.darkness}`}>
            <h1>404</h1>
            <h2>Page not found</h2>
            <DecorativeDash width={4.278} />
            <h3>
              {text} Return to the <Link to="/">home page</Link>, or search for what you're trying to find.
            </h3>
            <form onSubmit={this.submitSearch.bind(this)}>
              <div className={styles.inputContainer}>
                <TextInput
                  aria-label="Search SBA.gov"
                  autoFocus
                  id="error-page-search"
                  placeholder="Search"
                  onChange={this.handleSearchChange.bind(this)}
                />
                <i alt="search icon" aria-hidden="true" className="fa fa-search" />
              </div>
              <div className={styles.buttonContainer}>
                <Button alternate primary submit>
                  Search
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    )
  }
}

export default ErrorPage
