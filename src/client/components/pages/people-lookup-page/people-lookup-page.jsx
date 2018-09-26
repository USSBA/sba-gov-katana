import React from 'react'
// import { connect } from 'react-redux'
// import { bindActionCreators } from 'redux'
import { find, camelCase, cloneDeep, isEmpty, startCase } from 'lodash'

import styles from './people-lookup-page.scss'
import * as ContentActions from '../../../actions/content.js'
import { StyleWrapperDiv, TaxonomyMultiSelect, TextInput } from 'atoms'
import { PrimarySearchBar, PeopleResult } from 'organisms'
import { NoResultsSection } from 'molecules'
import SearchTemplate from '../../templates/search/search.jsx'
import { fetchSiteContent } from '../../../fetch-content-helper.js'

class PeopleLookupPage extends React.Component {
  constructor() {
    super()

    this.state = {
      offices: undefined,
      people: undefined
    }
  }

  async componentDidMount() {
    const offices = await fetchSiteContent('officesRaw', 'officesRaw')
    const people = await fetchSiteContent('persons', 'persons')
    this.setState({ offices: offices.data, people: people.data })
  }

  getTaxonomy(name) {
    const offices = this.state.offices
    const people = this.state.people

    if (!offices || !offices) {
      return {
        name: '',
        terms: []
      }
    }

    // if (name === 'offices' && this.state.offices) {
    //   const taxonomy = offices.
    // }
  }

  // createTaxonomies(contentType) {
  //   let taxonomies = []
  //   let terms = []
  //   if (contentType === 'offices' && this.props.offices) {
  //     const officeNames = this.props.offices.forEach(office => {
  //       terms.push(office.title)
  //     })
  //     taxonomies.push({ name: this.props.offices[0].type, terms })
  //   }
  //   // console.log('2', taxonomies)
  //   return taxonomies
  // }

  // todo move to own component
  renderNoResultsView() {}

  // setSelectedItem(selectedItem) {
  //   const newState = {
  //     selectedItem,
  //     newCenter: {}
  //   }

  //   if (!isEmpty(selectedItem)) {
  //     const [lat, lng] = selectedItem.item.geolocation[0].split(',')
  //     newState.newCenter = {
  //       lat: Number(lat),
  //       lng: Number(lng)
  //     }
  //   }

  //   this.setState(newState)
  // }

  // setIsDragging(isDragging) {
  //   this.setState({ isDragging })
  // }

  // setHoveredMarkerId(hoveredMarkerId) {
  //   this.setState({ hoveredMarkerId })
  // }

  render() {
    // const { selectedItem } = this.state
    const defaultType = 'All'
    const defaultSearchParams = {
      type: defaultType
    }

    // const officeListTaxonomies = this.getTaxonomy('offices')
    // const officesListTaxonomy = this.renderMultiSelects(this.createTaxonomies('offices'))
    const { items, isLoading } = this.props
    const searchTips = [
      'Try a different search term, like “counseling” instead of "counselor".',
      'Try searching with different ZIP code.',
      'Try filtering by a different service, resource type or distance.'
    ]

    return (
      <SearchTemplate
        searchType="persons"
        defaultSearchParams={defaultSearchParams}
        loadDefaultResults={true}
        scrollToTopAfterSearch={false}
        extraClassName={styles.officeSearch}
        paginate={false}
        onHandleEvent={() => {
          this.setIsDragging(false)
        }}
      >
        <PrimarySearchBar id="person-primary-search-bar" title="Find person" className={styles.searchBar}>
          <TextInput
            id="search"
            queryParamName="q"
            className={styles.field + ' ' + styles.search}
            label="Find"
            placeholder="Find person by first or last name"
            validationState={''}
            showSearchIcon={true}
          />

          {/*          <TaxonomyMultiSelect
            taxonomy={officeListTaxonomies}
            label="Office"
            queryParamName="type"
            multi={false}
            className={styles.field + ' ' + styles.search}
      />*/}

          {/*<TaxonomyMultiSelect
            taxonomy={officesTaxonomy}
            label="Offices"
            queryParamName="type"
            multi={false}
            className={styles.field + ' ' + styles.search}
          />*/}
        </PrimarySearchBar>
        {/* Commenting out for now, but perhaps the children of the secondary search bar can be reused in the primary search bar
        <SecondarySearchBar id="office-secondary-search-bar">
          <TaxonomyMultiSelect
            taxonomy={officeServiceTaxonomy}
            queryParamName="service"
            label="Service:"
            multi={false}
            className={styles.search}
          />
          <Toggle
            id="allOffices"
            queryParamName="isSbaOffice"
            options={[
              { name: 'All Offices', value: 'All' },
              { name: 'SBA Offices', value: 'true', fontAwesomeIconClassName: 'shield' }
            ]}
          />
        </SecondarySearchBar> */}
        {/*
        TODO: Uncomment this if we need a no results section
        <NoResultsSection searchTips={searchTips}/> */}
        <PeopleResult offices={this.state.offices} people={this.state.people} />
        <StyleWrapperDiv />
      </SearchTemplate>
    )
  }
}

export default PeopleLookupPage
export { PeopleLookupPage }
