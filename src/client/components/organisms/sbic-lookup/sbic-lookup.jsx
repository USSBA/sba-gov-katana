import React from 'react'
import json2csv from 'json2csv'
import { pick } from 'lodash'

import s from './sbic-lookup.scss'
import { SmallInverseSecondaryButton, MultiSelect } from 'atoms'
import { Paginator } from 'molecules'

var pageSize = 10
class SbicLookup extends React.Component {
  constructor(ownProps) {
    super()
    this.state = {
      contacts: ownProps.items || [],
      contactsCsv: null,
      sortByValue: 'Investor Name',
      industryValue: 'All',
      investingStatusValue: 'All',
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
    let stateCopy = this.state
    let newValue = e.value
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
              JSON.stringify(pick(this.state, ['sortByValue', 'industryValue', 'investingStatusValue'])),
            null
          )
        }
      }
    )
  }

  sortAndFilterContacts() {
    let contacts = this.props.items
    let sortedContacts = this.sortContacts(contacts)
    let filteredContacts = this.filterContacts(sortedContacts)
    this.setState({ contacts: filteredContacts })
  }

  sortContacts(contacts) {
    let orders = []
    let iteratees = []
    if (this.state.sortByValue === 'Investor Name') {
      orders.push('asc')
      iteratees.push('title')
    } else if (this.state.sortByValue === 'Active Since') {
      orders.push('desc')
      iteratees.push('activeSince')
    }
    return _.orderBy(contacts, iteratees, orders)
  }

  //TODO remove outer array brackets [contact.industry] when industry field becomes an actual array. keep intersection though.
  //this filtering was intended to match multiple user selections to multiple industry types.
  filterContacts(contacts) {
    let filteredContacts = contacts
    if (this.state.industryValue !== 'All') {
      filteredContacts = _.filter(contacts, contact => {
        return !_.isEmpty(
          _.intersection(_.castArray(contact.industry), _.castArray(this.state.industryValue))
        )
      })
    }
    if (this.state.investingStatusValue !== 'All') {
      filteredContacts = _.filter(filteredContacts, contact => {
        return contact.investingStatus === this.state.investingStatusValue
      })
    }
    return filteredContacts
  }

  convertContactsToCsv() {
    if (this.state.contacts && this.state.contacts.length > 0) {
      let fields = Object.keys(this.state.contacts[0])
      let csv = json2csv({ data: this.state.contacts, fields: fields })
      this.setState({ contactsCsv: csv })
    }
  }

  createDownloadHref() {
    return 'data:text/plain;charset=utf-8,' + encodeURIComponent(this.state.contactsCsv)
  }

  renderMultiSelects() {
    let specificMultiSelectProps = [
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
      }
    ]

    return specificMultiSelectProps.map((multiSelectProps, index) => {
      return (
        <div className={s.multiSelect} key={index}>
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
    let start = (this.state.pageNumber - 1) * pageSize
    let slice = this.state.contacts.slice(start, start + pageSize)
    return slice.map((contact, index) => {
      return (
        <tr key={index}>
          <td className={s.nameAndAddressCol}>
            <div className={s.mobileHeader}>Investor name & address</div>
            <NameAndAddress
              title={contact.title}
              streetAddress={contact.streetAddress}
              city={contact.city}
              state={contact.state}
              zipCode={contact.zipCode}
            />
          </td>
          <td className={s.industryCol}>
            <div className={s.mobileHeader}>Industry</div>
            {contact.industry === 'ImpactDiversified' ? 'Impact Diversified' : contact.industry}
          </td>
          <td className={s.activeSinceCol}>
            <div className={s.mobileHeader}>Active since</div>
            {contact.activeSince}
          </td>
          <td className={s.investingStatusCol}>
            <div className={s.mobileHeader}>Investing status</div>
            {contact.investingStatus === 'investing' ? 'Likely still investing' : 'Not likely investing'}
          </td>
          <td className={s.contactInfoCol}>
            <div className={s.mobileHeader}>Contact info</div>
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
    console.log('AAAA')
  }

  render() {
    return (
      <div>
        <div className={s.banner}>
          <h2 className={s.header}>{this.props.title}</h2>
          {this.renderMultiSelects()}
          <a href="/api/content/sbic-contacts.csv" download="sbic-contacts.csv">
            <SmallInverseSecondaryButton
              onClick={e => {
                e.preventDefault()
              }}
              extraClassName={s.downloadBtn}
              text="download list (.XLS)"
            />
          </a>
        </div>
        <table className={s.table}>
          <thead>
            <tr>
              <th className={s.nameAndAddressHead}>Investor name & address</th>
              <th className={s.industryHead}>Industry</th>
              <th className={s.activeSinceHead}>Active since</th>
              <th className={s.investingStatusHead}>Investing status</th>
              <th className={s.contactInfoHead}>Contact info</th>
            </tr>
          </thead>
          {this.state.contacts ? <tbody>{this.renderContacts()}</tbody> : <tbody>loading</tbody>}
        </table>
        <div className={s.paginator}>
          <Paginator
            pageNumber={this.state.pageNumber}
            pageSize={pageSize}
            total={this.state.contacts.length}
            onBack={this.handleBack.bind(this)}
            onForward={this.handleForward.bind(this)}
          />
        </div>
      </div>
    )
  }
}

const NameAndAddress = props => {
  return (
    <div className={s.investorNameAndTitle}>
      <div className={s.investorTitle}>{props.title}</div>
      <i className={s.mapIcon + ' fa fa-map-marker'} aria-hidden="true" />
      <div className={s.addressContainer}>
        <div className={s.streetAddress}>{props.streetAddress}</div>
        <div className={s.cityAddress}>
          {props.city}, {props.state}
          {props.zipCode}
        </div>
      </div>
    </div>
  )
}

const ContactInfo = props => {
  return (
    <div className={s.contactInfo}>
      <div className={s.investorName}>{props.name}</div>
      <div className={s.phoneContainer}>
        <i className={s.phoneIcon + ' fa fa-phone'} aria-hidden="true" />
        <div className={s.investorPhone}>{props.phoneNumber}</div>
      </div>
    </div>
  )
}

export default SbicLookup
