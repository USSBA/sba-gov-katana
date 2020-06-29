import React from 'react'
import PropTypes from 'prop-types'
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
    const uri = encodeURI(clientConfig.searchUrl + this.state.searchValue)
    document.location = uri
  }

  render() {
    const text = "Just like a business on the moon, the page you're looking for doesn't exist."
    const { linkUrl, linkMessage } = this.props

    return (
      <div className={styles.errorPage} data-testid={'error-page'}>
        <RemoveMainLoader />
        <div className={styles.container}>
          <img src={errorImage} alt="error image" />
          <div tabIndex="0" className={styles.content}>
            <h1 data-cy="error-page-title">404</h1>
            <h2>Page not found</h2>
            <h3 data-cy="error-page-message">
              {text} Return to the <Link to={linkUrl}>{linkMessage}</Link>, or search for what you're trying
              to find.
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
                <Button alternate primary>
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

ErrorPage.defaultProps = {
  linkUrl: '/',
  linkMessage: 'home page'
}

ErrorPage.propTypes = {
  linkUrl: PropTypes.string,
  linkMessage: PropTypes.string
}

export default ErrorPage
