import React from 'react'
import { assign } from 'lodash'
import { ContactCard, ContactCardLookup } from 'molecules'
import { SbicLookup, SuretyLookup } from 'organisms'
import styles from './lookup.scss'
import { fetchSiteContent } from '../../../fetch-content-helper'
import { logEvent } from '../../../services/analytics.js'

class Lookup extends React.Component {
  constructor() {
    super()
    this.state = {
      filteredItems: []
    }
  }

  async componentWillMount() {
    const { subtype, type } = this.props
    const queryArgs = subtype
      ? {
          category: subtype
        }
      : null
    this.setState({
      filteredItems: await fetchSiteContent(type, queryArgs)
    })
  }

  fireEvent(category, action, value) {
    logEvent({
      category: category,
      action: action,
      label: window.location.pathname,
      value: value
    })
  }

  render() {
    let SelectedLookup = <div />

    const _props = {
      items: this.state.filteredItems,
      title: this.props.title,
      name: this.props.subtype,
      afterChange: this.fireEvent.bind(this)
    }

    if (this.props.type === 'contacts') {
      switch (this.props.subtype) {
        case 'State taxes':
        case 'State registration':
          SelectedLookup = <ContactCardLookup {..._props} />
          break

        case 'CDC/504':
        case 'Microloan':
          SelectedLookup = <ContactCardLookup {..._props} />
          break

        case 'SBIC':
          SelectedLookup = <SbicLookup {..._props} />
          break

        case 'Surety bond company':
          SelectedLookup = <SuretyLookup {..._props} />
          break
      }
    } else {
      console.error('Unknown Lookup Type')
    }

    return <div>{SelectedLookup}</div>
  }
}

Lookup.propTypes = {
  title: React.PropTypes.string,
  type: React.PropTypes.string,
  display: React.PropTypes.string
}

Lookup.defaultProps = {
  title: 'Lookup Title',
  type: 'contacts',
  subtype: '',
  display: 'cards',
  items: []
}

export default Lookup
