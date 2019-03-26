import Fuse from 'fuse.js'
import React, { Component } from 'react'
import Select from 'react-select-v1'
import classNames from 'classnames'
import { isEmpty, isEqual, isNil } from 'lodash'
import { parse, stringify } from 'querystring'
import { browserHistory } from 'react-router'

import styles from './person-lookup-page.scss'
import { fetchSiteContent } from '../../../fetch-content-helper'
import { Button, Link, Loader, MultiSelect, TextInput } from 'atoms'
import { Paginator } from 'molecules'
import { DetailCardCollection } from 'organisms'

const reload = (pathname, query) => {
  browserHistory.push({
    pathname,
    search: `?${stringify(query)}`
  })
}

// TODO: define bounds for pageNumber before passing into pagination
class PersonLookupPage extends Component {
  static defaultProps = {
    pageNumber: 1,
    pageSize: 12,
    order: 'ascending',
    office: 'all'
  }

  /* eslint-disable no-invalid-this */
  fuzzySearch = (persons, search) => {
    return persons?.length && !isEmpty(search) ? this.fuse.search(search) : persons
  }

  // render paginator with appropriate bounds + next/prev logic
  renderPaginator = ({ pageNumber, pageSize, total, ...rest }) => {
    const {
      location: { pathname }
    } = this.props

    // convert query paramter to number
    const toNumber = value => (isNil(value) ? 0 : parseInt(value, 10))

    // proceed to next page and update query parameters and re-render
    // component
    const goto = nextPageNumber => {
      reload(pathname, {
        pageNumber: nextPageNumber,
        pageSize,
        total,
        ...rest
      })
    }

    const nextPageNumber = toNumber(pageNumber)
    const nextPageSize = toNumber(pageSize)

    const onBack = goto.bind(
      Object.create(null),
      // have lower bound at &pageNumber=1
      Math.max(1, nextPageNumber - 1)
    )

    const onForward = goto.bind(
      Object.create(null),
      // have upper bound at &pageNumber=<max possible page number>
      Math.min(Math.trunc(total / pageSize) + 1, nextPageNumber + 1)
    )

    return (
      <Paginator
        pageNumber={nextPageNumber}
        pageSize={nextPageSize}
        total={total}
        onBack={onBack}
        onForward={onForward}
      />
    )
  }

  /* eslint-enable no-invalid-this */

  constructor() {
    super()

    this.state = {
      isLoading: true
    }
  }

  async componentDidMount() {
    const {
      location: { query }
    } = this.props
    const offices = await fetchSiteContent('officesRaw')
    const persons = await fetchSiteContent('persons')

    // Build a set of office names from those in the persons list
    const set = new Set()
    persons.forEach(({ office: { name } }) => name && set.add(name))

    // Generate the options for the office dropdown from the set
    this.officeOptions = [
      { label: 'All', value: this.props.office },
      // Format the list of office names appropriately for react-select
      ...Array.from(set)
        .sort((a, b) => a.localeCompare(b))
        .map(value => ({ label: value, value }))
    ]

    // Initialize the fuzzy search index and stash it in an instance variable
    this.fuse = new Fuse(persons, {
      threshold: 0.1,
      location: 0,
      distance: 100,
      minMatchCharLength: 1,
      keys: ['name', 'office.name', 'title']
    })

    this.setState({
      isLoading: false,
      offices,

      // Store both the initial and transformed lists of persons
      initialPersons: persons,
      persons: this.fuzzySearch(persons, query?.search)
    })
  }

  componentWillReceiveProps(nextProps) {
    const {
      location: { query }
    } = this.props
    const {
      location: { query: nextQuery }
    } = nextProps
    const { office, order, search } = nextQuery
    const { initialPersons } = this.state

    // For simplicity, just deep compare the current and next query parameters
    if (!isEqual(query, nextQuery)) {
      if (query.office === office && query.order === order && query.search === search) {
        // only pagination has changed
        this.forceUpdate()
      } else {
        let persons = this.fuzzySearch(initialPersons, search)

        if (office !== 'all') {
          persons = persons.filter(({ office: { name } }) => name === office)
        }

        persons = persons.sort((a, b) => {
          if (isEmpty(a.lastName)) {
            return 1
          }
          if (isEmpty(b.lastName)) {
            return -1
          }

          const ascending = a.lastName.localeCompare(b.lastName)
          return order === 'ascending' ? ascending : ascending * -1
        })

        this.setState({ persons })
      }
    }
  }

  render() {
    const {
      location: { pathname, query }
    } = this.props
    const { isLoading, offices, persons } = this.state

    // Determine the pagination/filter values from the query parameters/state
    // or (if they don't exist) the default props
    const pageNumber = query?.pageNumber || this.props?.pageNumber
    const pageSize = query?.pageSize || this.props?.pageSize
    const office = this.state.office || query?.office || this.props.office
    const order = this.state.order || query?.order || this.props.order

    // Handle the (valid) case where the search is an empty string
    const search = isNil(this.state.search) ? query?.search : this.state.search

    const total = persons?.length || 0

    // Determine what to render in the results section
    let results = <Loader />

    if (!isLoading) {
      if (persons?.length > 0) {
        const cards = persons.slice(
          Math.max(0, pageNumber - 1) * pageSize,
          Math.min(pageNumber * pageSize, total)
        )

        results = (
          <div>
            {this.renderPaginator({ office, order, pageNumber, pageSize, search, total })}
            <DetailCardCollection cards={cards} />
            {this.renderPaginator({ office, order, pageNumber, pageSize, search, total })}
          </div>
        )
      } else {
        // TODO: DRY from search template
        results = (
          <div className={styles.noResults}>
            <h3>Sorry, we didn't find any results that matched your search</h3>
            <p>Try changing your search terms or tweaking your filters.</p>
          </div>
        )
      }
    }

    return (
      <div>
        <div className={styles.banner}>
          <h2>People Lookup</h2>
          {offices?.length && (
            <form
              onSubmit={event => {
                event.preventDefault()

                reload(pathname, {
                  // Always reset to the first page
                  pageNumber: 1,
                  pageSize,
                  ...(search && { search }),
                  ...(office && { office }),
                  ...(order && { order })
                })
              }}
            >
              <TextInput
                className={styles.search}
                onChange={({ target: { value } }) => this.setState({ search: value })}
                label="Search"
                placeholder="Search by name, title, or office"
                showSearchIcon={true}
              />
              <MultiSelect
                className={styles.select}
                label="Office"
                onChange={({ value }) => this.setState({ office: value })}
                options={this.officeOptions}
                value={office}
              />
              <MultiSelect
                className={styles.select}
                label="Sort by"
                onChange={({ value }) => this.setState({ order: value })}
                options={[
                  { label: 'Name A-Z', value: 'ascending' },
                  { label: 'Name Z-A', value: 'descending' }
                ]}
                value={order}
              />
              <Button primary alternate children="apply" />
            </form>
          )}
        </div>
        <div className={styles.results}>{results}</div>
      </div>
    )
  }
}

export default PersonLookupPage
