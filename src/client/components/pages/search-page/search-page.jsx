import _ from 'lodash'
import React, { PureComponent } from 'react'
import { browserHistory } from 'react-router'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { BasicLink, SmallPrimaryButton, TextInput } from 'atoms'
import { Paginator } from 'molecules'
import styles from './search-page.scss'
import { logPageEvent } from '../../../services/analytics.js'
import * as ContentActions from '../../../actions/content.js'

const getSearchTerm = search => {
  const decoded = decodeURIComponent(search)
  const formatted = decoded.replace(/\+/g, ' ')
  return formatted.split('?q=')[1]
}

class SearchPage extends PureComponent {
  constructor() {
    super()

    this.state = {
      searchTerm: '',
      newSearchTerm: '',
      searchResults: [
        {
          title: 'Title',
          description: 'Description',
          url: '#'
        }
      ],
      pageNumber: 1,
      pageSize: 5
    }
  }

  componentWillMount() {
    // on componentMount, pull search term from url
    const searchTerm = getSearchTerm(document.location.search)

    // also, match the new search term to this current search term
    // this enables the input field and the submit button to function
    // as expected when the browser refreshes the page
    const newSearchTerm = searchTerm

    this.setState({
      searchTerm,
      newSearchTerm
    })

    this.props.actions.fetchContentIfNeeded('search', 'search', {
      term: searchTerm
    })
  }

  componentWillReceiveProps(nextProps) {
    // The SearchBar child component's browserHistory.push() call
    // triggers this componentWillReceiveProps() lifecyle method

    // on componentWillReceiveProps
    // get the search term from the React Router url
    const searchTerm = getSearchTerm(nextProps.location.search)

    // update search results
    const { searchResults } = nextProps

    this.setState(
      {
        searchTerm,
        searchResults
      },
      () => {
        if (!_.isEmpty(nextProps.location.search)) {
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

  render() {
    const { searchTerm, searchResults, newSearchTerm } = this.state

    return (
      <div className={styles.container}>
        <h1>Search</h1>
        <SearchBar
          searchTerm={searchTerm}
          onSearchInputChange={this.onSearchInputChange.bind(this)}
          newSearchTerm={newSearchTerm}
          actions={this.props.actions}
        />
        {!_.isEmpty(searchTerm) && (
          <div>
            <hr />
            {searchResults !== undefined ? (
              <div>
                {searchResults.length > 0 ? (
                  <ResultsList {...this.state} />
                ) : (
                  <p className="results-message">Sorry, we couldn't find anything matching that query.</p>
                )}
              </div>
            ) : (
              <p className="results-message">...loading...</p>
            )}
          </div>
        )}
      </div>
    )
  }
}

const SearchBar = props => {
  const { searchTerm, onSearchInputChange, newSearchTerm } = props

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
              submit(newSearchTerm)
            }
          }}
        />
      </div>
      <div className={styles.searchButton}>
        <SmallPrimaryButton
          text="Search"
          onClick={() => {
            if (!_.isEmpty(searchTerm) && searchTerm !== decodeURIComponent(newSearchTerm)) {
              submit(newSearchTerm)
            }
          }}
        />
      </div>
    </div>
  )
}

const ResultsList = props => {
  const { searchTerm, pageNumber, pageSize, searchResults } = props
  const itemCount = searchResults.length

  const handleBack = () => {
    //const { pageNumber, onPageChange } = props
    //const newPageNumber = Math.max(1, pageNumber - 1)
    //onPageChange(newPageNumber)
    //logPageEvent({ category: 'Show-More-Results', action: 'Previous' })
  }

  const handleForward = () => {
    //const { itemCount, pageNumber, onPageChange } = props
    //const newPageNumber = Math.min(Math.max(1, Math.ceil(itemCount / props.pageSize)), pageNumber + 1)
    //onPageChange(newPageNumber)
    //logPageEvent({ category: 'Show-More-Results', action: 'Next' })
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
          return (
            <div key={index} className={styles.result}>
              <div className={styles.title}>
                <BasicLink url={item.url}>{item.title}</BasicLink>
              </div>
              <div className={styles.description}>{item.description}</div>
              <div className={styles.url}>
                <BasicLink url={item.url}>{item.url}</BasicLink>
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
      <div>{renderList()}</div>
      {renderPaginator()}
    </div>
  )
}

function mapReduxStateToProps(reduxState, ownProps) {
  const searchResults = reduxState.contentReducer.search

  return { searchResults }
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(ContentActions, dispatch)
  }
}

export default connect(mapReduxStateToProps, mapDispatchToProps)(SearchPage)

export { SearchPage, SearchBar, ResultsList }
