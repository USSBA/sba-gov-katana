import React, { Fragment } from 'react'
import json2csv from 'json2csv'
import { castArray, filter, intersection, isEmpty, orderBy, pick } from 'lodash'

import states from '../../../services/us-states.json'
import style from './sbic-lookup.scss'
import { Button, MultiSelect } from 'atoms'
import { Paginator } from 'molecules'

const pageSize = 10
const SBIC_URL = '/download/sbic-contacts.csv'

class SbicLookup extends React.Component {
  constructor(ownProps) {
    super()
    this.state = {
      contacts: ownProps.items || [],
      contactsCsv: null,
      sortByValue: 'Investor Name',
      industryValue: 'All',
      investingStatusValue: 'All',
      locationValue: 'All',
      pageNumber: 1
    }
  }

  componentWillReceiveProps(nextProps, ownProps) {
    this.setState(
      {
        contacts: nextProps.items
      },
      () => {
        this.sortAndFilterContacts()
        this.convertContactsToCsv()
      }
    )
  }

  handleChange(e, selectStateKey) {
    const stateCopy = this.state
    const newValue = e.value
    stateCopy[selectStateKey] = newValue
    stateCopy.pageNumber = 1
    this.setState(
      {
        ...stateCopy
      },
      () => {
        this.sortAndFilterContacts()
        if (this.props.afterChange) {
          this.props.afterChange(
            'sbic-lookup',
            'Filter Status : ' +
              JSON.stringify(
                pick(this.state, ['sortByValue', 'industryValue', 'investingStatusValue', 'locationValue'])
              ),
            null
          )
        }
      }
    )
  }

  sortAndFilterContacts() {
    const contacts = this.props.items
    const sortedContacts = this.sortContacts(contacts)
    const filteredContacts = this.filterContacts(sortedContacts)
    this.setState({ contacts: filteredContacts })
  }

  sortContacts(contacts) {
    const orders = []
    const iteratees = []
    if (this.state.sortByValue === 'Investor Name') {
      orders.push('asc')
      iteratees.push('title')
    } else if (this.state.sortByValue === 'Active Since') {
      orders.push('desc')
      iteratees.push('activeSince')
    }
    return orderBy(contacts, iteratees, orders)
  }

  //TODO remove outer array brackets [contact.industry] when industry field becomes an actual array. keep intersection though.
  //this filtering was intended to match multiple user selections to multiple industry types.
  filterContacts(contacts) {
    let filteredContacts = contacts
    if (this.state.industryValue !== 'All') {
      filteredContacts = filter(contacts, contact => {
        return !isEmpty(intersection(castArray(contact.industry), castArray(this.state.industryValue)))
      })
    }
    if (this.state.investingStatusValue !== 'All') {
      filteredContacts = filter(filteredContacts, contact => {
        return contact.investingStatus === this.state.investingStatusValue
      })
    }
    if (this.state.locationValue !== 'All') {
      filteredContacts = filter(filteredContacts, contact => {
        return contact.state === this.state.locationValue
      })
    }
    return filteredContacts
  }

  convertContactsToCsv() {
    if (this.state.contacts && this.state.contacts.length > 0) {
      const fields = Object.keys(this.state.contacts[0])
      const csv = json2csv({ data: this.state.contacts, fields: fields })
      this.setState({ contactsCsv: csv })
    }
  }

