import React from 'react'
import { assign, filter } from 'lodash'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import styles from './lookup.scss'
import * as ContentActions from '../../../actions/content.js'
import { ContactCard, ContactCardLookup } from 'molecules'
import { SbicLookup, SuretyLookup } from 'organisms'
import { logEvent } from '../../../services/analytics.js'

class Lookup extends React.Component {
  constructor() {
    super()
    this.state = {
      filteredItems: []
    }
  }

  componentWillMount() {
    let queryArgs = this.props.subtype
      ? {
          category: this.props.subtype
        }
      : null
    this.props.actions.fetchContentIfNeeded(this.props.type, this.props.type, queryArgs)
  }

  componentWillReceiveProps(nextProps, ownProps) {
    this.setState({ filteredItems: nextProps.items })
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
    let _props = {
      items: this.state.filteredItems,
      title: this.props.title,
      name: this.props.subtype,
      afterChange: this.fireEvent.bind(this)
    }

    if (this.props.type === 'contacts') {
      switch (this.props.subtype) {
        case 'State taxes':
          SelectedLookup = <ContactCardLookup {..._props} />

          break
        case 'CDC/504':
        case 'Microloan':
          let cardRendererFunction = (item, index) => {
            return <ContactCard key={index} {...item} />
          }
          let cdcProps = assign({}, _props, {
            cardRenderer: cardRendererFunction
          })
          SelectedLookup = <ContactCardLookup {...cdcProps} />
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

function mapReduxStateToProps(reduxState, ownProps) {
  return {
    items: reduxState.contentReducer[ownProps.type]
  }
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(ContentActions, dispatch)
  }
}
export default connect(mapReduxStateToProps, mapDispatchToProps)(Lookup)
