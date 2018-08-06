import React from 'react'
import _ from 'lodash'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import s from './surety-lookup.scss'
import * as ContentActions from '../../../actions/content.js'
import { MultiSelect } from 'atoms'
import { CardGrid, Paginator } from 'molecules'

var pageSize = 9
var dataProp = 'statesTaxonomy'
class SuretyLookup extends React.Component {
  constructor(ownProps) {
    super()
    this.state = {
      filteredContacts: _.sortBy(ownProps.items, 'title') || [],
      suretyState: null,
      pageNumber: 1,
      numberOfTimesUserHasSelectedAState: 0
    }
  }

  componentWillMount() {
    this.props.actions.fetchContentIfNeeded(dataProp, 'taxonomys', {
      names: 'state'
    })
  }

  componentWillReceiveProps(nextProps, ownProps) {
    this.setState({
      filteredContacts: _.sortBy(nextProps.items, 'title')
    })
  }

  handleSelect(e) {
    let newValue = e.value
    this.setState(
      {
        suretyState: e.value,
        numberOfTimesUserHasSelectedAState: this.state.numberOfTimesUserHasSelectedAState + 1,
        pageNumber: 1
      },
      () => {
        this.filterContacts()
        if (this.props.afterChange) {
          this.props.afterChange('surety-lookup', newValue, this.state.numberOfTimesUserHasSelectedAState)
        }
      }
    )
  }

  filterContacts() {
    let filteredContacts
    if (this.state.suretyState === 'All') {
      filteredContacts = this.props.items
    } else {
      filteredContacts = _.filter(this.props.items, agency => {
        return !_.isEmpty(
          _.intersection(_.castArray(agency.stateServed), _.castArray(this.state.suretyState))
        )
      })
    }
    filteredContacts = _.sortBy(filteredContacts, ['title'])
    this.setState({ filteredContacts: filteredContacts })
  }

  multiSelectProps() {
    let options = this.props.states.terms.map(state => {
      return { label: state, value: state }
    })
    options.push({ label: '', value: null })
    options.unshift({ label: 'All', value: 'All' })
    return {
      id: 'surety-state-select',
      label: 'Show surety agencies licensed in',
      name: 'surety-state-select',
      options: options
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
        Math.max(1, Math.ceil(this.state.filteredContacts.length / pageSize)),
        this.state.pageNumber + 1
      )
    })
  }

  renderCard(data, index) {
    return (
      <div id={'surety-card' + index} className={s.card}>
        <h4 className={s.title}>{data.title}</h4>
        <div className={s.phoneContainer}>
          <i className={s.phoneIcon + ' fa fa-phone'} aria-hidden="true" />
          <span>{data.phoneNumber}</span>
        </div>
        <div>
          <i className={s.emailIcon + ' fa fa-envelope-o'} aria-hidden="true" />
          <a href={'mailto:' + data.email}>Email</a>
        </div>
      </div>
    )
  }

  renderCardContainer() {
    if (!_.isEmpty(this.state.filteredContacts)) {
      let start = (this.state.pageNumber - 1) * pageSize
      let slice = this.state.filteredContacts.slice(start, start + pageSize)
      return <CardGrid cards={slice} renderCard={this.renderCard} />
    } else if (_.isEmpty(this.state.filteredContacts)) {
      return <EmptyContacts />
    } else {
      return 'Loading'
    }
  }

  render() {
    return (
      <div id={'surety-lookup'}>
        <div className={s.banner}>
          <h2>Contact a surety bond agency</h2>
          <h5 className={s.blurb}>
            Check the database of surety agencies that offer SBA-guaranteed bonds. Contact a surety agency
            in your state to get started with the application process.
          </h5>
          <div className={s.multiSelect}>
            <MultiSelect
              {...this.multiSelectProps()}
              onChange={e => this.handleSelect(e)}
              value={this.state.suretyState}
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
        </div>

        <div className={s.cardContainer}>{this.renderCardContainer()}</div>
        <div className={s.paginator}>
          <Paginator
            pageNumber={this.state.pageNumber}
            pageSize={pageSize}
            total={this.state.filteredContacts.length}
            onBack={this.handleBack.bind(this)}
            onForward={this.handleForward.bind(this)}
          />
        </div>
      </div>
    )
  }
}

const EmptyContacts = () => (
  <div className={s.emptyContacts}>
    <div>No surety agencies found</div>
  </div>
)

SuretyLookup.defaultProps = {
  states: {
    name: 'state',
    terms: []
  }
}

function mapReduxStateToProps(reduxState, ownProps) {
  if (reduxState.contentReducer[dataProp]) {
    return {
      states: reduxState.contentReducer[dataProp][0]
    }
  } else {
    return {}
  }
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(ContentActions, dispatch)
  }
}
export default connect(mapReduxStateToProps, mapDispatchToProps)(SuretyLookup)