  renderMultiSelects() {
    const stateOptions = states.map(state => {
      return { label: `${state.name} (${state.value})`, value: state.value }
    })
    stateOptions.unshift({ label: 'All', value: 'All' })

    const specificMultiSelectProps = [
      {
        id: 'sort-by-select',
        onChange: e => {
          this.handleChange(e, 'sortByValue')
        },
        label: 'Sort by',
        name: 'sort-by-lookup',
        value: this.state.sortByValue,
        options: [
          {
            label: 'Investor Name',
            value: 'Investor Name'
          },
          {
            label: 'Active Since',
            value: 'Active Since'
          }
        ]
      },
      {
        id: 'industry-select',
        onChange: e => {
          this.handleChange(e, 'industryValue')
        },
        label: 'Industries',
        name: 'industry-lookup',
        value: this.state.industryValue,
        options: [
          {
            label: 'All',
            value: 'All'
          },
          {
            label: 'Diversified',
            value: 'Diversified'
          },
          {
            label: 'Impact Diversified',
            value: 'ImpactDiversified'
          }
        ]
      },
      {
        id: 'investing-status-select',
        onChange: e => {
          this.handleChange(e, 'investingStatusValue')
        },
        label: 'Investing status',
        name: 'investing-status-select',
        value: this.state.investingStatusValue,
        options: [
          {
            label: 'All',
            value: 'All'
          },
          {
            label: 'Likely still investing',
            value: 'investing'
          },
          {
            label: 'Not likely investing',
            value: 'notinvesting'
          }
        ]
      },
      {
        id: 'state-select',
        onChange: e => {
          this.handleChange(e, 'locationValue')
        },
        label: 'State/Territory',
        name: 'state-select',
        value: this.state.locationValue,
        options: stateOptions
      }
    ]

    return specificMultiSelectProps.map((multiSelectProps, index) => {
      return (
        <div className={style.multiSelect} key={index}>
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

  renderContacts() {
    const start = (this.state.pageNumber - 1) * pageSize
    const slice = this.state.contacts.slice(start, start + pageSize)
    return slice.map((contact, index) => {
      return (
        <tr key={index}>
          <td className={style.nameAndAddressCol}>
            <div className={style.mobileHeader}>Investor name & address</div>
            <NameAndAddress
              title={contact.title}
              streetAddress={contact.streetAddress}
              city={contact.city}
              state={contact.state}
              zipCode={contact.zipCode}
            />
          </td>
          <td className={style.industryCol}>
            <div className={style.mobileHeader}>Industry</div>
            {contact.industry === 'ImpactDiversified' ? 'Impact Diversified' : contact.industry}
          </td>
          <td className={style.activeSinceCol}>
            <div className={style.mobileHeader}>Active since</div>
            {contact.activeSince}
          </td>
          <td className={style.investingStatusCol}>
            <div className={style.mobileHeader}>Investing status</div>
            {contact.investingStatus === 'investing' ? 'Likely still investing' : 'Not likely investing'}
          </td>
          <td className={style.contactInfoCol}>
            <div className={style.mobileHeader}>Contact info</div>
            <ContactInfo
              name={contact.contactFirstName + ' ' + contact.contactLastName}
              phoneNumber={contact.phoneNumber}
            />
          </td>
        </tr>
      )
    })
  }

  downloadCsv() {
    if (window) {
      window.open(SBIC_URL, '_blank')
    }
  }

  render() {
    let resultsContent
    if (this.state.contacts.length === 0) {
      resultsContent = (
        <div className={style.emptyResultsContainer}>
          <strong className="text-secondary">
            No results found. You may need to expand your search. SBICs are not located in every state.
          </strong>
        </div>
      )
    } else {
      resultsContent = (
        <Fragment>
          <div className={style.tableContainer}>
            <table className={style.table}>
              <thead>
                <tr>
                  <th className={style.nameAndAddressHead}>Investor name & address</th>
                  <th className={style.industryHead}>Industry</th>
                  <th className={style.activeSinceHead}>Active since</th>
                  <th className={style.investingStatusHead}>Investing status</th>
                  <th>Contact info</th>
                </tr>
              </thead>
              {this.state.contacts ? <tbody>{this.renderContacts()}</tbody> : <tbody>loading</tbody>}
            </table>
          </div>
          <div className={style.paginator}>
            <Paginator
              pageNumber={this.state.pageNumber}
              pageSize={pageSize}
              total={this.state.contacts.length}
              onBack={this.handleBack.bind(this)}
              onForward={this.handleForward.bind(this)}
            />
          </div>
        </Fragment>
      )
    }

    return (
      <div>
        <div className={style.banner}>
          <h2 className={style.header}>{this.props.title}</h2>
          {this.renderMultiSelects()}
          <div className={style.downloadBtn}>
            <Button
              alternate
              children="Download list (.XLS)"
              onClick={e => {
                e.preventDefault()
                this.downloadCsv()
              }}
              primary
            />
          </div>
        </div>
        {resultsContent}
      </div>
    )
  }
}

const NameAndAddress = props => {
  return (
    <div className={style.investorNameAndTitle}>
      <div className={style.investorTitle}>{props.title}</div>
      <div className={style.streetAddress}>{props.streetAddress}</div>
      <div className={style.cityAddress}>
        {props.city}, {props.state} {props.zipCode}
      </div>
    </div>
  )
}

const ContactInfo = props => {
  return (
    <div className={style.contactInfo}>
      <div className={style.investorName}>{props.name}</div>
      <div className={style.phoneContainer}>
        <i className={style.phoneIcon + ' fa fa-phone'} aria-hidden="true" />
        <div className={style.investorPhone}>{props.phoneNumber}</div>
      </div>
    </div>
  )
}

export default SbicLookup
