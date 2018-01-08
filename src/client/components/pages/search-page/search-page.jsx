import { isEmpty } from 'lodash'
import React, { PureComponent } from 'react'
import { browserHistory } from 'react-router'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { BasicLink, SmallPrimaryButton, TextInput } from 'atoms'
import { Paginator } from 'molecules'
import styles from './search-page.scss'
import { logPageEvent } from '../../../services/analytics.js'
import * as ContentActions from '../../../actions/content.js'

const getQueryParams = search => {
  const decoded = decodeURIComponent(search)
  const formatted = decoded.replace(/\+/g, ' ')

  let searchTerm = formatted.split('q=')[1]
  if (!isEmpty(searchTerm)) {
    searchTerm = searchTerm.indexOf('&') !== -1 ? searchTerm.split('&')[0] : searchTerm
  } else {
    searchTerm = ''
  }

  let pageNumber = formatted.split('p=')[1]
  if (!isEmpty(pageNumber)) {
    pageNumber = Number(pageNumber.indexOf('&') !== -1 ? pageNumber.split('&')[0] : pageNumber)
    pageNumber = isNaN(pageNumber) ? 1 : pageNumber
  } else {
    pageNumber = 1
  }

  return {
    searchTerm,
    pageNumber
  }
}

class SearchPage extends PureComponent {
  constructor() {
    super()

    this.state = {
      searchTerm: '',
      newSearchTerm: '',
      searchResults: [],
      pageNumber: 1,
      pageSize: 10,
      itemCount: 0,
      start: 0
    }
  }

  componentWillMount() {
    // if there is are parameters
    if (!isEmpty(document.location.search)) {
      // on componentMount, pull search term from url
      const { searchTerm, pageNumber } = getQueryParams(document.location.search)

      // also, match the new search term to this current search term
      // this enables the input field and the submit button to function
      // as expected when the browser refreshes the page
      const newSearchTerm = searchTerm

      this.setState(
        {
          searchTerm,
          newSearchTerm,
          pageNumber
        },
        () => {
          let newStartValue = 0
          pageNumber > 1 ? newStartValue = (pageNumber - 1) * 10 : newStartValue = 0

          this.props.actions.fetchContentIfNeeded('search', 'search', {
            term: searchTerm,
            pageNumber: pageNumber,
            pageSize: this.state.pageSize,
            start: newStartValue
          })
        }
      )
    }
  }

  componentWillReceiveProps(nextProps) {
    // The SearchBar child component's browserHistory.push() call
    // triggers this componentWillReceiveProps() lifecyle method

    // on componentWillReceiveProps
    // get the search term from the React Router url
    const { searchTerm } = getQueryParams(nextProps.location.search)

    // update search results
    const { searchResults, itemCount } = nextProps

    this.setState(
      {
        searchTerm,
        searchResults,
        itemCount
      },
      () => {
        if (!isEmpty(nextProps.location.search)) {
          // after the search term state has been updated
          // show it's value in the input field
          // --
          // this enables the input field to update itself
          // when a browser history is navigated
          this.updateSearchInputValue(searchTerm)
        } else {
          this.updateSearchInputValue('')
        }
      }
    )
  }

  updateSearchInputValue(value) {
    const input = document.getElementById('search')
    input.value = value
  }

  onSearchInputChange(newSearchTerm) {
    const encoded = encodeURIComponent(newSearchTerm)
    this.setState({ newSearchTerm: encoded })
  }

  onPageNumberChange(pageNumber) {
    if (pageNumber > 1) {
      this.setState({
        start: (pageNumber - 1) * 10
      })
    } else {
      this.setState({
        start: 0
      })
    }
    this.setState({
      pageNumber
    }, () => {
      this.onSubmit(true)
    })
  }

