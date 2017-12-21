import _ from 'lodash'
import React, { PureComponent } from 'react'
import { browserHistory } from 'react-router'
import { BasicLink, SmallPrimaryButton, TextInput } from 'atoms'
import { Paginator } from 'molecules'
import styles from './search-page.scss'

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
      paginator: {
        start: 0,
        end: 10
      },
      paginatorTotal: 98,
      list: [
        {
          title: 'Title',
          description: 'Description',
          url: '#'
        }
      ]
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
      newSearchTerm,
      list: resultsList
    })
  }

  componentWillReceiveProps(nextProps) {
    // The SearchBar child component's browserHistory.push() call
    // triggers this componentWillReceiveProps() lifecyle method

    // on componentWillReceiveProps
    // get the search term from the React Router url
    const searchTerm = getSearchTerm(nextProps.location.search)

    this.setState({ searchTerm }, () => {
      // after the search term state has been updated
      // show it's value in the input field
      // --
      // this enables the input field to update itself
      // when a browser history is navigated
      this.updateSearchInputValue(searchTerm)
    })
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
    const { searchTerm, list, newSearchTerm } = this.state

    return (
      <div className={styles.container}>
        <h1>Search</h1>
        <SearchBar
          searchTerm={searchTerm}
          onSearchInputChange={this.onSearchInputChange.bind(this)}
          newSearchTerm={newSearchTerm}
        />
        {!_.isEmpty(searchTerm) && (
          <div>
            <hr />
            <ResultsList {...this.state} />
          </div>
        )}
      </div>
    )
  }
}

const SearchBar = props => {
  const { searchTerm, onSearchInputChange, newSearchTerm } = props

  const submit = term => {
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
            if (searchTerm !== decodeURIComponent(newSearchTerm)) {
              submit(newSearchTerm)
            }
          }}
        />
      </div>
    </div>
  )
}

const ResultsList = props => {
  const { searchTerm, paginator, paginatorTotal } = props

  const list = props.list.map((item, index) => {
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
  })

  const renderPaginator = () => {
    return (
      <div className={styles.paginator}>
        <Paginator
          start={paginator.start}
          end={paginator.end}
          total={paginatorTotal}
          onBack={() => true}
          onForward={() => true}
        />
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
      <div className={styles.results}>{list}</div>
      {renderPaginator()}
    </div>
  )
}

const resultsList = [
  {
    title: 'Title',
    description:
      'Excepturi quod vel dignissimos. Aut ut eligendi repellendus. Necessitatibus dicta commodi voluptatem molestiae praesentium hic accusamus cupiditate. Nesciunt at ab est. Voluptate et enim nisi voluptates aliquam magnam.',
    url: 'https://sba.gov/lorem-ipsum/'
  },
  {
    title: 'Title',
    description:
      'Excepturi quod vel dignissimos. Aut ut eligendi repellendus. Necessitatibus dicta commodi voluptatem molestiae praesentium hic accusamus cupiditate. Nesciunt at ab est. Voluptate et enim nisi voluptates aliquam magnam.',
    url: 'https://sba.gov/lorem-ipsum/'
  },
  {
    title: 'Title',
    description:
      'Excepturi quod vel dignissimos. Aut ut eligendi repellendus. Necessitatibus dicta commodi voluptatem molestiae praesentium hic accusamus cupiditate. Nesciunt at ab est. Voluptate et enim nisi voluptates aliquam magnam.',
    url: 'https://sba.gov/lorem-ipsum/'
  },
  {
    title: 'Title',
    description:
      'Excepturi quod vel dignissimos. Aut ut eligendi repellendus. Necessitatibus dicta commodi voluptatem molestiae praesentium hic accusamus cupiditate. Nesciunt at ab est. Voluptate et enim nisi voluptates aliquam magnam.',
    url: 'https://sba.gov/lorem-ipsum/'
  },
  {
    title: 'Title',
    description:
      'Excepturi quod vel dignissimos. Aut ut eligendi repellendus. Necessitatibus dicta commodi voluptatem molestiae praesentium hic accusamus cupiditate. Nesciunt at ab est. Voluptate et enim nisi voluptates aliquam magnam.',
    url: 'https://sba.gov/lorem-ipsum/'
  },
  {
    title: 'Title',
    description:
      'Excepturi quod vel dignissimos. Aut ut eligendi repellendus. Necessitatibus dicta commodi voluptatem molestiae praesentium hic accusamus cupiditate. Nesciunt at ab est. Voluptate et enim nisi voluptates aliquam magnam.',
    url: 'https://sba.gov/lorem-ipsum/'
  },
  {
    title: 'Title',
    description:
      'Excepturi quod vel dignissimos. Aut ut eligendi repellendus. Necessitatibus dicta commodi voluptatem molestiae praesentium hic accusamus cupiditate. Nesciunt at ab est. Voluptate et enim nisi voluptates aliquam magnam.',
    url: 'https://sba.gov/lorem-ipsum/'
  },
  {
    title: 'Title',
    description:
      'Excepturi quod vel dignissimos. Aut ut eligendi repellendus. Necessitatibus dicta commodi voluptatem molestiae praesentium hic accusamus cupiditate. Nesciunt at ab est. Voluptate et enim nisi voluptates aliquam magnam.',
    url: 'https://sba.gov/lorem-ipsum/'
  },
  {
    title: 'Title',
    description:
      'Excepturi quod vel dignissimos. Aut ut eligendi repellendus. Necessitatibus dicta commodi voluptatem molestiae praesentium hic accusamus cupiditate. Nesciunt at ab est. Voluptate et enim nisi voluptates aliquam magnam.',
    url: 'https://sba.gov/lorem-ipsum/'
  },
  {
    title: 'Title',
    description:
      'Excepturi quod vel dignissimos. Aut ut eligendi repellendus. Necessitatibus dicta commodi voluptatem molestiae praesentium hic accusamus cupiditate. Nesciunt at ab est. Voluptate et enim nisi voluptates aliquam magnam.',
    url: 'https://sba.gov/lorem-ipsum/'
  },
  {
    title: 'Title',
    description:
      'Excepturi quod vel dignissimos. Aut ut eligendi repellendus. Necessitatibus dicta commodi voluptatem molestiae praesentium hic accusamus cupiditate. Nesciunt at ab est. Voluptate et enim nisi voluptates aliquam magnam.',
    url: 'https://sba.gov/lorem-ipsum/'
  }
]

export default SearchPage

export { SearchBar, ResultsList }
