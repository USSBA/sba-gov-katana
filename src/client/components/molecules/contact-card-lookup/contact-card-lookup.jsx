import React from 'react'
import _ from 'lodash'

import states from '../../../services/us-states.json'
import styles from './contact-card-lookup.scss'
import { LinkCard, MultiSelect } from 'atoms'

class ContactCardLookup extends React.Component {
  constructor() {
    super()
    this.state = {
      displayedItems: [],
      noContacts: false,
      value: null,
      numberOfTimesUserHasSelectedAState: 0
    }
  }

  handleChange(selectValue) {
    let newValueLabel = selectValue.label
    let newDisplayedItems = []
    if (
      this.props.items &&
      this.props.items.length > 0 &&
      this.props.items[0].stateServed &&
      _.isArray(this.props.items[0].stateServed)
    ) {
      newDisplayedItems = _.filter(this.props.items, item => {
        return _.includes(item.stateServed, newValueLabel)
      })
    } else {
      newDisplayedItems = _.filter(this.props.items, {
        stateServed: newValueLabel
      })
    }
    this.setState(
      {
        value: selectValue.value,
        displayedItems: newDisplayedItems,
        numberOfTimesUserHasSelectedAState: this.state.numberOfTimesUserHasSelectedAState + 1
      },
      () => {
        this.state.displayedItems.length < 1
          ? this.setState({ noContacts: true })
          : this.setState({ noContacts: false })
        if (this.props.afterChange) {
          this.props.afterChange(
            this.props.name,
            newValueLabel,
            this.state.numberOfTimesUserHasSelectedAState
          )
        }
      }
    )
  }

  handleFocus() {}

  handleBlur() {}

  render() {
    let statesMap = _.map(states, function(item) {
      return { label: item.name, value: item.value }
    })
    let multiselectProps = {
      id: 'lookup-select',
      errorText: 'Please select a state',
      label: '',
      name: 'state-lookup',
      onChange: this.handleChange.bind(this),
      validationState: '',
      value: this.state.value,
      options: statesMap,
      onBlur: this.handleBlur.bind(this),
      autoFocus: false,
      multi: false,
      onFocus: this.handleFocus.bind(this)
    }
    return (
      <div>
        <div className={styles.container}>
          <h4 key={6} className={styles.title}>
            {this.props.title || 'Look up your state'}
          </h4>
          <div key={1} className={styles.selectContainer}>
            <MultiSelect {...multiselectProps} />
          </div>
          <div key={2} className={styles.dataContainer}>
            {this.state.displayedItems.map(this.props.cardRenderer)}
          </div>

          {this.state.noContacts ? (
            <div key={5} className={styles.noContacts}>
              No contacts found for this State
            </div>
          ) : null}
        </div>
      </div>
    )
  }
}

ContactCardLookup.propTypes = {
  title: React.PropTypes.string,
  items: React.PropTypes.array,
  afterChange: React.PropTypes.func,
  name: React.PropTypes.string,
  cardRenderer: React.PropTypes.func
}

ContactCardLookup.defaultProps = {
  title: 'Lookup Title',
  items: [],
  afterChange: () => {},
  name: 'state-lookup',
  cardRenderer: (item, index) => {
    return (
      <div key={index}>
        <LinkCard {...item} />
      </div>
    )
  }
}
export default ContactCardLookup