  onSubmit(resetPageNumber) {
    const { newSearchTerm: term, pageNumber, pageSize, start } = this.state

    if (resetPageNumber === 1) {
      this.setState({
        start: 0
      })
    }

    const data = {
      term,
      pageNumber,
      pageSize,
      start
    }

    this.props.actions.fetchContentIfNeeded('search', 'search', data)

    // browserHistory.push() triggers the HOC componentWillReceiveProps() lifecyle method

    browserHistory.push({
      pathname: '/search',
      search: '?q=' + term + '&p=' + pageNumber
    })
  }

  render() {
    const { searchTerm, newSearchTerm, searchResults } = this.state

    const { hasNoResults } = this.props

    return (
      <div className={styles.container}>
        <h1>Search</h1>
        <SearchBar
          searchTerm={searchTerm}
          newSearchTerm={newSearchTerm}
          onSearchInputChange={this.onSearchInputChange.bind(this)}
          onSubmit={this.onSubmit.bind(this)}
        />
        {!isEmpty(searchTerm) && (
          <div>
            <hr />
            <div>
              {searchResults.length > 0 && (
                <div>
                  <ResultsList {...this.state} onPageNumberChange={this.onPageNumberChange.bind(this)} />
                </div>
              )}
              {!hasNoResults &&
                searchResults.length === 0 && (
                  <div>
                    <p className="results-message">loading...</p>
                  </div>
                )}
              {hasNoResults && (
                <div>
                  <p className="results-message">Sorry, we couldn't find anything matching that query.</p>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    )
  }
}

const SearchBar = props => {
  const { searchTerm, newSearchTerm, onSearchInputChange, onSubmit } = props

  const submit = term => {
    props.actions.fetchContentIfNeeded('search', 'search', {
      term
    })

    // browserHistory.push() triggers the HOC componentWillReceiveProps() lifecyle method

    browserHistory.push({
      pathname: '/search',
      search: '?q=' + term
    })
  }

  return (
    <div>
      <div className={styles.textInput}>
        <TextInput
          id="search"
          errorText={'Please enter the correct thing.'}
          label="What are you looking for?"
          validationState={''}
          defaultValue={searchTerm}
          onChange={obj => {
            onSearchInputChange(obj.target.value)
          }}
          onKeyDown={obj => {
            const enterKeyCode = 13
            if (obj.keyCode === enterKeyCode && searchTerm !== decodeURIComponent(newSearchTerm)) {
              onSubmit(1)
            }
          }}
          aria-controls="results-list"
        />
      </div>
      <div className={styles.searchButton}>
        <SmallPrimaryButton
          id="submit-button"
          text="Search"
          onClick={() => {
            if (!isEmpty(searchTerm) && searchTerm !== decodeURIComponent(newSearchTerm)) {
              onSubmit(1)
            }
          }}
          aria-controls="results-list"
        />
      </div>
    </div>
  )
}

const ResultsList = props => {
  const { searchTerm, pageNumber, pageSize, searchResults, itemCount, onPageNumberChange } = props

  const handleBack = () => {
    const newPageNumber = Math.max(1, pageNumber - 1)
    onPageNumberChange(newPageNumber)
    logPageEvent({
      category: 'Show-More-Results',
      action: 'Previous'
    })
  }

  const handleForward = () => {
    const newPageNumber = Math.min(Math.max(1, Math.ceil(itemCount / pageSize)), pageNumber + 1)
    onPageNumberChange(newPageNumber)
    logPageEvent({
      category: 'Show-More-Results',
      action: 'Next'
    })
  }

  const renderPaginator = () => {
    return (
      <div className={styles.paginator}>
        <Paginator
          id={"current-total-result-number"}
          pageNumber={pageNumber}
          pageSize={pageSize}
          total={itemCount}
          onBack={() => {
            handleBack()
          }}
          onForward={() => {
            handleForward()
          }}
        />
      </div>
    )
  }

  const renderList = () => {
    return (
      <div className={styles.results}>
        {searchResults.map((item, index) => {
          let title
          let summary
          let url

          if (!isEmpty(item.fields)) {
            title = item.fields.title
            summary = item.fields.summary
            url = item.fields.url
          }

          // only show results with URL
          // if (url) {
            return (
              <div key={index} className={`${styles.result}  result-box`}>
                <div className={styles.title}>
                  <BasicLink url={url} myClassName={"result-title"}>{title}</BasicLink>
                </div>
                <div className={`${styles.summary} result-summary`}>{summary}</div>
                <div className={styles.url}>
                  <BasicLink url={url} myClassName={"result-url"}>{url}</BasicLink>
                </div>
              </div>
            )
          // }
        })}
      </div>
    )
  }

  return (
    <div>
      <div>
        <div className={styles.searchTerm}>
          <span id="search-term-title">"{searchTerm}"</span>
        </div>
        {renderPaginator()}
      </div>
      <div role="region" id="results-list" aria-live="polite" aria-relevant="additions removals">
        {renderList()}
      </div>
      {renderPaginator()}
    </div>
  )
}

function mapReduxStateToProps(reduxState, ownProps) {
  let searchResults = []
  let itemCount = 0
  let hasNoResults = false

  if (!isEmpty(reduxState.contentReducer.search)) {
    searchResults = reduxState.contentReducer.search.hits.hit
    itemCount = reduxState.contentReducer.search.hits.found
    hasNoResults = reduxState.contentReducer.search.hasNoResults
  }

  return {
    searchResults,
    itemCount,
    hasNoResults
  }
}

=======
}

const ResultsList = props => {
  const { searchTerm, pageNumber, pageSize, searchResults, itemCount, onPageNumberChange } = props

  const handleBack = () => {
    const newPageNumber = Math.max(1, pageNumber - 1)
    onPageNumberChange(newPageNumber)
    logPageEvent({
      category: 'Show-More-Results',
      action: 'Previous'
    })
  }

  const handleForward = () => {
    const newPageNumber = Math.min(Math.max(1, Math.ceil(itemCount / pageSize)), pageNumber + 1)
    onPageNumberChange(newPageNumber)
    logPageEvent({
      category: 'Show-More-Results',
      action: 'Next'
    })
  }

  const renderPaginator = () => {
    return (
      <div className={styles.paginator}>
        <Paginator
          pageNumber={pageNumber}
          pageSize={pageSize}
          total={itemCount}
          onBack={() => {
            handleBack()
          }}
          onForward={() => {
            handleForward()
          }}
        />
      </div>
    )
  }

  const renderList = () => {
    return (
      <div className={styles.results}>
        {searchResults.map((item, index) => {
          let title
          let summary
          let url

          if (!isEmpty(item.fields)) {
            title = item.fields.title
            summary = item.fields.summary
            url = item.fields.url
          }

          return (
            <div key={index} className={styles.result}>
              <div className={styles.title}>
                <BasicLink url={url}>{title}</BasicLink>
              </div>
              <div className={styles.summary}>{summary}</div>
              <div className={styles.url}>
                <BasicLink url={url}>{url}</BasicLink>
              </div>
            </div>
          )
        })}
      </div>
    )
  }

  return (
    <div>
      <div>
        <div className={styles.searchTerm}>
          <span>"{searchTerm}"</span>
        </div>
        {renderPaginator()}
      </div>
      <div role="region" id="results-list" aria-live="polite" aria-relevant="additions removals">
        {renderList()}
      </div>
      {renderPaginator()}
    </div>
  )
}

function mapReduxStateToProps(reduxState, ownProps) {
  let searchResults = []
  let itemCount = 0
  let hasNoResults = false

  if (!isEmpty(reduxState.contentReducer.search)) {
    searchResults = reduxState.contentReducer.search.hits.hit
    itemCount = reduxState.contentReducer.search.hits.found
    hasNoResults = reduxState.contentReducer.search.hasNoResults
  }

  return {
    searchResults,
    itemCount,
    hasNoResults
  }
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(ContentActions, dispatch)
  }
}

export default connect(mapReduxStateToProps, mapDispatchToProps)(SearchPage)

export { SearchPage, SearchBar, ResultsList }
