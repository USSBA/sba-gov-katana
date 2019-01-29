import React from 'react'

import styles from './event-lookup-page.scss'
import { fetchSiteContent } from '../../../fetch-content-helper'
import { Button, SearchIcon, TextInput } from 'atoms'

class EventLookupPage extends React.Component {
  constructor() {
    super()

    this.state = {
      events: null
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    return nextState.events
  }

  componentWillMount() {
    fetchSiteContent('events').then(results => {
      this.setState({ events: results })
    })
  }

  renderKeywordSearch() {
    const textInputProps = {
      placeholder: 'Enter keyword',
      id: 'event-lookup-text-input',
      errorText: 'Please enter a keyword or phase.',
      label: 'Search',
      validationState: '',
      onChange: () => {},
      value: ''
    }
    return (
      <div className={styles.searchBox}>
        <TextInput {...textInputProps} />
        <div className={styles.searchIcon}>
          <SearchIcon aria-hidden="true" />
        </div>
      </div>
    )
  }

  render() {
    return (
      <div>
        <div className={styles.banner}>
          <h2 className={styles.header}>Find events</h2>
          <div>
            {this.renderKeywordSearch()}
            <div className={styles.applyButton}>
              <Button primary alternate onClick={() => {}}>
                Apply
              </Button>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default EventLookupPage
