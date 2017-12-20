import React, { PureComponent } from 'react'
import { BasicLink, SmallPrimaryButton, TextInput } from 'atoms'
import { Paginator } from 'molecules'
import styles from './search-page.scss'

class SearchPage extends PureComponent {
  constructor() {
    super()

    this.state = {
      searchTerm: '',
      paginator: {
        start: 0,
        end: 10
      },
      paginatorTotal: 98,
      results: [
        {
          title: 'Title',
          description: 'Description',
          url: '#'
        }
      ]
    }
  }

  componentWillMount() {
    const searchTerm = document.location.search.split('?q=')[1]

    this.setState({
      searchTerm,
      results
    })
  }

  render() {
    const { searchTerm, list } = this.state

    return (
      <div className={styles.container}>
        <h1>Search</h1>
        <SearchBar searchTerm={searchTerm} />
        <hr />
        <div>
          <div className={styles.searchTerm}>
            <span>"{searchTerm}"</span>
          </div>
          <div className={styles.paginator}>
            <Paginator
              start={this.state.paginator.start}
              end={this.state.paginator.end}
              total={this.state.paginatorTotal}
              onBack={() => true}
              onForward={() => true}
            />
          </div>
        </div>
        <ResultsList list={results} />
        <div className={styles.paginator}>
          <Paginator
            start={this.state.paginator.start}
            end={this.state.paginator.end}
            total={this.state.paginatorTotal}
            onBack={() => true}
            onForward={() => true}
          />
        </div>
      </div>
    )
  }
}

const SearchBar = props => {
  const { searchTerm } = props

  return (
    <div>
      <div className={styles.textInput}>
        <TextInput
          id="search"
          errorText={'Please enter the correct thing.'}
          label="What are you looking for?"
          validationState={''}
          defaultValue={searchTerm}
        />
      </div>
      <div className={styles.searchButton}>
        <SmallPrimaryButton url="#" text="Search" />
      </div>
    </div>
  )
}

const ResultsList = props => {
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

  return <div className={styles.results}>{list}</div>
}

const results = [
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
