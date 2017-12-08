import React, { PureComponent } from 'react'
import styles from './counseling-events-search-bar.scss'
import { MultiSelect, SmallInverseSecondaryButton, TextInput } from 'atoms'
import { Paginator } from 'molecules'

const pageSize = 10
class CounselingEventsSearchBar extends PureComponent {
  constructor() {
    super()

    this.state = {
      contacts: [],
      pageNumber: 1
    }
  }

  handleBack() {
    this.setState({
      pageNumber: Math.max(1, this.state.pageNumber - 1)
    })
  }

  handleForward() {
    this.setState({
      pageNumber: Math.min(
        Math.max(1, Math.ceil(this.state.contacts.length / pageSize)),
        this.state.pageNumber + 1
      )
    })
  }

  renderMultiSelects() {
    const specificMultiSelectProps = [
      {
        id: 'business-stage-select',
        onChange: e => {
          return false
        },
        label: 'Business Stage',
        name: 'business-stage-lookup',
        value: '',
        options: [
          {
            label: 'Option 1',
            value: 'Option 1'
          },
          {
            label: 'Option 2',
            value: 'Option 2'
          }
        ]
      },
      {
        id: 'topic-select',
        onChange: e => {
          return false
        },
        label: 'Topic',
        name: 'topic-lookup',
        value: '',
        options: [
          {
            label: 'Option 1',
            value: 'Option 1'
          },
          {
            label: 'Option 2',
            value: 'Option 2'
          }
        ]
      },
      {
        id: 'sort-by-select',
        onChange: e => {
          return false
        },
        label: 'Sort by',
        name: 'sort-by-lookup',
        value: '',
        options: [
          {
            label: 'Option 1',
            value: 'Option 1'
          },
          {
            label: 'Option 2',
            value: 'Option 2'
          }
        ]
      }
    ]

    return specificMultiSelectProps.map((multiSelectProps, index) => {
      return (
        <div className={styles.multiSelect} key={index}>
          <MultiSelect
            {...multiSelectProps}
            onBlur={() => {
              return null
            }}
            onFocus={() => {
              return null
            }}
            validationState=""
            errorText=""
            autoFocus={false}
            multi={false}
          />
        </div>
      )
    })
  }

  renderOffices() {
    return <div className={styles.offices}>List of Offices Here</div>
  }

  render() {
    return (
      <div>
        <div className={styles.banner}>
          <h1>Counseling and Events</h1>
          <div className={styles.input}>
            <TextInput
              id="zipcode"
              errorText={'Please enter the correct thing.'}
              label="Zip Code"
              validationState={''}
            />
          </div>
          {this.renderMultiSelects()}
          <a href="#">
            <SmallInverseSecondaryButton url="#" extraClassName={styles.submitButton} text="Apply" />
          </a>
        </div>
        <div className={styles.paginator}>
          <Paginator
            pageNumber={this.state.pageNumber}
            pageSize={pageSize}
            total={10}
            onBack={this.handleBack.bind(this)}
            onForward={this.handleForward.bind(this)}
          />
        </div>
        {this.renderOffices()}
        <div className={styles.paginator}>
          <Paginator
            pageNumber={this.state.pageNumber}
            pageSize={pageSize}
            total={10}
            onBack={this.handleBack.bind(this)}
            onForward={this.handleForward.bind(this)}
          />
        </div>
      </div>
    )
  }
}

export default CounselingEventsSearchBar
